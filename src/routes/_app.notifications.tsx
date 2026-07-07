import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, UserPlus, CalendarClock, Bell } from "lucide-react";
import { avatar, notifications } from "@/lib/mock";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · DivyaGram" },
      { name: "description", content: "Likes, comments, follows and temple reminders." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const groups = [
    { title: "Today", items: notifications.slice(0, 3) },
    { title: "This week", items: notifications.slice(3, 6) },
    { title: "Earlier", items: notifications.slice(6) },
  ];

  return (
    <div className="mx-auto w-full max-w-[600px] px-4 py-6">
      <h1 className="mb-4 font-display text-2xl font-bold tracking-tight">Notifications</h1>

      {groups.map((g) => (
        <section key={g.title} className="mb-6">
          <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {g.items.map((n) => (
              <li key={n.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3">
                <div className="relative">
                  {n.user ? (
                    <img src={avatar(n.user.id, 96)} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                  ) : (
                    <div className="grid size-10 place-items-center rounded-full bg-gold-soft text-background">
                      <Bell className="size-5" />
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-background ring-2 ring-card">
                    <KindIcon kind={n.kind} />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] text-foreground">
                    {n.user && <span className="font-semibold">{n.user.handle} </span>}
                    <span className="text-foreground/85">{n.text}</span>
                  </p>
                  <p className="text-[11.5px] text-muted-foreground">{n.timeAgo} ago</p>
                </div>
                {n.image ? (
                  <img src={n.image} alt="" width={44} height={44} className="size-11 rounded-md object-cover" />
                ) : n.kind === "follow" ? (
                  <button className="rounded-full bg-[oklch(0.62_0.18_255)] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:brightness-110">
                    Follow
                  </button>
                ) : n.kind === "invite" ? (
                  <button className="rounded-full border border-border bg-card px-3 py-1.5 text-[12.5px] font-semibold text-foreground hover:bg-muted">
                    View
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function KindIcon({ kind }: { kind: string }) {
  const cls = "size-3";
  if (kind === "like")     return <Heart className={`${cls} text-[oklch(0.62_0.22_25)]`} />;
  if (kind === "comment")  return <MessageCircle className={`${cls} text-link`} />;
  if (kind === "follow")   return <UserPlus className={`${cls} text-gold`} />;
  if (kind === "invite")   return <CalendarClock className={`${cls} text-gold`} />;
  return <Bell className={`${cls} text-muted-foreground`} />;
}
