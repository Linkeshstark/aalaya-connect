import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin,
} from "lucide-react";
import { avatar, currentUser, posts as seedPosts, stories, type Post } from "@/lib/mock";

export const Route = createFileRoute("/_app/home")({
  head: () => ({
    meta: [
      { title: "Home · DivyaGram" },
      { name: "description", content: "Your devotional feed — darshan, festivals, prasadam and quiet moments from South Indian temples." },
    ],
  }),
  component: Home,
});

function Home() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  const toggle = (id: string, key: "liked" | "saved") =>
    setPosts((p) =>
      p.map((x) =>
        x.id === id
          ? {
              ...x,
              [key]: !x[key],
              likes: key === "liked" ? x.likes + (x.liked ? -1 : 1) : x.likes,
            }
          : x,
      ),
    );

  return (
    <div className="mx-auto w-full max-w-[520px] px-0 sm:px-4">
      {/* Stories */}
      <section
        aria-label="Stories"
        className="hide-scrollbar flex gap-4 overflow-x-auto border-b border-border bg-background/40 px-4 py-4 sm:rounded-2xl sm:border sm:bg-card sm:px-5 sm:py-4"
      >
        {[currentUser, ...stories.map((s) => s.user)].map((u, i) => (
          <button
            key={u.id + i}
            className="flex shrink-0 flex-col items-center gap-1.5"
            aria-label={`${u.name}'s story`}
          >
            <div className={i === 0 ? "rounded-full p-[2px] ring-2 ring-border" : "story-ring"}>
              <div className="rounded-full bg-background p-[2px]">
                <img
                  src={avatar(u.id, 128)}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="max-w-[64px] truncate text-[11px] text-foreground/80">
              {i === 0 ? "Your story" : u.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </section>

      {/* Feed */}
      <div className="flex flex-col gap-2 sm:gap-6">
        {posts.map((p, idx) => (
          <PostCard
            key={p.id}
            post={p}
            priority={idx === 0}
            onLike={() => toggle(p.id, "liked")}
            onSave={() => toggle(p.id, "saved")}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post, priority, onLike, onSave,
}: { post: Post; priority?: boolean; onLike: () => void; onSave: () => void }) {
  const [showHeart, setShowHeart] = useState(false);

  const dbl = () => {
    if (!post.liked) onLike();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 700);
  };

  return (
    <article className="mt-2 border-t border-border bg-background sm:mt-0 sm:rounded-2xl sm:border sm:bg-card sm:shadow-card">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="story-ring shrink-0">
            <div className="rounded-full bg-background p-[2px]">
              <img src={avatar(post.user.id, 96)} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-foreground">{post.user.name}</p>
            <p className="flex items-center gap-1 truncate text-[11.5px] text-muted-foreground">
              <MapPin className="size-3" /> {post.location}
            </p>
          </div>
        </div>
        <button aria-label="More" className="shrink-0 rounded-full p-2 hover:bg-muted">
          <MoreHorizontal className="size-5" />
        </button>
      </header>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted" onDoubleClick={dbl}>
        <img
          src={post.image}
          alt={post.caption.slice(0, 80)}
          width={1024}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
        />
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <Heart className="size-24 fill-white/90 text-white/90 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-3 pt-2">
        <button aria-label="Like" onClick={onLike} className="rounded-full p-2 hover:bg-muted">
          <motion.span animate={{ scale: post.liked ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.28 }} className="inline-flex">
            <Heart className={`size-6 ${post.liked ? "fill-[oklch(0.62_0.22_25)] text-[oklch(0.62_0.22_25)]" : "text-foreground"}`} />
          </motion.span>
        </button>
        <button aria-label="Comment" className="rounded-full p-2 hover:bg-muted">
          <MessageCircle className="size-6" />
        </button>
        <button aria-label="Share" className="rounded-full p-2 hover:bg-muted">
          <Send className="size-6" />
        </button>
        <button aria-label="Save" onClick={onSave} className="ml-auto rounded-full p-2 hover:bg-muted">
          <Bookmark className={`size-6 ${post.saved ? "fill-foreground text-foreground" : "text-foreground"}`} />
        </button>
      </div>

      {/* Meta */}
      <div className="space-y-1 px-4 pb-4 pt-1">
        <p className="text-[14px] font-semibold text-foreground">
          {post.likes.toLocaleString()} likes
        </p>
        <p className="text-[14px] leading-snug text-foreground">
          <span className="font-semibold">{post.user.handle}</span>{" "}
          <span className="text-foreground/90">{post.caption}</span>
        </p>
        <button className="text-[13px] text-muted-foreground hover:underline">
          View all {post.comments} comments
        </button>
        <p className="pt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          {post.timeAgo} ago
        </p>
      </div>
    </article>
  );
}
