import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Bot,
  Radar,
  ShieldCheck,
  Globe2,
  Users,
} from "lucide-react";
import type { MetricCopy } from "./design-tokens";
import { slugify } from "./utils";

type FeatureDefinition = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const heroCopy = {
  kicker: "Algorithmic liquidity, human trust",
  headline: "Design liquidity experiences that feel almost unfair",
  subheading:
    "Market Maker gives growth teams everything they need to launch, scale, and govern automated liquidity programs across every market.",
  primaryCta: { label: "Get started", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
};

export const trustLogos = [
  { name: "Nyx Finance", logo: "/logos/nyx.svg" },
  { name: "Arcadia", logo: "/logos/arcadia.svg" },
  { name: "Helios", logo: "/logos/helios.svg" },
  { name: "Flux", logo: "/logos/flux.svg" },
  { name: "Vantage", logo: "/logos/vantage.svg" },
  { name: "Orbit", logo: "/logos/orbit.svg" },
];

export const features: FeatureDefinition[] = [
  {
    title: "Unified liquidity console",
    description:
      "Command spot, perp, and options liquidity from one control panel with real-time guardrails and delegated approvals.",
    icon: LayoutDashboard,
  },
  {
    title: "Playbooks that win",
    description:
      "Launch curated strategies tuned by our quant desk, then adapt with A/B tests that run safely in production.",
    icon: Bot,
  },
  {
    title: "On-chain observability",
    description:
      "Deterministic audit trails and notarized fills keep regulators and counterparties aligned.",
    icon: Radar,
  },
  {
    title: "Adaptive risk controls",
    description:
      "Programmable guardrails respond to volatility spikes instantly—no late-night panic paging required.",
    icon: ShieldCheck,
  },
  {
    title: "Global coverage",
    description:
      "Route liquidity to 50+ venues with smart bridging, localized compliance, and FX-awareness baked in.",
    icon: Globe2,
  },
  {
    title: "Human-in-the-loop",
    description:
      "Collaborate with treasury, legal, and leadership via approvals, annotations, and secure workspaces.",
    icon: Users,
  },
];

export const metrics: MetricCopy[] = [
  { label: "Average spread improvement", value: 38, suffix: "%" },
  { label: "Deployment time saved", value: 21, suffix: "hrs" },
  { label: "Markets orchestrated", value: 74 },
  { label: "Risk incidents prevented", value: 128 },
];

export const splitCta = {
  title: "Purpose-built automation with humans still steering",
  description:
    "Blend deterministic policies with adaptive playbooks so the desk never loses context. Every execution is observable, commentable, and reversible.",
  bullets: [
    "Workflows orchestrated across DeFi, CeFi, and OTC venues",
    "Shared context with annotations, approvals, and alerts",
    "SOC2, ISO, and MAS reporting with one-click exports",
  ],
  image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
};

export const testimonials = [
  {
    name: "Priya Deshmukh",
    role: "Head of Treasury, Helios",
    quote:
      "We moved from gut-driven liquidity interventions to clear playbooks in under a quarter. Market Maker paid for itself in a week.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    name: "Jonas Richter",
    role: "COO, Flux Trading",
    quote:
      "Regulators never ask for screenshots anymore. The notarized audit trail cut our quarterly reporting time in half.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
  },
  {
    name: "Maya Chen",
    role: "Director of Markets, Orbit",
    quote:
      "The desk finally has a single source of truth. Strategy experiments feel safe—and the win rate shows it.",
    avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  },
  {
    name: "Jamal Wright",
    role: "Head of Liquidity, Nyx",
    quote:
      "The product team built our enterprise onboarding with Market Maker’s APIs in days. We didn’t touch a cron job.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
];

export const pricing = {
  plans: [
    {
      name: "Launch",
      priceMonthly: 0,
      priceAnnual: 0,
      tagline: "For proof-of-liquidity experiments",
      features: [
        "Unlimited sandbox venues",
        "Two strategy playbooks",
        "Community support",
      ],
      cta: { label: "Start for free", href: "/contact" },
    },
    {
      name: "Growth",
      priceMonthly: 890,
      priceAnnual: 890 * 12 * 0.88,
      tagline: "Designed for teams in live markets",
      features: [
        "Cross-venue orchestration",
        "Live risk dashboards",
        "Priority onboarding",
      ],
      featured: true,
      cta: { label: "Talk to sales", href: "/contact" },
    },
    {
      name: "Scale",
      priceMonthly: 1890,
      priceAnnual: 1890 * 12 * 0.88,
      tagline: "Enterprise guardrails & compliance",
      features: [
        "Multi-region deployments",
        "Programmatic approvals",
        "Dedicated quant partner",
      ],
      cta: { label: "Book a demo", href: "/contact" },
    },
    {
      name: "Custom",
      priceMonthly: null,
      priceAnnual: null,
      tagline: "Tailored to mission-critical desks",
      features: [
        "White-glove integrations",
        "24/7 coverage",
        "On-premise & air-gapped options",
      ],
      cta: { label: "Request proposal", href: "/contact" },
    },
  ],
  finePrint: "Annual pricing reflects a 12% savings. All plans include enterprise-grade encryption and SOC2 Type II compliance.",
};

export const faqs = [
  {
    question: "How fast can we deploy a new market?",
    answer:
      "Most teams deploy their first venue in under two weeks thanks to our pre-built connectors and onboarding engineers.",
  },
  {
    question: "Does Market Maker support custom strategies?",
    answer:
      "Yes. Bring your own signals via webhooks or SDK. Our runtime validates, sandboxes, and promotes strategies safely.",
  },
  {
    question: "How do you handle compliance?",
    answer:
      "We maintain SOC2 Type II, ISO 27001, and regional frameworks. Automated reporting keeps auditors aligned.",
  },
  {
    question: "What if we already have in-house tooling?",
    answer:
      "Use Market Maker’s GraphQL and gRPC APIs to augment existing systems without ripping and replacing.",
  },
  {
    question: "Can I try it before committing?",
    answer:
      "Yes. The Launch tier lets you connect to sandbox venues with full observability and risk guardrails.",
  },
  {
    question: "Is there a service level agreement?",
    answer:
      "Enterprise customers receive 99.95% uptime guarantees and a signed SLA with financial remedies.",
  },
];

export const blogPosts = [
  {
    title: "Liquidity strategy patterns for volatile cycles",
    excerpt:
      "Quantifying the trade-offs between passive and active liquidity in a macro regime defined by volatility spikes.",
    author: "Cleo Hart",
    date: "2024-10-02",
    readingTime: "8 min read",
    slug: slugify("Liquidity strategy patterns for volatile cycles"),
    file: "volatile-cycles.mdx",
  },
  {
    title: "Designing approvals that keep risk human",
    excerpt:
      "Why adaptive guardrails and contextual approvals are the key to scaling liquidity operations responsibly.",
    author: "Rafael Soto",
    date: "2024-08-18",
    readingTime: "6 min read",
    slug: slugify("Designing approvals that keep risk human"),
    file: "designing-approvals.mdx",
  },
  {
    title: "What regulators want from automated market makers",
    excerpt:
      "A practical guide to building regulator-grade audit trails without slowing your team down.",
    author: "Marina Kwon",
    date: "2024-05-12",
    readingTime: "10 min read",
    slug: slugify("What regulators want from automated market makers"),
    file: "regulator-playbook.mdx",
  },
];

export const teamMembers = [
  {
    name: "Rowan Patel",
    role: "Co-founder & CEO",
    bio: "Former head of liquidity at a top 5 exchange. Obsessed with aligning incentives between markets and makers.",
  },
  {
    name: "Lea Alvarez",
    role: "Chief Product Officer",
    bio: "Built mission-critical trading systems for sovereign wealth funds and scale-ups alike.",
  },
  {
    name: "Taro Nishimura",
    role: "VP of Engineering",
    bio: "Leads our engineering guilds with a focus on resilience, developer experience, and observability.",
  },
  {
    name: "Grace Holloway",
    role: "Head of Regulatory Affairs",
    bio: "Advocated for digital asset frameworks across APAC and the EU; ensures our playbooks stay compliant.",
  },
];

export const values = [
  {
    title: "Integrity in automation",
    description: "Every workflow is explainable, auditable, and reversible because trust scales markets.",
  },
  {
    title: "Momentum with restraint",
    description: "Ship fast but measure everything. Guardrails let teams take bold bets without losing sleep.",
  },
  {
    title: "Outcomes over ego",
    description: "Cross-functional pods obsess over customer impact, not vanity metrics.",
  },
];

export const timeline = [
  { year: "2019", description: "Prototype built to solve fragmented liquidity for a single exchange." },
  { year: "2020", description: "Raised seed round and connected to 12 venues across 3 continents." },
  { year: "2022", description: "Launched adaptive guardrails and notarized audit trails." },
  { year: "2024", description: "Trusted by 60+ liquidity teams with enterprise SLAs." },
];

export const contactCopy = {
  intro: "Tell us about your liquidity goals and we’ll craft a tailored playbook in under 48 hours.",
  privacy: "We’ll only use your information to respond to this inquiry. Read our privacy commitment for more details.",
};

export const emailCaptureCopy = {
  headline: "Get the liquidity briefing",
  description: "Monthly strategies, templates, and operator interviews. No spam—unsubscribe anytime.",
  placeholder: "you@company.com",
  button: "Join the list",
};
