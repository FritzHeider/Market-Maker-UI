import { testimonials } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Testimonials</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Operators say Market Maker feels like an unfair advantage
          </h2>
          <p className="text-lg text-muted-foreground">
            We partner with world-class teams to ship playbooks that keep the desk confident in every market condition.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
