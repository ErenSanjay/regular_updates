import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Letter } from '../data/letters';

interface LetterViewerProps {
  letter: Letter | null;
  onClose: () => void;
}

export const LetterViewer: React.FC<LetterViewerProps> = ({ letter, onClose }) => {
  if (!letter) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[85vh] bg-[#fdfbf7] rounded-xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-white/50 backdrop-blur-md">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-800">{letter.title}</h2>
              <p className="text-sm text-stone-500 italic">{letter.date}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 transition-colors text-stone-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto bg-stone-100/50 p-4 flex items-center justify-center">
            {letter.type === 'pdf' ? (
              <iframe
                src={`${letter.file}#toolbar=0`}
                className="w-full h-full rounded-lg shadow-inner bg-white"
                title={letter.title}
              />
            ) : (
              <img
                src={letter.file}
                alt={letter.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
