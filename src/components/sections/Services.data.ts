import { IconType } from "react-icons";
import { FiBox, FiLayers, FiPieChart, FiHeadphones } from "react-icons/fi";

export interface ServiceItem {
  number: string;
  title: [string, string]; // two lines
  description: string;
  bullets: string[];
  Icon: IconType;
}

export const services: ServiceItem[] = [
  {
    number: "01.",
    title: ["PROJECT", "MANAGEMENT"],
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    Icon: FiBox,
  },
  {
    number: "02.",
    title: ["PRODUCT", "MANAGEMENT"],
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    Icon: FiLayers,
  },
  {
    number: "03.",
    title: ["WEB", "DESIGN"],
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    Icon: FiPieChart,
  },
  {
    number: "04.",
    title: ["BACKEND", "DEVELOPMENT"],
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    Icon: FiHeadphones,
  },
];