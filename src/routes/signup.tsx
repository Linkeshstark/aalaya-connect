import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogoMark } from "@/components/Logo";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account · DivyaGram" },
      { name: "description", content: "Join DivyaGram — a devotional social network for South Indian temples, festivals and priests." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const [f, setF] = useState({
    name: "", email: "", phone: "", aadhaar: "", password: "", confirm: "",
  });
  const on = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    navigate({ to: "/home", replace: true });
  };

  return (
    <main className="min-h-dvh bg-background px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-[420px]"
      >
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <div className="flex flex-col items-center gap-2">
            <LogoMark className="size-10" />
            <h1 className="font-display text-xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-center text-[13px] text-muted-foreground">
              Share darshan. Find your sannidhi. Belong.
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {[
              { k: "name", ph: "Full name", type: "text", ac: "name" },
              { k: "email", ph: "Email", type: "email", ac: "email" },
              { k: "phone", ph: "Phone number", type: "tel", ac: "tel" },
              { k: "aadhaar", ph: "Aadhaar number", type: "text", ac: "off" },
              { k: "password", ph: "Create password", type: "password", ac: "new-password" },
              { k: "confirm", ph: "Confirm password", type: "password", ac: "new-password" },
            ].map((it) => (
              <input
                key={it.k}
                type={it.type}
                autoComplete={it.ac}
                placeholder={it.ph}
                value={f[it.k as keyof typeof f]}
                onChange={on(it.k as keyof typeof f)}
                className="premium-input w-full rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground"
              />
            ))}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[oklch(0.62_0.18_255)] py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Create account
            </button>

            <p className="pt-1 text-center text-[11px] leading-relaxed text-muted-foreground">
              By continuing you agree to DivyaGram's Terms & Community Guidelines.
            </p>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-link hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
