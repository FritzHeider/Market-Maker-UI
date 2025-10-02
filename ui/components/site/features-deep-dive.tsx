"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const content = {
  orchestration: {
    title: "Programmatic orchestration",
    description:
      "Define flows once, then adapt them in production. Guardrails keep every execution observable and reversible.",
    code: `const flow = orchestrator.create({\n  venues: ["binance", "coinbase"],\n  guardrails: {\n    maxDrawdown: "1.5%",\n    inventory: { long: 1200, short: 800 }\n  },\n  approvals: ["treasury", "legal"],\n});`,
  },
  monitoring: {
    title: "Real-time observability",
    description:
      "Single pane of glass across on-chain and off-chain venues. Alerts respect quiet hours and pager rotations.",
    code: `const channel = alerts.channel({\n  team: "liquidity",\n  escalation: ["desk-lead", "director"],\n});\nchannel.subscribe(({ breach }) => {\n  if (breach.type === "volatility") {\n    playbooks.activate("vol-hedge");\n  }\n});`,
  },
  governance: {
    title: "Governance built-in",
    description:
      "Structured approvals and notarized state transitions keep regulators and leadership aligned.",
    code: `const approval = approvals.create({\n  id: "strategy-rollout",\n  reviewers: ["risk", "compliance"],\n  expiresAt: "2025-01-31",\n});\napproval.on("approve", () => deploy("strategy:v3"));`,
  },
};

export function FeaturesDeepDive() {
  return (
    <Tabs defaultValue="orchestration" className="w-full">
      <TabsList>
        <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        <TabsTrigger value="governance">Governance</TabsTrigger>
      </TabsList>
      {Object.entries(content).map(([key, value]) => (
        <TabsContent key={key} value={key}>
          <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr] lg:items-start">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
            <motion.pre
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-x-auto rounded-3xl border border-border/70 bg-muted/50 p-6 text-sm leading-relaxed text-foreground"
            >
              <code>{value.code}</code>
            </motion.pre>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
