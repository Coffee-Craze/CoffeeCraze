import { motion } from 'framer-motion';

export default function BadgeAnimation({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.8 }}
      className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-500"
    >
      <span className="text-2xl font-bold">🏅</span>
    </motion.div>
  );
}
