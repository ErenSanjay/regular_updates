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
  },
  {
    id: 5,
    title: "An Honest Letter after self reflection",
    date: "September 6, 2026",
    file: "/letters/pdf4.pdf",
    type: "pdf" as const
  },
  {
    id: 6,
    title: "Sixth Letter",
    date: "September 19, 2026",
    file: "/letters/number7.pdf",
    type: "pdf" as const
  },
  {
    id: 7,
    title: "seventh letter",
    date: "September 21, 2026",
    file: "/letters/number8.pdf",
    type: "pdf" as const
  },
  {
    id: 8,
    title: "Eighth Letter",
    date: "September 24, 2026",
    file: "/letters/number9.pdf",
    type: "pdf" as const
  }

];

export type Letter = typeof letters[0];
