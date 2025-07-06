import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useMintLearningModuleNFT } from '../hooks/useMintLearningModuleNFT';
import { useIPFS } from '../hooks/useIPFS';

const questions = [
  {
    question: 'What is Coffee Craze?',
    options: ['A dApp', 'A coffee shop', 'A token', 'A DAO'],
    answer: 0,
  },
  {
    question: 'Which chain is used for MVP?',
    options: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    answer: 1,
  },
];

export default function Quiz({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { mintNFT, isLoading, isSuccess, error } = useMintLearningModuleNFT();
  const { url, uploadToIPFS } = useIPFS();

  async function handleAnswer(idx: number) {
    if (idx === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else {
      setFinished(true);
      // Advanced: Upload quiz result to IPFS, then mint NFT with that URI
      setMinting(true);
      setMintError(null);
      try {
        // Example metadata
        const metadata = {
          name: 'Coffee Craze Quiz Completion',
          description: `Quiz completed with score ${score + (idx === questions[current].answer ? 1 : 0)}/${questions.length}`,
          timestamp: new Date().toISOString(),
          address,
        };
        // Upload metadata to IPFS (mocked)
        await uploadToIPFS(new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        if (!url) throw new Error('IPFS upload failed');
        // Mint NFT with IPFS URI
        if (address) await mintNFT(address, url);
        setMinted(true);
        onComplete();
      } catch (e: any) {
        setMintError(e?.message || 'Minting failed');
      } finally {
        setMinting(false);
      }
    }
  }

  if (finished) {
    return (
      <div className="rounded-3xl shadow-clay bg-cream text-deepgreen p-8 flex flex-col items-center animate-fade-in">
        <span className="text-2xl font-bold mb-2">Quiz complete! Score: {score}/{questions.length}</span>
        {minting && <div className="text-blue-600">Minting NFT...</div>}
        {minted && <div className="text-green-700">NFT minted! Check your wallet.</div>}
        {mintError && <div className="text-red-600">{mintError}</div>}
        {error && <div className="text-red-600">{error.message}</div>}
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl shadow-clay bg-cream p-8 mb-4 overflow-hidden animate-fade-in">
      <h2 className="font-extrabold text-lg md:text-2xl mb-4 text-deepgreen">{questions[current].question}</h2>
      <div className="space-y-3">
        {questions[current].options.map((opt, i) => (
          <button
            key={i}
            className="block w-full bg-deepgreen text-cream font-semibold py-3 rounded-2xl shadow-clay transition-all duration-200 hover:bg-taupe focus:outline-none focus:ring-2 focus:ring-taupe"
            onClick={() => handleAnswer(i)}
            disabled={minting || !isConnected}
          >
            {opt}
          </button>
        ))}
      </div>
      {!isConnected && <div className="mt-3 text-sm text-red-500">Connect your wallet to mint NFT on completion.</div>}
      <div className="absolute left-0 bottom-0 w-full pointer-events-none">
        {require('./ConcaveWave').default({ className: 'w-full h-8 md:h-12', fingerprint: true })}
      </div>
    </div>
  );
}
