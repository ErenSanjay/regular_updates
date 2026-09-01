import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SillyThing } from '../data/sillyThings';

interface SillyThingCardProps {
  item: SillyThing;
  index: number;
}

export const SillyThingCard: React.FC<SillyThingCardProps> = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Create a somewhat random but deterministic rotation based on index
  const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 4));

  return (
    <div 
      className="w-full h-56 cursor-pointer" 
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0, rotateZ: isFlipped ? 0 : rotation }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.02, rotateZ: 0 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border border-rose-100 text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-3xl mb-3">💭</span>
          <h3 className="font-serif text-lg font-medium text-rose-800 leading-snug">{item.title}</h3>
          <div className="absolute bottom-4 text-xs font-semibold text-rose-300 uppercase tracking-widest">Tap to reveal</div>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-lg p-6 flex items-center justify-center text-center text-white"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="font-serif text-md md:text-lg italic leading-relaxed text-white drop-shadow-sm">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
};
