/* ------------------------------------------------------------------
   Shared "activity" data — the one engine behind events + clubs.

   type: "event"  → posted through a hive (RSVP, hive-scoped)
   type: "club"   → open forum: any group or public org can post
                    (library reading groups, card nights, meetups)

   Used by the public /browse page and the student dashboard tabs.
   Demo mock data — no backend.
------------------------------------------------------------------ */

export type Activity = {
  id: string;
  type: "event" | "club";
  title: string;
  host: string; // hive name for events, group/org name for clubs
  when: string;
  location: string;
  blurb: string;
  spots: number;
  filled: number;
  emoji: string;
  open?: boolean; // true = anyone (incl. non-hive students) can join
};

export const ACTIVITIES: Activity[] = [
  // ── Events (hive-posted) ──────────────────────────────────────
  {
    id: "fall-formal",
    type: "event",
    title: "Fall Formal",
    host: "Peoria Hive",
    when: "Sat, Nov 15 · 7:00 PM",
    location: "Lakeview Hall, Peoria",
    blurb: "Tickets cover the venue, DJ, and dessert bar. RSVP closes Nov 8.",
    spots: 120,
    filled: 86,
    emoji: "🎟️",
  },
  {
    id: "science-fair",
    type: "event",
    title: "Regional Science Fair",
    host: "Springfield Hive",
    when: "Fri, Nov 21 · 9:00 AM",
    location: "First Baptist Fellowship Hall",
    blurb: "Project setup at 8 AM. Judges from three local co-ops. Ribbons for all divisions.",
    spots: 60,
    filled: 41,
    emoji: "🔬",
  },
  {
    id: "park-day",
    type: "event",
    title: "All-Hives Park Day",
    host: "Bloomington Hive",
    when: "Mon, Nov 10 · 1:00 PM",
    location: "Miller Park Pavilion",
    blurb: "Open to every hive. Bring a lunch — games and field sports provided.",
    spots: 200,
    filled: 112,
    emoji: "🌳",
    open: true,
  },

  // ── Clubs (open forum — anyone can post / join) ───────────────
  {
    id: "library-reading",
    type: "club",
    title: "Teen Reading Circle",
    host: "Peoria Public Library",
    when: "Every Thursday · 4:00 PM",
    location: "Downtown Library, Room B",
    blurb: "Open to all local students. This month: short stories. Drop in any week — no sign-up needed.",
    spots: 25,
    filled: 14,
    emoji: "📖",
    open: true,
  },
  {
    id: "card-night",
    type: "club",
    title: "Friday Card Night",
    host: "Rec Center Group",
    when: "Fridays · 6:30 PM",
    location: "Northside Rec Center",
    blurb: "Casual board & card games for ages 12+. Snacks provided. Anyone welcome.",
    spots: 30,
    filled: 19,
    emoji: "🃏",
    open: true,
  },
  {
    id: "robotics",
    type: "club",
    title: "Robotics Tinkerers",
    host: "Maker Collective",
    when: "2nd Saturday · 10:00 AM",
    location: "Champaign Makerspace",
    blurb: "Student-run build club. Bring a project or start one. Public and hive students both welcome.",
    spots: 20,
    filled: 11,
    emoji: "🤖",
    open: true,
  },
];

export const EVENTS = ACTIVITIES.filter((a) => a.type === "event");
export const CLUBS = ACTIVITIES.filter((a) => a.type === "club");
