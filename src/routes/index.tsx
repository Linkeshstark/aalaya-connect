import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LogoMark } from "@/components/Logo";
import { isAuthed } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: isAuthed() ? "/home" : "/login", replace: true });
    }, 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background">
      {/* soft radial deepam glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, oklch(0.85 0.16 78 / 0.18), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <LogoMark className="size-16" />
        </motion.div>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Divya<span className="text-gold">Gram</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">A quieter feed for devotees.</p>
        </div>
      </motion.div>
    </main>
  );
}
