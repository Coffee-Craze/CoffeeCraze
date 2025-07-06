import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const proposals = [
  { id: 1, title: 'Add new coffee product', votes: 10 },
  { id: 2, title: 'Change DAO logo', votes: 5 },
];

export default function DAOVoting() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="relative rounded-3xl shadow-clay bg-cream p-8 mt-8 overflow-hidden animate-fade-in">
      <h2 className="font-extrabold text-lg md:text-2xl mb-4 text-taupe">DAO Voting</h2>
      <button className="bg-purple-600 text-cream px-4 py-2 rounded-2xl shadow-clay font-semibold transition-all duration-200 hover:bg-purple-800" onClick={() => setShowModal(true)}>
        Create Proposal
      </button>
      <ul className="mt-4 space-y-3">
        {proposals.map((p) => (
          <li key={p.id} className="flex flex-col md:flex-row md:justify-between items-center bg-white/60 rounded-2xl shadow-clay px-4 py-3 mb-2">
            <span className="font-bold text-taupe">{p.title}</span>
            <span className="text-deepgreen">{p.votes} votes</span>
            <button className="bg-green-600 text-cream px-3 py-1 rounded-2xl ml-2 font-semibold shadow-clay transition-all duration-200 hover:bg-green-800" onClick={() => setSelected(p.id)}>
              Vote
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-cream p-8 rounded-3xl shadow-clay"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold mb-2">Create Proposal</h3>
              <input className="border border-gray px-3 py-2 rounded-2xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-taupe" placeholder="Proposal title" />
              <button className="bg-purple-600 text-cream px-4 py-2 rounded-2xl shadow-clay font-semibold transition-all duration-200 hover:bg-purple-800" onClick={() => setShowModal(false)}>
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-cream p-8 rounded-3xl shadow-clay"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold mb-2">Vote for Proposal</h3>
              <button className="bg-green-600 text-cream px-4 py-2 rounded-2xl shadow-clay font-semibold transition-all duration-200 hover:bg-green-800" onClick={() => setSelected(null)}>
                Confirm Vote
              </button>
      <div className="absolute left-0 bottom-0 w-full pointer-events-none">
        {require('./ConcaveWave').default({ className: 'w-full h-8 md:h-12', fingerprint: true })}
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
