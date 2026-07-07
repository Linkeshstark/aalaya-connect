import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Image as ImageIcon, Crop, SlidersHorizontal, MapPin, Tag, Check,
} from "lucide-react";
import { templeImages } from "@/lib/mock";

export const Route = createFileRoute("/_app/create")({
  head: () => ({
    meta: [
      { title: "Create · DivyaGram" },
      { name: "description", content: "Share a devotional moment — photo, video or reel." },
    ],
  }),
  component: Create,
});

type Step = 0 | 1 | 2 | 3;
const filters = ["Original", "Deepam", "Vibhuti", "Sandal", "Kumkum", "Chidambaram", "Mist"];

function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [ratio, setRatio] = useState<"1:1" | "4:5" | "16:9">("1:1");
  const [filter, setFilter] = useState("Original");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => (step === 0 ? navigate({ to: "/home" }) : setStep((s) => (s - 1) as Step));

  const titles = ["Choose media", "Crop", "Filters & adjust", "New post"];

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-[860px] flex-col">
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border px-4 py-3">
        <button aria-label="Back" onClick={back} className="rounded-full p-2 hover:bg-muted">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-center text-[15px] font-semibold">{titles[step]}</h1>
        {step < 3 ? (
          <button
            onClick={next}
            disabled={step === 0 && !picked}
            className="rounded-full px-3 py-1.5 text-[14px] font-semibold text-link disabled:opacity-40 hover:bg-muted"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => { navigate({ to: "/home" }); }}
            className="rounded-full bg-[oklch(0.62_0.18_255)] px-4 py-1.5 text-[13.5px] font-semibold text-white hover:brightness-110"
          >
            Share
          </button>
        )}
      </header>

      <div className="flex-1 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {step === 0 && (
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <ImageIcon className="size-4" /> Choose from your gallery
                </p>
                <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
                  {templeImages.concat(templeImages).map((src, i) => {
                    const active = picked === src + i;
                    return (
                      <button
                        key={i}
                        onClick={() => setPicked(src + i)}
                        className={`relative aspect-square overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background transition ${active ? "ring-2 ring-gold" : ""}`}
                      >
                        <img src={src} alt="" width={512} height={512} loading="lazy" className="h-full w-full object-cover" />
                        {active && (
                          <span className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-gold text-background">
                            <Check className="size-4" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step > 0 && picked && (
              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <div className="mx-auto w-full max-w-[520px]">
                  <div
                    className="relative w-full overflow-hidden rounded-xl bg-black"
                    style={{ aspectRatio: ratio === "1:1" ? "1/1" : ratio === "4:5" ? "4/5" : "16/9" }}
                  >
                    <img
                      src={picked.replace(/\d+$/, "")}
                      alt=""
                      className="h-full w-full object-cover"
                      style={filterCss(filter)}
                    />
                  </div>

                  {step === 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {(["1:1", "4:5", "16:9"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRatio(r)}
                          className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                            ratio === r ? "border-gold bg-gold text-background" : "border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          <Crop className="mr-1 inline size-3.5" /> {r}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-4">
                      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
                        {filters.map((f) => (
                          <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`shrink-0 rounded-lg border p-1 text-[11px] font-medium ${filter === f ? "border-gold" : "border-border"}`}
                          >
                            <div className="mb-1 size-16 overflow-hidden rounded-md bg-muted">
                              <img src={picked.replace(/\d+$/, "")} alt="" className="h-full w-full object-cover" style={filterCss(f)} />
                            </div>
                            {f}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-4">
                        <p className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                          <SlidersHorizontal className="size-4" /> Adjust
                        </p>
                        {["Brightness", "Contrast", "Saturation", "Warmth", "Sharpen"].map((k) => (
                          <label key={k} className="grid grid-cols-[110px_1fr_36px] items-center gap-3 text-[12.5px]">
                            <span className="text-muted-foreground">{k}</span>
                            <input type="range" defaultValue={50} className="accent-[oklch(0.72_0.13_75)]" />
                            <span className="text-right text-muted-foreground tabular-nums">50</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {step === 3 && (
                  <aside className="space-y-3">
                    <label className="block">
                      <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Caption</span>
                      <textarea
                        rows={5}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a devotional note…"
                        className="premium-input w-full resize-none rounded-xl border border-border bg-surface p-3 text-[14px] text-foreground placeholder:text-muted-foreground"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Location</span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Add temple or place"
                          className="premium-input w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-[14px]"
                        />
                      </div>
                    </label>
                    <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left text-[13.5px] font-medium hover:bg-muted">
                      <Tag className="size-4 text-muted-foreground" /> Tag devotees
                    </button>
                    <div className="rounded-xl border border-border bg-card p-3">
                      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Advanced</p>
                      {["Hide like count", "Turn off commenting", "Share to community"].map((l) => (
                        <label key={l} className="flex items-center justify-between py-1.5 text-[13.5px]">
                          <span>{l}</span>
                          <input type="checkbox" className="accent-[oklch(0.72_0.13_75)]" />
                        </label>
                      ))}
                    </div>
                  </aside>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step footer for wide screens */}
      {step > 0 && step < 3 && (
        <footer className="hidden items-center justify-end gap-2 border-t border-border p-4 sm:flex">
          <button onClick={back} className="rounded-full px-4 py-2 text-[13.5px] font-semibold hover:bg-muted">Back</button>
          <button onClick={next} className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.62_0.18_255)] px-4 py-2 text-[13.5px] font-semibold text-white hover:brightness-110">
            Next <ArrowRight className="size-4" />
          </button>
        </footer>
      )}
    </div>
  );
}

function filterCss(name: string): React.CSSProperties {
  switch (name) {
    case "Deepam":     return { filter: "brightness(1.05) contrast(1.05) saturate(1.15) sepia(0.15)" };
    case "Vibhuti":    return { filter: "grayscale(0.65) contrast(1.05)" };
    case "Sandal":     return { filter: "sepia(0.35) saturate(1.05) brightness(1.02)" };
    case "Kumkum":     return { filter: "saturate(1.25) hue-rotate(-8deg) contrast(1.05)" };
    case "Chidambaram":return { filter: "brightness(0.92) contrast(1.15) saturate(0.85)" };
    case "Mist":       return { filter: "blur(0.3px) brightness(1.05) saturate(0.85)" };
    default:           return {};
  }
}
