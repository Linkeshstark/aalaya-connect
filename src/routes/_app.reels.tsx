import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, ChevronUp, ChevronDown,
} from "lucide-react";
import { avatar, reels } from "@/lib/mock";

export const Route = createFileRoute("/_app/reels")({
  head: () => ({
    meta: [
      { title: "Reels · DivyaGram" },
      { name: "description", content: "Short devotional videos — deepam, aarti, nadaswaram and temple moments." },
    ],
  }),
  component: Reels,
});

const reportReasons = [
  "Spam", "Violence", "Harassment", "False Information",
  "Hate Speech", "Nudity", "Scam", "Other",
];

function Reels() {
  const [idx, setIdx] = useState(0);
  const [menu, setMenu] = useState(false);
  const [report, setReport] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const go = (delta: number) =>
    setIdx((i) => Math.max(0, Math.min(reels.length - 1, i + delta)));

  return (
    <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-[440px] items-center justify-center bg-background px-0 md:min-h-dvh md:px-4">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black md:rounded-3xl md:shadow-elevated">
        <AnimatePresence mode="wait">
          <motion.img
            key={reels[idx].id}
            src={reels[idx].image}
            alt={reels[idx].caption}
            width={1024}
            height={1820}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* darken */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Right rail */}
        <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5 text-white">
          <ActionButton
            icon={<Heart className={`size-7 ${liked[reels[idx].id] ? "fill-[oklch(0.68_0.22_25)] text-[oklch(0.68_0.22_25)]" : ""}`} />}
            label={((reels[idx].likes + (liked[reels[idx].id] ? 1 : 0)) / 1000).toFixed(1) + "k"}
            onClick={() => setLiked((l) => ({ ...l, [reels[idx].id]: !l[reels[idx].id] }))}
          />
          <ActionButton icon={<MessageCircle className="size-7" />} label={String(reels[idx].comments)} />
          <ActionButton icon={<Send className="size-7" />} label="Share" />
          <ActionButton icon={<Bookmark className="size-7" />} label="Save" />
          <button aria-label="More" onClick={() => setMenu(true)} className="rounded-full p-1 hover:bg-white/10">
            <MoreHorizontal className="size-7" />
          </button>
          <div className="mt-2 rounded-lg p-[3px] ring-2 ring-white/80">
            <img src={avatar(reels[idx].user.id, 96)} alt="" width={36} height={36} className="size-9 rounded-md object-cover" />
          </div>
        </div>

        {/* Bottom meta */}
        <div className="absolute inset-x-0 bottom-0 p-4 pr-24 text-white">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-semibold">{reels[idx].user.handle}</span>
            <button className="rounded-full border border-white/70 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide hover:bg-white hover:text-black">
              Follow
            </button>
          </div>
          <p className="line-clamp-2 text-[13.5px] leading-snug">{reels[idx].caption}</p>
          <div className="mt-2 flex items-center gap-2 text-[12px] text-white/85">
            <Music2 className="size-3.5" />
            <span className="truncate">{reels[idx].audio}</span>
          </div>
        </div>

        {/* Prev / Next controls (desktop nicety) */}
        <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          <button aria-label="Previous" onClick={() => go(-1)} className="rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20">
            <ChevronUp className="size-5" />
          </button>
          <button aria-label="Next" onClick={() => go(1)} className="rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20">
            <ChevronDown className="size-5" />
          </button>
        </div>

        {/* Swipe handlers on mobile */}
        <div className="absolute inset-0 md:hidden" onTouchStart={(e) => {
          const y = e.touches[0].clientY;
          const handler = (ev: TouchEvent) => {
            const dy = ev.changedTouches[0].clientY - y;
            if (Math.abs(dy) > 40) go(dy < 0 ? 1 : -1);
            window.removeEventListener("touchend", handler);
          };
          window.addEventListener("touchend", handler, { once: true });
        }} />
      </div>

      {/* Bottom sheet: menu */}
      <AnimatePresence>
        {menu && (
          <BottomSheet onClose={() => { setMenu(false); setReport(false); }}>
            {!report ? (
              <>
                <MenuRow label="Interested" onClick={() => setMenu(false)} />
                <MenuRow label="Not interested" onClick={() => setMenu(false)} />
                <MenuRow label="Report" tone="destructive" onClick={() => setReport(true)} />
              </>
            ) : (
              <>
                <p className="px-5 pb-2 pt-3 text-sm font-semibold text-foreground">Why are you reporting this?</p>
                {reportReasons.map((r) => (
                  <MenuRow key={r} label={r} onClick={() => { setMenu(false); setReport(false); }} />
                ))}
              </>
            )}
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 rounded-full p-1 hover:bg-white/10">
      <span>{icon}</span>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function BottomSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full max-w-[440px] rounded-t-3xl bg-card pb-6 pt-3 shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border-strong" />
        {children}
      </motion.div>
    </motion.div>
  );
}

function MenuRow({ label, onClick, tone }: { label: string; onClick: () => void; tone?: "destructive" }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full border-t border-border px-5 py-3.5 text-left text-[14.5px] font-medium first:border-t-0 hover:bg-muted ${tone === "destructive" ? "text-[oklch(0.6_0.22_25)]" : "text-foreground"}`}
    >
      {label}
    </button>
  );
}
