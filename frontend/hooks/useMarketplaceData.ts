import { useAccount, useContractRead } from 'wagmi';
import MarketplaceAbi from '../../contracts/artifacts/contracts/Marketplace.sol/Marketplace.json';

const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '0xYourMarketplaceAddress';

export function useVendorStatus() {
  const { address } = useAccount();
  const { data, isLoading, error } = useContractRead({
    address: MARKETPLACE_ADDRESS as `0x${string}`,
    abi: MarketplaceAbi.abi,
    functionName: 'vendors',
    args: [address],
    enabled: Boolean(address),
    watch: true,
  });
  return { isRegistered: data?.registered, isLoading, error };
}

export function useAllProducts() {
  // In a real dApp, you would index events or use The Graph for scalability.
  // For demo, we fetch product IDs from 0 to N-1 and read each product.
  const { data: nextId } = useContractRead({
    address: MARKETPLACE_ADDRESS as `0x${string}`,
    abi: MarketplaceAbi.abi,
    functionName: 'nextProductId',
    watch: true,
  });
  const productIds = Array.from({ length: Number(nextId || 0) }, (_, i) => i);
  const products = productIds.map((id) =>
    useContractRead({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MarketplaceAbi.abi,
      functionName: 'products',
      args: [id],
      watch: true,
    })
  );
  return products.map((p, i) => ({ ...p.data, id: i, isLoading: p.isLoading, error: p.error }));
}
