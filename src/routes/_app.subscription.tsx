import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { subscriptionPlans } from "@/lib/mock";

export const Route = createFileRoute("/_app/subscription")({
  head: () => ({
    meta: [
      { title: "Subscription · DivyaGram" },
      { name: "description", content: "Choose Darshan, Premium or VIP — deeper temple experiences on DivyaGram." },
    ],
  }),
  component: Subscription,
});

function Subscription() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6">
      <header className="mb-8 flex items-center gap-3">
        <Link to="/settings" aria-label="Back" className="rounded-full p-2 hover:bg-muted">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-gold">Subscription</p>
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Choose your temple experience</h1>
          <p className="mt-1 max-w-xl text-[13.5px] text-muted-foreground">
            Three quiet ways to spend time inside a sannidhi — for an hour, an afternoon, or a full day.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {subscriptionPlans.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`relative flex flex-col rounded-3xl border p-6 ${
              p.featured
                ? "border-gold bg-gradient-to-b from-[oklch(0.72_0.13_75/0.10)] to-transparent shadow-elevated"
                : "border-border bg-card shadow-card"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background">
                Most chosen
              </span>
            )}
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-gold" />
              <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{p.duration}</p>
            </div>
            <h2 className="mt-1 font-display text-xl font-semibold">{p.name}</h2>
            <p className="mt-1 text-[13.5px] text-muted-foreground">{p.tagline}</p>

            <div className="mt-5">
              <span className="font-display text-4xl font-bold tracking-tight">{p.price}</span>
              <span className="ml-1 text-[13px] text-muted-foreground">/ session</span>
            </div>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-[13.5px] text-foreground/90">
                  <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-gold" : "text-foreground/70"}`} />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 rounded-full py-3 text-[14px] font-semibold transition ${
                p.featured
                  ? "bg-foreground text-background hover:opacity-90"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              Subscribe
            </button>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-[11.5px] text-muted-foreground">
        Prototype only. No payment is processed.
      </p>
    </div>
  );
}
