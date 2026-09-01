export const letters = [
  {
    id: 1,
    title: "The first letter",
    date: "September 1, 2026",
    file: "/letters/letter-01.pdf",
    type: "pdf" as const
  },
  {
    id: 2,
    title: "For you ❤️",
    date: "September 5, 2026",
    file: "/letters/letter-02.jpg",
    type: "image" as const
  }
];

export type Letter = typeof letters[0];
