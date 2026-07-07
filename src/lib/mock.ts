import temple1 from "@/assets/temple-1.jpg";
import temple2 from "@/assets/temple-2.jpg";
import temple3 from "@/assets/temple-3.jpg";
import temple4 from "@/assets/temple-4.jpg";
import temple5 from "@/assets/temple-5.jpg";
import temple6 from "@/assets/temple-6.jpg";

export const templeImages = [temple1, temple2, temple3, temple4, temple5, temple6];

export const avatar = (seed: string, size = 96) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;

export type User = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  role: string;
};

export const currentUser: User = {
  id: "me",
  name: "Arjun Bhaktan",
  handle: "arjun.bhakti",
  bio: "Seeker of stillness · Devotee of Karuppu Swamy · Temple photographer",
  role: "Devotee",
};

export const users: User[] = [
  { id: "u1", name: "Sri Ramanathan", handle: "priest.ramanathan", bio: "Head priest · Meenakshi Amman Temple", role: "Priest" },
  { id: "u2", name: "Meera Iyer", handle: "meera.murugan", bio: "Murugan devotee · Palani pilgrim", role: "Devotee" },
  { id: "u3", name: "Karthik Velu", handle: "karuppu.bhaktan", bio: "Karuppu Swamy sannidhi · Village of Ayyanarpuram", role: "Devotee" },
  { id: "u4", name: "Lakshmi Amma", handle: "meenakshi.amma", bio: "Serving annadhanam · 42 years", role: "Sevaka" },
  { id: "u5", name: "Arun Shivan", handle: "shiva.thillai", bio: "Chidambaram Nataraja bhakta", role: "Devotee" },
  { id: "u6", name: "Priya Annamalai", handle: "annamalai.giri", bio: "Girivalam every full moon", role: "Pilgrim" },
  { id: "u7", name: "Vishnu Kumar", handle: "srirangam.vishnu", bio: "Srirangam Ranganathar seva", role: "Sevaka" },
  { id: "u8", name: "Aishwarya Devi", handle: "kamakshi.devi", bio: "Kanchipuram Kamakshi Amman", role: "Devotee" },
];

export type Post = {
  id: string;
  user: User;
  image: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked?: boolean;
  saved?: boolean;
};

const captions = [
  "Brahma muhurtham darshan at the sannidhi. There is nothing like the silence of a temple before dawn. 🪔",
  "Annadhanam today for 800 devotees. Every plate is a prayer answered.",
  "Karthigai deepam. Ten thousand lamps and one heart, still.",
  "Girivalam under the Karthigai full moon. Fourteen kilometres, one Arunachala.",
  "The gopuram at first light. Granite, gold and grace.",
  "Malligai malai for the Amman. She wears the morning like a smile.",
  "Karuppu Swamy sannidhi — the guardian who never sleeps. Aruval, deepam, faith.",
  "Aavani Avittam ceremony in the temple tank. Ancient sound in modern water.",
  "Vibhuti and kumkum, prasadam and quiet. This is the whole world some mornings.",
  "Nadaswaram at sunset. The stones remember every raga.",
  "Ther thiruvizha — chariot festival. Ten streets, ten thousand hands, one deity.",
  "Panchamurtham prasadam at Palani. Six flavours, one blessing.",
  "The temple tank at Madurai. Reflection is a form of prayer.",
  "Abhishekam with milk, honey, sandal, rose. The Lord bathed in devotion.",
  "Deepa aradhana. The camphor flame is small. The heart it lights is not.",
  "Pradosham at Thiruvannamalai. Shiva dances at dusk.",
  "Amma’s saree fold, her mangala aarti, my grandmother’s hand on my head. Home.",
  "Golu display for Navratri — nine nights, nine forms, one Devi.",
  "Vaikunta Ekadasi at Srirangam. The gate of heaven opens for one day.",
  "Temple corridor at midnight. Silence has a sound and it is bells.",
];

const locations = [
  "Meenakshi Amman Kovil, Madurai",
  "Arunachaleswarar Temple, Thiruvannamalai",
  "Brihadeeswarar Temple, Thanjavur",
  "Srirangam Ranganathaswamy Temple",
  "Palani Murugan Temple",
  "Kamakshi Amman Kovil, Kanchipuram",
  "Nataraja Temple, Chidambaram",
  "Rameswaram Ramanathaswamy",
  "Ayyanar Kovil, Ayyanarpuram Village",
  "Kapaleeshwarar Temple, Mylapore",
];

export const posts: Post[] = Array.from({ length: 20 }, (_, i) => {
  const u = users[i % users.length];
  return {
    id: `p${i + 1}`,
    user: u,
    image: templeImages[i % templeImages.length],
    caption: captions[i % captions.length],
    location: locations[i % locations.length],
    likes: 120 + ((i * 137) % 4200),
    comments: 4 + ((i * 11) % 60),
    timeAgo: ["2m", "18m", "1h", "3h", "5h", "1d", "2d", "3d"][i % 8],
  };
});

export type Story = { id: string; user: User; seen?: boolean };
export const stories: Story[] = users.map((u, i) => ({ id: `s${i}`, user: u, seen: i > 4 }));

