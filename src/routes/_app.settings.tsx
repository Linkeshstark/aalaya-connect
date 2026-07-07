import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  User as UserIcon, Lock, Bell, Palette, Bookmark, Activity, Languages, HelpCircle,
  Info, LogOut, CreditCard, ChevronRight, Sun, Moon,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · DivyaGram" },
      { name: "description", content: "Manage your DivyaGram account, appearance, notifications and subscription." },
    ],
  }),
  component: Settings,
});

const groups = [
  {
    title: "Account",
    items: [
      { icon: UserIcon,   label: "Profile" },
      { icon: Lock,       label: "Privacy" },
      { icon: Bell,       label: "Notifications" },
      { icon: Bookmark,   label: "Saved" },
      { icon: Activity,   label: "Activity" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Languages,  label: "Language" },
      { icon: HelpCircle, label: "Help" },
      { icon: Info,       label: "About" },
    ],
  },
];

function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme, mounted } = useTheme();

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-6">
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight">Settings</h1>

      {/* Subscription highlight */}
      <Link
        to="/subscription"
        className="mb-6 flex items-center gap-4 rounded-2xl border border-gold/40 bg-gradient-to-br from-[oklch(0.72_0.13_75/0.12)] to-transparent p-4 transition hover:shadow-card"
      >
        <div className="grid size-11 place-items-center rounded-xl bg-gold text-background">
          <CreditCard className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">Subscription</p>
          <p className="truncate text-[12.5px] text-muted-foreground">Darshan, Premium and VIP plans</p>
        </div>
        <ChevronRight className="size-5 text-muted-foreground" />
      </Link>

      {/* Appearance */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
        <p className="px-4 pt-3 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Appearance</p>
        <div className="grid grid-cols-2 gap-3 p-4">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${mounted && theme === "light" ? "border-gold bg-gold-soft/20" : "border-border hover:bg-muted"}`}
          >
            <Sun className="size-5 text-gold" />
            <div>
              <p className="text-[14px] font-semibold">Light</p>
              <p className="text-[11.5px] text-muted-foreground">Bright, temple-white</p>
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${mounted && theme === "dark" ? "border-gold bg-gold-soft/20" : "border-border hover:bg-muted"}`}
          >
            <Moon className="size-5 text-gold" />
            <div>
              <p className="text-[14px] font-semibold">Dark</p>
              <p className="text-[11.5px] text-muted-foreground">Sanctum after dusk</p>
            </div>
          </button>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.title} className="mb-6">
          <p className="mb-2 px-1 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</p>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {g.items.map(({ icon: Icon, label }) => (
              <li key={label}>
                <button className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3.5 text-left hover:bg-muted">
                  <Icon className="size-5 text-foreground/80" />
                  <span className="text-[14.5px] font-medium">{label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <button
        onClick={() => { signOut(); navigate({ to: "/login", replace: true }); }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-[14.5px] font-semibold text-[oklch(0.6_0.22_25)] hover:bg-muted"
      >
        <LogOut className="size-4" /> Log out
      </button>

      <p className="mt-6 text-center text-[11.5px] text-muted-foreground">
        DivyaGram · v0.1 (Prototype) · With devotion
      </p>
    </div>
  );
}
