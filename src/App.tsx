import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PasswordGate } from './components/PasswordGate';
import { RomanticIntro } from './components/RomanticIntro';
import { HeartCursor } from './components/HeartCursor';
import { FloatingHearts } from './components/FloatingHearts';
import { Navigation } from './components/Navigation';
import type { Tab } from './components/Navigation';
import { LetterCard } from './components/LetterCard';
import { LetterViewer } from './components/LetterViewer';
import { SillyThingCard } from './components/SillyThingCard';
import { MusicPlayer } from './components/MusicPlayer';
import { letters } from './data/letters';
import type { Letter } from './data/letters';
import { sillyThings } from './data/sillyThings';
import { Heart } from 'lucide-react';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  if (!introFinished) {
    return <RomanticIntro onComplete={() => setIntroFinished(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans relative selection:bg-rose-200">
      <HeartCursor />
      <FloatingHearts />
      <MusicPlayer />
      <Navigation currentTab={currentTab} onChange={setCurrentTab} />

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Heart className="w-16 h-16 text-rose-400 fill-rose-400 opacity-80" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-serif text-rose-800 font-bold mb-6">
                For You
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-stone-600 max-w-2xl leading-relaxed">
                "Whenever I feel like talking to you, I will be writing a letter and updating the letter to this website."
              </p>
            </motion.div>
          )}

          {currentTab === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif text-rose-800 font-bold mb-8 text-center">My Letters to You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {letters.map((letter) => (
                  <LetterCard 
                    key={letter.id} 
                    letter={letter} 
                    onClick={setSelectedLetter} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentTab === 'silly' && (
            <motion.div
              key="silly"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif text-rose-800 font-bold mb-8 text-center">Silly Things I Remember</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sillyThings.map((thing, index) => (
                  <SillyThingCard 
                    key={thing.id} 
                    item={thing} 
                    index={index} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <LetterViewer 
        letter={selectedLetter} 
        onClose={() => setSelectedLetter(null)} 
      />
    </div>
  );
}

export default App;