export type Reel = {
  id: string;
  user: User;
  image: string;
  caption: string;
  audio: string;
  likes: number;
  comments: number;
};
export const reels: Reel[] = [
  { id: "r1", user: users[0], image: templeImages[2], caption: "Karthigai Deepam · 108 lamps lit tonight", audio: "Original audio · Nadaswaram", likes: 12400, comments: 234 },
  { id: "r2", user: users[2], image: templeImages[0], caption: "Karuppu Swamy padi puja — pre-dawn", audio: "Bhaktan · Villuppatu", likes: 8900, comments: 156 },
  { id: "r3", user: users[3], image: templeImages[4], caption: "Annadhanam for 1,000 today. Every plate a prayer.", audio: "Original · Temple bells", likes: 21300, comments: 402 },
  { id: "r4", user: users[5], image: templeImages[1], caption: "Deepam corridor — Karthigai eve", audio: "Meera · Bhajan", likes: 6700, comments: 88 },
  { id: "r5", user: users[1], image: templeImages[3], caption: "Meenakshi Amman gopuram at golden hour", audio: "Original · Sunrise chants", likes: 15800, comments: 291 },
];

export type Notif = {
  id: string;
  kind: "like" | "comment" | "follow" | "invite" | "reminder";
  user?: User;
  text: string;
  timeAgo: string;
  image?: string;
};

export const notifications: Notif[] = [
  { id: "n1", kind: "like", user: users[0], text: "liked your post", timeAgo: "2m", image: templeImages[0] },
  { id: "n2", kind: "follow", user: users[3], text: "started following you", timeAgo: "18m" },
  { id: "n3", kind: "comment", user: users[2], text: "commented: “Anantha vaazhthukkal!”", timeAgo: "1h", image: templeImages[2] },
  { id: "n4", kind: "invite", user: users[5], text: "invited you to Girivalam · Karthigai full moon", timeAgo: "3h" },
  { id: "n5", kind: "reminder", text: "Pradosham begins at 5:42 PM today at Thiruvannamalai.", timeAgo: "5h" },
  { id: "n6", kind: "like", user: users[6], text: "and 42 others liked your reel", timeAgo: "1d", image: templeImages[3] },
  { id: "n7", kind: "comment", user: users[7], text: "commented: “Om Namah Shivaya 🙏”", timeAgo: "2d", image: templeImages[5] },
  { id: "n8", kind: "follow", user: users[4], text: "started following you", timeAgo: "3d" },
];

export type Chat = {
  id: string;
  user: User;
  last: string;
  timeAgo: string;
  unread?: number;
  online?: boolean;
};
export const chats: Chat[] = [
  { id: "c1", user: users[0], last: "Palabhishekam begins at 6 AM. Reach by 5:30.", timeAgo: "2m", unread: 2, online: true },
  { id: "c2", user: users[2], last: "Karuppu Swamy padi puja photos vandhurchu 🙏", timeAgo: "22m", unread: 1 },
  { id: "c3", user: users[3], last: "Annadhanam list share pannunga amma", timeAgo: "1h" },
  { id: "c4", user: users[5], last: "Girivalam plan for next pournami?", timeAgo: "5h", online: true },
  { id: "c5", user: users[1], last: "You: Ok, meet at east gopuram.", timeAgo: "1d" },
  { id: "c6", user: users[7], last: "Kamakshi utsavam invite forwarded.", timeAgo: "2d" },
];

export type Message = { id: string; from: "me" | "them"; text: string; time: string };
export const sampleThread: Message[] = [
  { id: "m1", from: "them", text: "Vanakkam! Are you coming for tomorrow’s abhishekam?", time: "8:12 AM" },
  { id: "m2", from: "me", text: "Yes swami, I’ll be there by 5:30.", time: "8:14 AM" },
  { id: "m3", from: "them", text: "Please bring the vibhuti packets from the mutt.", time: "8:15 AM" },
  { id: "m4", from: "me", text: "Sure. How many should I bring?", time: "8:16 AM" },
  { id: "m5", from: "them", text: "About 40 packets. Palabhishekam begins at 6 AM sharp.", time: "8:20 AM" },
];

export const searchCategories = [
  "Temples", "Gods", "Festivals", "Devotional Music",
  "Pilgrimages", "Priests", "Communities", "Trending",
];

export const trendingTags = [
  "#Karthigai", "#Deepam", "#Girivalam", "#Meenakshi",
  "#Annadhanam", "#Palani", "#Chidambaram", "#KaruppuSwamy",
  "#Pradosham", "#Srirangam", "#Nataraja", "#Vaikunta",
];

export const recentSearches = [
  "Karuppu Swamy sannidhi",
  "Karthigai deepam 2026",
  "Palani abhishekam timings",
  "Girivalam route map",
];

export const subscriptionPlans = [
  {
    id: "darshan",
    name: "Temple Darshan",
    price: "₹99",
    duration: "1 Hour",
    tagline: "A quiet hour with the deity.",
    perks: ["Skip-the-line darshan pass", "Prasadam token", "Digital arati remembrance"],
    featured: false,
  },
  {
    id: "premium",
    name: "Temple Premium",
    price: "₹999",
    duration: "3 Hours",
    tagline: "Extended sannidhi access & seva.",
    perks: ["Private archanai in your name", "Sanctum-side seating", "Recorded arati sent to you", "Priest introduction"],
    featured: true,
  },
  {
    id: "vip",
    name: "Temple VIP",
    price: "₹2,499",
    duration: "8 Hours",
    tagline: "A full day of temple immersion.",
    perks: ["Personal sevaka for the day", "Full abhishekam & alankaram", "Annadhanam sponsorship (100)", "Guided temple history walk", "Private prasadam hamper"],
    featured: false,
  },
];
