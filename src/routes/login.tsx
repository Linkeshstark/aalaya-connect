import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import heroImg from "@/assets/karuppu-swamy-hero.jpg";
import { LogoMark } from "@/components/Logo";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · DivyaGram" },
      { name: "description", content: "Sign in to DivyaGram to share darshan, discover temples and belong to a devotional community." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@aalaya.com");
  const [password, setPassword] = useState("12345678");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim().length > 3 && password.length >= 6;

  const particles = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      left: (i * 43) % 100,
      size: 3 + ((i * 7) % 8),
      delay: (i % 10) * 0.9,
      dur: 14 + ((i * 3) % 12),
      op: 0.35 + ((i % 5) * 0.1),
    })),
    [],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      signIn();
      navigate({ to: "/home", replace: true });
    }, 550);
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[oklch(0.08_0.01_60)] text-white">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Karuppu Swamy standing before an ancient granite temple, lit by oil lamps"
          width={1024}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        />
        {/* mist + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 40%, transparent 0%, oklch(0.08 0.01 60 / 0.85) 100%)",
          }}
        />
        {/* light rays */}
        <motion.div
          aria-hidden
          className="absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2"
          style={{
            background:
              "conic-gradient(from 200deg at 50% 30%, transparent 0deg, oklch(0.9 0.14 80 / 0.10) 20deg, transparent 40deg, transparent 340deg)",
            filter: "blur(30px)",
          }}
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* floating deepam particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: "-40px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.op,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Foreground card */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[380px]"
        >
          <div className="glass rounded-3xl border border-white/12 p-7 shadow-elevated">
            <div className="flex flex-col items-center gap-3">
              <LogoMark className="size-11" />
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                Divya<span className="text-gold">Gram</span>
              </h1>
              <p className="text-center text-[13px] text-white/70">
                A quieter social feed for devotees.
              </p>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-3">
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="premium-input w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-[14px] text-white placeholder:text-white/50"
                />
              </label>
              <label className="relative block">
                <span className="sr-only">Password</span>
                <input
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="premium-input w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 pr-11 text-[14px] text-white placeholder:text-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/70 hover:text-white"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </label>

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-[oklch(0.62_0.18_255)] py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_oklch(0.62_0.18_255/0.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Entering…" : "Log in"}
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  className="text-[12.5px] text-white/70 hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-white/40">
              <span className="h-px flex-1 bg-white/15" />
              or
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <Link
              to="/signup"
              className="block rounded-xl border border-white/20 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/8"
            >
              Create new account
            </Link>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-white/45">
              Demo: <span className="text-white/70">demo@aalaya.com</span> · <span className="text-white/70">12345678</span>
              <br />
              Any realistic email/password works for this preview.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
