
import { useRegisterVendor, useBuyProduct } from '../hooks/useMarketplace';
import { useVendorStatus, useAllProducts } from '../hooks/useMarketplaceData';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function Marketplace() {
  const { address, isConnected } = useAccount();
  const { isRegistered, isLoading: vendorLoading } = useVendorStatus();
  const products = useAllProducts();
  const { registerVendor, isLoading: regLoading, isSuccess: regSuccess, error: regError } = useRegisterVendor();
  const { buyProduct, isLoading: buyLoading, isSuccess: buySuccess, error: buyError } = useBuyProduct();
  const [listing, setListing] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [listError, setListError] = useState<string | null>(null);

  async function handleListProduct() {
    setListError(null);
    setListing(true);
    try {
      // TODO: call listProduct via contract (add to useMarketplace hook if needed)
      // For now, just reset form
      setProductName('');
      setProductPrice('');
    } catch (e: any) {
      setListError(e?.message || 'Listing failed');
    } finally {
      setListing(false);
    }
  }

  return (
    <div className="relative rounded-3xl shadow-clay bg-cream p-8 mt-8 overflow-hidden animate-fade-in">
      <h2 className="font-extrabold text-lg md:text-2xl mb-4 text-taupe">Marketplace</h2>
      {!isConnected && <div className="mb-2 text-red-500">Connect your wallet to interact.</div>}
      {vendorLoading ? (
        <div>Loading vendor status...</div>
      ) : !isRegistered ? (
        <button className="bg-deepgreen text-cream px-4 py-2 rounded-2xl shadow-clay font-semibold transition-all duration-200 hover:bg-taupe" onClick={registerVendor} disabled={regLoading || !isConnected}>
          {regLoading ? 'Registering...' : 'Register as Vendor'}
        </button>
      ) : (
        <div className="mb-2 text-green-600">Vendor Registered!</div>
      )}
      {regError && <div className="text-red-600">{regError.message}</div>}
      {isRegistered && (
        <form className="my-4 flex flex-col md:flex-row gap-2" onSubmit={e => { e.preventDefault(); handleListProduct(); }}>
          <input className="border border-gray px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-taupe" placeholder="Product name" value={productName} onChange={e => setProductName(e.target.value)} required />
          <input className="border border-gray px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-taupe" placeholder="Price (wei)" value={productPrice} onChange={e => setProductPrice(e.target.value)} required type="number" min="1" />
          <button className="bg-taupe text-cream px-4 py-2 rounded-2xl shadow-clay font-semibold transition-all duration-200 hover:bg-deepgreen" type="submit" disabled={listing}>List</button>
        </form>
      )}
      {listError && <div className="text-red-600">{listError}</div>}
      <ul className="mt-4 space-y-3">
        {products.length === 0 && <li className="text-gray">No products listed yet.</li>}
        {products.map((p) => (
          <li key={p.id} className="flex flex-col md:flex-row md:justify-between items-center bg-white/60 rounded-2xl shadow-clay px-4 py-3 mb-2">
            <span className="font-bold text-taupe">{p.name}</span>
            <span className="text-deepgreen">{p.price ? `${p.price} wei` : ''}</span>
            <span>{p.sold ? <span className="text-gray-400">Sold</span> : <button className="bg-yellow-200 px-3 py-1 rounded-2xl ml-2 font-semibold shadow-clay transition-all duration-200 hover:bg-yellow-300" onClick={() => buyProduct(p.id, BigInt(p.price))} disabled={buyLoading || !isConnected}>Buy</button>}</span>
          </li>
        ))}
      </ul>
      {buyError && <div className="text-red-600">{buyError.message}</div>}
      {buySuccess && <div className="text-green-600">Purchase successful!</div>}
      <div className="absolute left-0 bottom-0 w-full pointer-events-none">
        {require('./ConcaveWave').default({ className: 'w-full h-8 md:h-12', fingerprint: true })}
      </div>
    </div>
  );
}
