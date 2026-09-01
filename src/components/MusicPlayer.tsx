import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* You can replace this src with any romantic mp3 URL or local file in public folder */}
      <audio ref={audioRef} loop src="/music.mp3" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/80 backdrop-blur-md border border-rose-200 rounded-full flex items-center justify-center shadow-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <div className="relative">
            <Play className="w-5 h-5 fill-current ml-1" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-rose-400 rounded-full -z-10"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};
