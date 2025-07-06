"use client";
import { useAccount, useEnsName, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center gap-2">
      <ConnectButton />
      {isConnected && (
        <div className="mt-2 text-sm text-gray-700">
          <div>Address: {address}</div>
          {ensName && <div>ENS: {ensName}</div>}
          <button className="mt-2 px-3 py-1 bg-red-200 rounded" onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
