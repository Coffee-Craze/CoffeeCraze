"use client";
import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

export default function SIWEButton() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [siweStatus, setSiweStatus] = useState(null);

  async function handleSIWE() {
    if (!address) return;
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to Coffee Craze',
      uri: window.location.origin,
      version: '1',
      chainId: 137,
      nonce: Math.random().toString(36).substring(2, 10),
    });
    try {
      const signature = await signMessageAsync({ message: message.prepareMessage() });
      // Send {message, signature} to backend for session
      const res = await fetch('/api/siwe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      });
      if (res.ok) {
        setSiweStatus('SIWE authentication success!');
      } else {
        const data = await res.json();
        setSiweStatus('SIWE backend error: ' + (data.error || 'Unknown error'));
      }
    } catch (e) {
      setSiweStatus('SIWE signature failed.');
    }
  }

  if (!isConnected) return null;

  return (
    <div className="mt-4 flex flex-col items-center">
      <button className="px-4 py-2 bg-green-200 rounded" onClick={handleSIWE}>
        Sign-In With Ethereum (SIWE)
      </button>
      {siweStatus && <div className="mt-2 text-xs text-gray-600">{siweStatus}</div>}
    </div>
  );
}
