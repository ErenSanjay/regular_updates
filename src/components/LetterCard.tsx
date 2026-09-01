import React from 'react';
import { motion } from 'framer-motion';
import type { Letter } from '../data/letters';
import { FileText, Image as ImageIcon } from 'lucide-react';

interface LetterCardProps {
  letter: Letter;
  onClick: (letter: Letter) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(letter)}
      className="bg-[#fdfbf7] p-6 rounded-md shadow-md border border-stone-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-48 group"
      style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e5f7 28px)',
        backgroundSize: '100% 28px',
        backgroundPosition: '0 5px'
      }}
    >
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
        {letter.type === 'pdf' ? <FileText className="text-stone-400" /> : <ImageIcon className="text-stone-400" />}
      </div>
      
      <div>
        <h3 className="font-serif text-xl text-stone-800 font-bold mb-2 leading-tight">{letter.title}</h3>
      </div>
      
      <div className="mt-auto pt-4 border-t border-stone-200/50">
        <p className="text-sm text-stone-500 font-serif italic">{letter.date}</p>
      </div>
    </motion.div>
  );
};
