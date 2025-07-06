"use client";
import dynamic from 'next/dynamic';
const WalletConnect = dynamic(() => import('../components/WalletConnect'), { ssr: false });
const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });
const BadgeAnimation = dynamic(() => import('../components/BadgeAnimation'), { ssr: false });
const CoinSparkle = dynamic(() => import('../components/CoinSparkle'), { ssr: false });

import { useState } from 'react';
import Marketplace from '../components/Marketplace';
import DAOVoting from '../components/DAOVoting';

export default function Home() {
  const [quizComplete, setQuizComplete] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showCoin, setShowCoin] = useState(false);

  function handleQuizComplete() {
    setQuizComplete(true);
    setShowBadge(true);
    setTimeout(() => setShowCoin(true), 1000);
  }

  return (

    <main className="relative min-h-screen flex flex-col items-center justify-center bg-cream">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-clay bg-deepgreen text-cream px-8 pt-16 pb-12 mb-12 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Coffee Craze</h1>
        <p className="text-lg md:text-xl mb-8 text-cream/90">Welcome to the decentralized coffee learning and marketplace dApp!</p>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <WalletConnect />
          {/* SIWE Button appears after wallet connect */}
          {typeof window !== 'undefined' && (
            <div>
              {require('../components/SIWEButton').default()}
            </div>
          )}
        </div>
        <div className="absolute left-0 bottom-0 w-full">
          {require('../components/ConcaveWave').default({ className: 'w-full h-16 md:h-24', fingerprint: true })}
        </div>
      </section>

      {/* Quiz & Animations */}
      <section className="w-full max-w-xl mx-auto mb-12">
        {!quizComplete && <Quiz onComplete={handleQuizComplete} />}
        <div className="flex justify-center gap-8 mt-6">
          <BadgeAnimation show={showBadge} />
          <CoinSparkle show={showCoin} />
        </div>
      </section>

      {/* Marketplace & DAO */}
      <section className="w-full max-w-2xl mx-auto mb-24">
        <Marketplace />
        <DAOVoting />
      </section>

      {/* Footer */}
      <div className="w-full">
        {require('../components/Footer').default()}
      </div>
    </main>
  );
}
