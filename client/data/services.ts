import type { ServiceIllustrationKind } from "@/app/_components/services/service-illustration";

type Service = {
  id: string;
  title: string;
  description: string;
  illustration: ServiceIllustrationKind;
};

export const services = [
  {
    id: "web-development",
    title: "Web Design & Development",
    description: "Responsive websites and web apps, from layout to implementation.",
    illustration: "web",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Computer vision prototypes, from image preprocessing to model evaluation.",
    illustration: "machine-learning",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Mobile apps with clear interfaces and support for offline workflows.",
    illustration: "mobile",
  },
  {
    id: "microcontroller-development",
    title: "ESP32 & Microcontrollers",
    description: "Firmware and prototypes that connect sensors, motors, and apps.",
    illustration: "hardware",
  },
] as const satisfies readonly Service[];
