import { createFileRoute, Link, Outlet, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Home, Search, PlusSquare, Film, User as UserIcon,
  Heart, MessageCircle, Sun, Moon,
} from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { isAuthed } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

const nav = [
  { to: "/home",          label: "Home",     icon: Home },
  { to: "/search",        label: "Search",   icon: Search },
  { to: "/create",        label: "Create",   icon: PlusSquare },
  { to: "/reels",         label: "Reels",    icon: Film },
  { to: "/profile",       label: "Profile",  icon: UserIcon },
] as const;

function AppShell() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const { theme, toggle, mounted } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return null;

  const isMessages = pathname.startsWith("/messages");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Top bar (mobile) */}
      <header className="glass sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
        <Wordmark />
        <div className="flex items-center gap-1">
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="rounded-full p-2 text-foreground/80 hover:bg-muted"
          >
            {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <Link to="/notifications" aria-label="Notifications" className="rounded-full p-2 hover:bg-muted">
            <Heart className="size-5" />
          </Link>
          <Link to="/messages" aria-label="Messages" className="rounded-full p-2 hover:bg-muted">
            <MessageCircle className="size-5" />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1200px]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col justify-between border-r border-border px-4 py-6 md:flex xl:w-72">
          <div>
            <div className="mb-6 px-2">
              <Wordmark />
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  activeOptions={{ exact: false }}
                  className="group flex items-center gap-4 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 transition hover:bg-muted data-[status=active]:font-semibold data-[status=active]:text-foreground"
                >
                  <Icon className="size-[22px] transition group-data-[status=active]:scale-105 group-data-[status=active]:text-gold" />
                  <span>{label}</span>
                </Link>
              ))}
              <Link to="/notifications" className="group flex items-center gap-4 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 hover:bg-muted data-[status=active]:font-semibold data-[status=active]:text-foreground">
                <Heart className="size-[22px] group-data-[status=active]:text-gold" />
                <span>Notifications</span>
              </Link>
              <Link to="/messages" className="group flex items-center gap-4 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 hover:bg-muted data-[status=active]:font-semibold data-[status=active]:text-foreground">
                <MessageCircle className="size-[22px] group-data-[status=active]:text-gold" />
                <span>Messages</span>
              </Link>
            </nav>
          </div>

          <div className="space-y-1">
            <button
              onClick={toggle}
              className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 hover:bg-muted"
            >
              {mounted && theme === "dark" ? <Sun className="size-[22px]" /> : <Moon className="size-[22px]" />}
              <span>{mounted && theme === "dark" ? "Light mode" : "Dark mode"}</span>
            </button>
            <Link to="/settings" className="flex items-center gap-4 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 hover:bg-muted data-[status=active]:font-semibold data-[status=active]:text-foreground">
              <UserIcon className="size-[22px]" />
              <span>Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className={`min-w-0 flex-1 ${isMessages ? "" : "pb-20 md:pb-8"}`}>
          <Outlet />
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="glass fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-border md:hidden">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className="group flex h-full w-full items-center justify-center text-foreground/70 data-[status=active]:text-foreground"
          >
            <Icon className="size-6 transition group-data-[status=active]:scale-110 group-data-[status=active]:text-gold" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
