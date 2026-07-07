import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Grid3x3, Film, UserSquare2, Settings as SettingsIcon, MapPin } from "lucide-react";
import { avatar, currentUser, posts, reels, templeImages } from "@/lib/mock";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: `${currentUser.name} · DivyaGram` },
      { name: "description", content: `${currentUser.name} on DivyaGram — ${currentUser.bio}` },
    ],
  }),
  component: Profile,
});

const stats = [
  { k: "Posts", v: "148" },
  { k: "Followers", v: "12.4k" },
  { k: "Following", v: "312" },
];

const highlights = [
  { label: "Karthigai", img: templeImages[1] },
  { label: "Girivalam",  img: templeImages[3] },
  { label: "Annadhanam", img: templeImages[4] },
  { label: "Palani",     img: templeImages[0] },
  { label: "Deepam",     img: templeImages[2] },
];

function Profile() {
  const [tab, setTab] = useState<"posts" | "reels" | "tagged">("posts");

  return (
    <div className="mx-auto w-full max-w-[935px] px-4 py-6">
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-[176px_1fr] md:gap-12">
        <div className="story-ring size-20 md:size-40">
          <div className="rounded-full bg-background p-1">
            <img
              src={avatar(currentUser.id, 320)}
              alt=""
              width={160}
              height={160}
              className="size-[calc(100%-8px)] rounded-full object-cover"
            />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{currentUser.handle}</h1>
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-[13px] font-semibold hover:bg-muted">
              Edit profile
            </button>
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-[13px] font-semibold hover:bg-muted">
              Share profile
            </button>
            <Link to="/settings" aria-label="Settings" className="rounded-lg p-1.5 hover:bg-muted">
              <SettingsIcon className="size-5" />
            </Link>
          </div>

          <ul className="mt-4 hidden gap-8 md:flex">
            {stats.map((s) => (
              <li key={s.k} className="text-[14px]">
                <span className="font-semibold">{s.v}</span>{" "}
                <span className="text-foreground/80">{s.k}</span>
              </li>
            ))}
            <li className="text-[14px]">
              <span className="font-semibold text-gold">37</span>{" "}
              <span className="text-foreground/80">temples visited</span>
            </li>
          </ul>

          <div className="mt-4">
            <p className="text-[14px] font-semibold">{currentUser.name}</p>
            <p className="text-[13.5px] text-foreground/85">{currentUser.bio}</p>
          </div>
        </div>
      </header>

      {/* Mobile stats */}
      <ul className="mt-5 grid grid-cols-4 rounded-2xl border border-border bg-card py-3 text-center md:hidden">
        {stats.map((s) => (
          <li key={s.k} className="border-r border-border last:border-r-0">
            <p className="text-[15px] font-semibold">{s.v}</p>
            <p className="text-[11.5px] text-muted-foreground">{s.k}</p>
          </li>
        ))}
        <li>
          <p className="text-[15px] font-semibold text-gold">37</p>
          <p className="text-[11.5px] text-muted-foreground">Temples</p>
        </li>
      </ul>

      {/* Highlights */}
      <section className="mt-6">
        <div className="hide-scrollbar flex gap-5 overflow-x-auto pb-2">
          {highlights.map((h) => (
            <button key={h.label} className="flex shrink-0 flex-col items-center gap-1.5">
              <div className="rounded-full border border-border p-[3px]">
                <img src={h.img} alt="" width={80} height={80} className="size-16 rounded-full object-cover md:size-20" />
              </div>
              <span className="text-[11.5px] text-foreground/80">{h.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <nav className="mt-6 flex items-center justify-center gap-8 border-t border-border">
        {[
          { k: "posts",  label: "Posts",  icon: Grid3x3 },
          { k: "reels",  label: "Reels",  icon: Film },
          { k: "tagged", label: "Tagged", icon: UserSquare2 },
        ].map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => setTab(k as typeof tab)}
            className={`-mt-px flex items-center gap-1.5 border-t px-3 py-3 text-[12px] font-semibold uppercase tracking-wider ${
              tab === k ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <div className="mt-2 grid grid-cols-3 gap-1 sm:gap-2">
        {(tab === "reels" ? reels.map((r) => ({ image: r.image, caption: r.caption, location: r.user.name }))
          : tab === "tagged" ? posts.slice(0, 6)
          : posts
        ).map((p, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden bg-muted sm:rounded-md">
            <img src={p.image} alt="" width={512} height={512} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            {"location" in p && p.location && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                <MapPin className="size-3" /> <span className="truncate">{p.location}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
