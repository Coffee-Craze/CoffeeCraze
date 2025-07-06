import React from 'react';
import ConcaveWave from './ConcaveWave';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-taupe text-cream pt-12 pb-0 rounded-t-3xl shadow-clay overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-2xl font-bold tracking-wider">Coffee Craze</span>
        </motion.div>
        <p className="text-gray text-center mb-6">Decentralized coffee learning & marketplace. Built with ❤️ for web3.</p>
        <div className="flex gap-4 mb-8">
          <a href="#" className="hover:underline text-cream/80">Docs</a>
          <a href="#" className="hover:underline text-cream/80">GitHub</a>
          <a href="#" className="hover:underline text-cream/80">Contact</a>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 w-full">
        <ConcaveWave className="w-full h-16 md:h-24" fingerprint color="#372c2d" />
      </div>
    </footer>
  );
}
