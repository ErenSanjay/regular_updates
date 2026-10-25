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
import { VoiceNoteCard } from './components/VoiceNoteCard';
import { MusicPlayer } from './components/MusicPlayer';
import { letters } from './data/letters';
import type { Letter } from './data/letters';
import { voiceNotes } from './data/voiceNotes';
import { Heart, Mic } from 'lucide-react';

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

          {currentTab === 'voicenotes' && (
            <motion.div
              key="voicenotes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100/80 text-rose-500 mb-4 shadow-sm border border-rose-200">
                  <Mic className="w-7 h-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-rose-800 font-bold mb-3">
                  Voice Notes for You
                </h2>
                <p className="text-stone-600 font-serif italic max-w-md mx-auto text-sm md:text-base">
                  Because sometimes letters aren't enough, and I just wanted you to hear my voice.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {voiceNotes.map((note, index) => (
                  <VoiceNoteCard 
                    key={note.id} 
                    note={note} 
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
