import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  index: number;
}

export function TestimonialCard({ name, role, quote, avatar, index }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/80 p-6 shadow-subtle"
    >
      <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
      <p className="mt-6 text-base text-muted-foreground">{quote}</p>
      <div className="mt-8 flex items-center gap-3">
        <Image
          src={`${avatar}&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80`}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.article>
  );
}
