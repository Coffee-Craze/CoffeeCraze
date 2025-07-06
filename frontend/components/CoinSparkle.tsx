import { motion } from 'framer-motion';

export default function CoinSparkle({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-2 mt-2"
    >
      <span className="text-yellow-500 text-3xl">✨</span>
      <span className="text-yellow-700 font-bold">Kofi Coin +1</span>
    </motion.div>
  );
}
