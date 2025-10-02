import { faqs } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1fr,1.1fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Everything you need to stay in command of liquidity
          </h2>
          <p className="text-lg text-muted-foreground">
            Can’t find the answer you’re looking for? Email us at <a href="mailto:hello@marketmaker.com" className="text-primary underline underline-offset-4">hello@marketmaker.com</a>.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
