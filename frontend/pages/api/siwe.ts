import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';

import type { SessionOptions } from 'iron-session';

interface SiweSession {
  siwe?: { address: string };
}

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'siwe-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SiweSession>(req, res, sessionOptions);

  switch (req.method) {
    case 'POST': {
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);
        const result = await siweMessage.verify({ signature, domain: req.headers.host, nonce: siweMessage.nonce });
        if (!result.success) throw new Error('SIWE verification failed');
        session.siwe = { address: siweMessage.address };
        await session.save();
        res.status(200).json({ ok: true });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    }
    case 'GET': {
      if (session.siwe) {
        res.status(200).json({ address: session.siwe.address });
      } else {
        res.status(401).json({ address: null });
      }
      break;
    }
    case 'DELETE': {
      session.destroy();
      res.status(200).json({ ok: true });
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
