import { useState } from 'react';

export function useArweave() {
  const [url, setUrl] = useState(null);
  async function uploadToArweave(file: File) {
    // TODO: Integrate with Bundlr or Arweave SDK
    setUrl('ar://mocked');
  }
  return { url, uploadToArweave };
}
