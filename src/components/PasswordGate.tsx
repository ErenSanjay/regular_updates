import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FloatingHearts } from './FloatingHearts';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_PASSWORD || 'muddu';
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center relative overflow-hidden font-serif">
      <FloatingHearts />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-rose-100 max-w-md w-full mx-4 text-center"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
        </motion.div>
        <h1 className="text-3xl font-bold text-rose-800 mb-2">Hello Love</h1>
        <p className="text-rose-600 mb-8">What's the magic word?</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/50 text-center text-rose-800 placeholder-rose-300"
              placeholder="Enter password..."
              autoFocus
            />
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm"
              >
                That's not it, my love. Try again.
              </motion.p>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-rose-500 text-white font-medium py-3 rounded-xl shadow-md hover:bg-rose-600 transition-colors"
            type="submit"
          >
            Enter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
