export const aboutContent = {
  bio: "I enjoy building websites that solve real problems. I’m curious about new tools and design trends, and I like trying them out in my own projects.",
  education: "BS Computer Science · Expected June 2027",
  stack: [
    { category: "Languages", tools: ["TypeScript", "JavaScript"] },
    { category: "Frontend", tools: ["React", "Next.js", "Tailwind CSS"] },
    { category: "Backend", tools: ["Node.js", "Express"] },
    { category: "Data", tools: ["PostgreSQL", "MongoDB", "Supabase", "Drizzle ORM"] },
    { category: "Computer vision & hardware", tools: ["OpenCV", "ESP32"] },
    { category: "Developer tools", tools: ["Git", "AWS"] },
  ],
  // Stops on the Journey transit map. Exactly one stop should be "current".
  journey: [
    { year: "2023", title: "BS Computer Science", detail: "Started my degree in Laguna.", status: "done" },
    { year: "2026", title: "GWAPredict", detail: "Mini capstone · machine learning", href: "/projects/gwa-predict", status: "done" },
    { year: "2026–27", title: "Smart Egg Sorter", detail: "Thesis · computer vision + ESP32", href: "/projects/smart-egg-sorter", status: "current" },
    { year: "2027", title: "Graduation", detail: "BS Computer Science, June 2027", status: "next" },
  ] as { year: string; title: string; detail: string; href?: string; status: "done" | "current" | "next" }[],
};
