export type SillyThing = {
  id: number;
  title: string;
  description: string;
  media?: string;
  mediaType?: 'image' | 'video';
};

export const sillyThings: SillyThing[] = [
  {
    id: 1,
    title: "Something I absolutely didn't need to know...",
    description: "but learnt anyway, just because you mentioned it in passing.",
    media: "/silly-things/placeholder1.mp4",
    mediaType: "video"
  },
  {
    id: 2,
    title: "A random thing you mentioned once...",
    description: "and somehow I remembered it, because everything you say is important to me.",
    media: "/silly-things/placeholder2.jpg",
    mediaType: "image"
  },
  {
    id: 3,
    title: "A completely useless fact",
    description: "that I learnt just because of you, to make you smile.",
    media: "/silly-things/placeholder3.mp4",
    mediaType: "video"
  }
];
