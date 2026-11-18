export const gwaPredictScreens = [
  {
    title: "Learn the flow",
    description: "A short intro walks students through the four steps: sync, manual entry, analysis, and results.",
    image: { src: "/projects/gwa-predict/intro.webp", alt: "The first intro step, StayFree Import, next to a folder illustration.", position: "15% center" },
  },
  {
    title: "Upload a StayFree export",
    description: "Students drop in the spreadsheet that the StayFree app exports. The server reads it and pulls out their social media usage.",
    image: { src: "/projects/gwa-predict/file-upload.webp", alt: "The File tab with a drag-and-drop area for a StayFree spreadsheet." },
  },
  {
    title: "Enter usage by hand",
    description: "Students without an export can type in yesterday’s usage, session count, and daily average instead.",
    image: { src: "/projects/gwa-predict/manual-entry.webp", alt: "The Manual tab filled in with usage time, session count, and daily average." },
  },
] as const;
