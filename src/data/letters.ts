export const letters = [
  {
    id: 1,
    title: "My First PDF Letter",
    date: "August 15, 2026",
    file: "/letters/pdf.pdf",
    type: "pdf" as const
  },
  {
    id: 2,
    title: "Another Letter For You ❤️",
    date: "August 24, 2026",
    file: "/letters/pdf2.pdf",
    type: "pdf" as const
  },
  {
    id: 3,
    title: "The Third Letter 💌",
    date: "September 2, 2026",
    file: "/letters/pdf3.pdf",
    type: "pdf" as const
  },
  {
    id: 4,
    title: "A Special Poem",
    date: "September 5, 2026",
    file: "/letters/poem1.pdf",
    type: "pdf" as const
  }
];

export type Letter = typeof letters[0];
