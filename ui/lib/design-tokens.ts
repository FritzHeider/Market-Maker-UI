export const easing = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeIn: [0.12, 0, 0.39, 0] as const,
};

export const durations = {
  xs: 0.18,
  sm: 0.28,
  md: 0.45,
  lg: 0.65,
};

export const springs = {
  float: { type: "spring", stiffness: 120, damping: 18 },
  gentle: { type: "spring", stiffness: 140, damping: 22 },
  snappy: { type: "spring", stiffness: 240, damping: 32 },
};

export const sectionPadding = {
  base: "py-16 sm:py-20 lg:py-28",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export type MetricCopy = {
  label: string;
  value: number;
  suffix?: string;
};

export const metricMotion = {
  initial: { opacity: 0, y: 48, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const revealVariant = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: durations.md,
      ease: easing.easeOut,
    },
  }),
};

export const heroHeadlineGradient =
  "from-primary/90 via-accent/80 to-primary/90";
