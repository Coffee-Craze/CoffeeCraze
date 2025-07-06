import { useState } from 'react';

export function useIPFS() {
  const [url, setUrl] = useState(null);
  async function uploadToIPFS(file) {
    // TODO: Integrate with web3.storage or Infura
    setUrl('ipfs://mocked');
  }
  return { url, uploadToIPFS };
}
