export const letters = [
  {
    id: 1,
    title: "My First PDF Letter",
    date: "September 1, 2026",
    file: "/letters/pdf.pdf",
    type: "pdf" as const
  },
  {
    id: 2,
    title: "Another Letter For You ❤️",
    date: "September 5, 2026",
    file: "/letters/pdf2.pdf",
    type: "pdf" as const
  },
  {
    id: 3,
    title: "The Third Letter 💌",
    date: "September 6, 2026",
    file: "/letters/pdf3.pdf",
    type: "pdf" as const
  }
];

export type Letter = typeof letters[0];
