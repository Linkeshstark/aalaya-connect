import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit3, Mic, ImageIcon, Smile, Phone, Video, Info, ArrowLeft } from "lucide-react";
import { avatar, chats, sampleThread } from "@/lib/mock";

export const Route = createFileRoute("/_app/messages")({
  head: () => ({
    meta: [
      { title: "Messages · DivyaGram" },
      { name: "description", content: "Direct messages with priests, devotees and communities." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [active, setActive] = useState<string | null>(chats[0].id);
  const [thread, setThread] = useState(sampleThread);
  const [draft, setDraft] = useState("");
  const [typing] = useState(true);

  const current = chats.find((c) => c.id === active) ?? chats[0];

  const send = () => {
    if (!draft.trim()) return;
    setThread((t) => [...t, { id: `x${t.length}`, from: "me", text: draft.trim(), time: "now" }]);
    setDraft("");
  };

  return (
    <div className="grid h-[calc(100dvh-3.5rem)] grid-cols-1 md:h-dvh md:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]">
      {/* List */}
      <aside className={`flex min-h-0 flex-col border-r border-border bg-background ${active && "hidden md:flex"}`}>
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="font-display text-lg font-bold">arjun.bhakti</h1>
          <button aria-label="New message" className="rounded-full p-2 hover:bg-muted">
            <Edit3 className="size-5" />
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search" className="premium-input w-full rounded-full border border-border bg-muted py-2 pl-9 pr-3 text-[13.5px]" />
          </div>
        </div>
        <div className="px-4 pb-2 text-[13px] font-semibold">Messages</div>
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {chats.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setActive(c.id)}
                className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 text-left transition ${active === c.id ? "bg-muted" : "hover:bg-muted/60"}`}
              >
                <div className="relative">
                  <img src={avatar(c.user.id, 96)} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                  {c.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[oklch(0.72_0.18_150)] ring-2 ring-background" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-foreground">{c.user.name}</p>
                  <p className="truncate text-[12.5px] text-muted-foreground">{c.last}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] text-muted-foreground">{c.timeAgo}</span>
                  {c.unread && (
                    <span className="grid min-w-5 place-items-center rounded-full bg-[oklch(0.62_0.18_255)] px-1.5 py-0.5 text-[10.5px] font-semibold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Thread */}
      <section className={`flex min-h-0 flex-col bg-background ${!active && "hidden md:flex"}`}>
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button aria-label="Back" onClick={() => setActive(null)} className="rounded-full p-2 hover:bg-muted md:hidden">
              <ArrowLeft className="size-5" />
            </button>
            <img src={avatar(current.user.id, 96)} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14.5px] font-semibold">{current.user.name}</p>
            <p className="truncate text-[11.5px] text-muted-foreground">{current.online ? "Active now" : "Active 2h ago"}</p>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="Call" className="rounded-full p-2 hover:bg-muted"><Phone className="size-5" /></button>
            <button aria-label="Video" className="rounded-full p-2 hover:bg-muted"><Video className="size-5" /></button>
            <button aria-label="Info" className="rounded-full p-2 hover:bg-muted"><Info className="size-5" /></button>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4">
          {thread.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[14px] ${
                  m.from === "me"
                    ? "bg-[oklch(0.62_0.18_255)] text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
                <div className={`mt-0.5 text-[10.5px] ${m.from === "me" ? "text-white/75" : "text-muted-foreground"}`}>{m.time}</div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-muted-foreground"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1.5">
            <button aria-label="Emoji" className="rounded-full p-2 hover:bg-muted"><Smile className="size-5" /></button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message…"
              className="flex-1 bg-transparent px-1 text-[14px] outline-none placeholder:text-muted-foreground"
            />
            <button aria-label="Voice" className="rounded-full p-2 hover:bg-muted"><Mic className="size-5" /></button>
            <button aria-label="Image" className="rounded-full p-2 hover:bg-muted"><ImageIcon className="size-5" /></button>
            {draft && (
              <button onClick={send} className="rounded-full bg-[oklch(0.62_0.18_255)] px-3 py-1.5 text-[13px] font-semibold text-white">
                Send
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
