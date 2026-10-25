export type VoiceNote = {
  id: number;
  title: string;
  date: string;
  file: string;
  description?: string;
  duration?: string;
};

export const voiceNotes: VoiceNote[] = [
  {
    id: 1,
    title: "Voice Note for You ❤️",
    date: "October 25, 2026",
    file: "/silly-things/voice_note1.mp3",
    description: "A little voice note recorded just for you. Put on your headphones and listen closely. 🎧",
  }
];
