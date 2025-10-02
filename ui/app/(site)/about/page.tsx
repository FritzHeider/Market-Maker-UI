import { teamMembers, values } from "@/lib/copy";
import { Timeline } from "@/components/site/timeline";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            We build guardrails so liquidity teams can move faster with confidence
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Market Maker is a distributed team of quants, engineers, and operators who have run liquidity desks at global exchanges and high-growth protocols.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-3xl border border-border/70 bg-card/80 p-6">
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl font-semibold">Our journey</h2>
              <p className="text-muted-foreground">
                From prototype to global desks, we’ve stayed obsessed with making liquidity operations resilient, transparent, and human.
              </p>
            </div>
            <div className="flex-1">
              <Timeline />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">Leadership</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-3xl border border-border/70 bg-card/80 p-6">
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
