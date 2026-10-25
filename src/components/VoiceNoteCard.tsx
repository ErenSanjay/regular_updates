import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Download, 
  Repeat, 
  Mic, 
  Sliders
} from 'lucide-react';
import type { VoiceNote } from '../data/voiceNotes';

interface VoiceNoteCardProps {
  note: VoiceNote;
  index: number;
}

export const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({ note, index }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showNative, setShowNative] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync audio playback rate and loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, [playbackRate, isLooping]);

  // Handle multi-audio coordination & background music
  useEffect(() => {
    const handleOtherPlayed = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: number }>;
      if (customEvent.detail && customEvent.detail.id !== note.id) {
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('voice-note-played', handleOtherPlayed);
    return () => window.removeEventListener('voice-note-played', handleOtherPlayed);
  }, [note.id, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause background music if active
      window.dispatchEvent(new CustomEvent('pause-bg-music'));
      // Pause any other voice notes
      window.dispatchEvent(new CustomEvent('voice-note-played', { detail: { id: note.id } }));
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleEnded = () => {
    if (!isLooping) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clickPosition = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = clickPosition * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    const target = Math.max(0, Math.min(duration || 0, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.75];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Waveform bars count
  const waveBars = 32;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full bg-gradient-to-br from-white via-rose-50/40 to-pink-50/30 rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(244,63,94,0.08)] border border-rose-100/80 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={note.file}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-rose-900 tracking-tight">
              {note.title}
            </h3>
            <p className="text-xs md:text-sm text-rose-400/90 font-medium flex items-center gap-1.5 mt-0.5">
              <span>{note.date}</span>
              <span>•</span>
              <span>{duration > 0 ? `${formatTime(duration)} mins` : (isLoaded ? 'Ready' : 'Audio Note')}</span>
            </p>
          </div>
        </div>

        {/* Speed & Repeat badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={cycleSpeed}
            title="Change Playback Speed"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100/70 text-rose-700 hover:bg-rose-200/80 transition-colors border border-rose-200/60 flex items-center gap-1"
          >
            <span>{playbackRate}x</span>
          </button>

          <button
            onClick={() => setIsLooping(!isLooping)}
            title={isLooping ? "Repeat is ON" : "Repeat is OFF"}
            className={`p-1.5 rounded-full transition-colors border ${
              isLooping 
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm' 
                : 'bg-rose-50 text-rose-400 hover:text-rose-600 border-rose-100'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>

          <a
            href={note.file}
            download
            title="Download Voice Note"
            className="p-1.5 rounded-full bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100/70 border border-rose-100 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Description / Thought note */}
      {note.description && (
        <p className="font-serif italic text-stone-600 text-sm md:text-base leading-relaxed mb-6 px-1 border-l-2 border-rose-200 pl-3">
          "{note.description}"
        </p>
      )}

      {/* Animated Soundwave Visualizer */}
      <div className="mb-6 py-2 px-1 flex items-center justify-between gap-1 h-14 bg-white/60 rounded-2xl border border-rose-100/60 px-4">
        {Array.from({ length: waveBars }).map((_, i) => {
          // Calculate an aesthetic wave pattern
          const baseHeight = Math.sin((i / waveBars) * Math.PI) * 65 + 20;
          const isBarPlayed = (i / waveBars) * 100 <= progressPercent;

          return (
            <motion.div
              key={i}
              className={`w-1 rounded-full transition-colors duration-150 ${
                isBarPlayed 
                  ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' 
                  : 'bg-rose-200/80'
              }`}
              animate={isPlaying ? {
                height: [
                  `${Math.max(15, baseHeight * 0.4)}%`,
                  `${Math.min(95, baseHeight * 1.2)}%`,
                  `${Math.max(20, baseHeight * 0.6)}%`,
                  `${Math.min(100, baseHeight * 1.35)}%`,
                  `${Math.max(15, baseHeight * 0.5)}%`,
                ]
              } : {
                height: `${baseHeight}%`
              }}
              transition={isPlaying ? {
                duration: 0.8 + ((i % 5) * 0.15),
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: (i % 7) * 0.08
              } : { duration: 0.3 }}
            />
          );
        })}
      </div>

      {/* Progress Bar / Scrubber */}
      <div className="mb-5">
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="group relative w-full h-3 bg-rose-100/80 rounded-full cursor-pointer overflow-hidden py-1"
        >
          {/* Filled track */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Hover glow line */}
          <div className="absolute inset-0 bg-rose-300/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
        </div>

        {/* Timestamps */}
        <div className="flex justify-between items-center text-xs text-rose-500/80 font-mono mt-1.5 px-0.5">
          <span>{formatTime(currentTime)}</span>
          <span className="flex items-center gap-1 font-sans text-stone-500 text-[11px]">
            {isLooping && <span className="text-rose-500 font-medium">Looping</span>}
            <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
          </span>
        </div>
      </div>

      {/* Primary Audio Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-rose-100/60">
        {/* Playback Controls (Skip 10s, Play/Pause, Skip 10s) */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => skipTime(-10)}
            title="Rewind 10 seconds"
            className="p-2.5 rounded-full text-rose-500 hover:text-rose-700 hover:bg-rose-100/60 transition-colors"
          >
            <div className="relative">
              <RotateCcw className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 text-[8px] font-bold">10</span>
            </div>
          </button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-lg shadow-rose-300/60 hover:shadow-rose-300/80 transition-shadow relative"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}

            {/* Subtle glow ring when playing */}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-rose-400"
              />
            )}
          </motion.button>

          <button
            onClick={() => skipTime(10)}
            title="Forward 10 seconds"
            className="p-2.5 rounded-full text-rose-500 hover:text-rose-700 hover:bg-rose-100/60 transition-colors"
          >
            <div className="relative">
              <RotateCw className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 text-[8px] font-bold">10</span>
            </div>
          </button>
        </div>

        {/* Volume & Native Controls Toggle */}
        <div className="flex items-center gap-3">
          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-white/80 border border-rose-100 rounded-full px-3 py-1.5 shadow-sm">
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-400" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              className="w-16 md:w-20 h-1.5 accent-rose-500 cursor-pointer bg-rose-100 rounded-full"
            />
          </div>

          {/* Optional Native Audio player toggle */}
          <button
            onClick={() => setShowNative(!showNative)}
            title="Toggle standard browser audio bar"
            className={`p-2 rounded-full border transition-colors ${
              showNative 
                ? 'bg-rose-100 text-rose-700 border-rose-300' 
                : 'bg-white/80 text-stone-400 hover:text-rose-500 border-rose-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fallback Native Browser Controls */}
      {showNative && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-rose-100"
        >
          <p className="text-xs text-stone-500 mb-2">Standard Browser Player:</p>
          <audio controls className="w-full accent-rose-500" src={note.file} />
        </motion.div>
      )}
    </motion.div>
  );
};
