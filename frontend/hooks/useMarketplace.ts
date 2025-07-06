import { useAccount } from 'wagmi';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import { useState } from 'react';
import MarketplaceAbi from '../../contracts/artifacts/contracts/Marketplace.sol/Marketplace.json';
import wagmiConfig from './wagmiClient';

const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '0xYourMarketplaceAddress';

export function useRegisterVendor() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function registerVendor() {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      // Example: call a registerVendor() function (to be implemented in contract)
      const hash = await writeContract({
        address: MARKETPLACE_ADDRESS as `0x${string}`,
        abi: MarketplaceAbi.abi,
        functionName: 'registerVendor',
        args: [],
      }, wagmiConfig);
      await waitForTransaction({ hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { registerVendor, isLoading, isSuccess, error };
}

export function useBuyProduct() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function buyProduct(productId: number, price: bigint) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      // Example: call a buyProduct(uint256 productId) payable function
      const hash = await writeContract({
        address: MARKETPLACE_ADDRESS as `0x${string}`,
        abi: MarketplaceAbi.abi,
        functionName: 'buyProduct',
        args: [productId],
        value: price,
      }, wagmiConfig);
      await waitForTransaction({ hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { buyProduct, isLoading, isSuccess, error };
}
