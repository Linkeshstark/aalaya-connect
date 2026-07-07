import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon, X, TrendingUp, Clock } from "lucide-react";
import { recentSearches, searchCategories, templeImages, trendingTags } from "@/lib/mock";

export const Route = createFileRoute("/_app/search")({
  head: () => ({
    meta: [
      { title: "Search · DivyaGram" },
      { name: "description", content: "Explore temples, gods, festivals, pilgrimages and devotional communities." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Trending");

  const grid = useMemo(() => Array.from({ length: 21 }, (_, i) => templeImages[i % templeImages.length]), []);

  return (
    <div className="mx-auto w-full max-w-[935px] px-4 py-4">
      {/* Search bar */}
      <div className="sticky top-14 z-30 -mx-4 mb-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:top-0">
        <label className="relative block">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search temples, priests, festivals…"
            className="premium-input w-full rounded-full border border-border bg-muted py-2.5 pl-11 pr-10 text-[14px] text-foreground placeholder:text-muted-foreground"
          />
          {q && (
            <button aria-label="Clear" onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-border">
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>

      {q ? (
        <div className="space-y-6">
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="size-3.5" /> Recent
            </h2>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
              {recentSearches
                .filter((r) => r.toLowerCase().includes(q.toLowerCase()))
                .map((r) => (
                  <li key={r} className="flex items-center justify-between px-4 py-3 text-[14px] hover:bg-muted">
                    <span>{r}</span>
                    <X className="size-4 text-muted-foreground" />
                  </li>
                ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="size-3.5" /> Suggested
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingTags
                .filter((t) => t.toLowerCase().includes(q.toLowerCase()))
                .map((t) => (
                  <button key={t} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-muted">
                    {t}
                  </button>
                ))}
            </div>
          </section>
        </div>
      ) : (
        <>
          {/* Category chips */}
          <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto">
            {searchCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Trending tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {trendingTags.map((t) => (
              <button key={t} className="rounded-full border border-border bg-card px-3 py-1 text-[12px] font-medium text-foreground/85 hover:bg-muted">
                {t}
              </button>
            ))}
          </div>

          {/* Explore grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {grid.map((src, i) => {
              // Instagram-style: every 6th tile spans 2×2
              const tall = i % 7 === 3;
              return (
                <button
                  key={i}
                  className={`group relative overflow-hidden bg-muted sm:rounded-md ${tall ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}
                >
                  <img
                    src={src}
                    alt=""
                    width={512}
                    height={tall ? 1024 : 512}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
