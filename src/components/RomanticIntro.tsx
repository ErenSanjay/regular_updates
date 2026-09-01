import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface RomanticIntroProps {
  onComplete: () => void;
}

export const RomanticIntro: React.FC<RomanticIntroProps> = ({ onComplete }) => {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setTextStage(1), 2000); // Start typing
    const timer2 = setTimeout(() => setTextStage(2), 6000); // Fade out text
    const timer3 = setTimeout(() => onComplete(), 7000); // End intro

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const message = "words can't express the feelings you initiated in my soul";

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-rose-950 flex flex-col items-center justify-center z-50 font-serif"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Tiny glowing stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], filter: ['drop-shadow(0 0 0px rgba(244,63,94,0))', 'drop-shadow(0 0 20px rgba(244,63,94,0.5))', 'drop-shadow(0 0 0px rgba(244,63,94,0))'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
        </motion.div>
      </motion.div>

      <div className="h-20 flex items-center justify-center px-6 text-center">
        {textStage >= 1 && textStage < 2 && (
          <motion.p
            initial={{ opacity: 1 }}
            className="text-rose-100 text-xl md:text-2xl italic font-light tracking-wide"
          >
            {message.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        )}
        
        {textStage === 2 && (
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-rose-100 text-xl md:text-2xl italic font-light tracking-wide"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
