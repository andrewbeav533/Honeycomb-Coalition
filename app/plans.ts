import { type EventPlan } from "@/components/EventPlanner";

/* Shared event-plan mock data — used by the admin planner and the
   volunteer role-claim view. Demo data, no backend. */
export const PLANS: EventPlan[] = [
  {
    id: "fall-formal",
    title: "Fall Formal",
    status: "Planning",
    date: "Sat, Nov 15",
    time: "7:00 – 10:00 PM",
    location: "Lakeview Hall",
    address: "1200 Lake Ave, Peoria, IL",
    capacity: 120,
    rsvps: 86,
    roles: [
      { role: "Chaperones", need: 6, filled: ["Dana Holt", "Marcus Reyes"] },
      { role: "Photographers", need: 2, filled: ["Priya Shah"] },
      { role: "Setup & teardown crew", need: 4, filled: ["Tom Avery"] },
      { role: "Check-in / ticket table", need: 2, filled: [] },
    ],
    materials: [
      { item: "Sound system + DJ booth", qty: "1", who: "Rec Center (rental)", where: "Main stage", done: true },
      { item: "Dessert bar", qty: "1", who: "Parent committee", where: "North wall", done: false },
      { item: "Decorations", qty: "10 boxes", who: "Setup crew", where: "Storage closet A", done: false },
      { item: "Name tags & check-in list", qty: "120", who: "Front desk", where: "Entrance table", done: true },
    ],
    schedule: [
      { time: "5:30 PM", item: "Setup & decorations" },
      { time: "6:45 PM", item: "Volunteer briefing" },
      { time: "7:00 PM", item: "Doors open / check-in" },
      { time: "7:30 PM", item: "Dinner served" },
      { time: "8:15 PM", item: "Dancing" },
      { time: "9:45 PM", item: "Last dance" },
      { time: "10:00 PM", item: "Teardown & cleanup" },
    ],
  },
  {
    id: "science-fair",
    title: "Science Fair",
    status: "Open for RSVPs",
    date: "Thu, Dec 4",
    time: "9:00 AM – 1:00 PM",
    location: "Peoria Co-op Hall",
    address: "88 Sterling Ct, Peoria, IL",
    capacity: 60,
    rsvps: 31,
    roles: [
      { role: "Judges", need: 4, filled: ["Lena Cole", "Nina Patel"] },
      { role: "Setup crew", need: 3, filled: ["Tom Avery"] },
      { role: "Floaters / runners", need: 2, filled: [] },
    ],
    materials: [
      { item: "Display tables", qty: "20", who: "Co-op storage", where: "Gym", done: true },
      { item: "Extension cords / power strips", qty: "12", who: "Mr. Albrecht", where: "Along back wall", done: false },
      { item: "Judging rubrics", qty: "60", who: "Front office", where: "Judges' table", done: false },
      { item: "Ribbons & certificates", qty: "30", who: "Parent committee", where: "Awards table", done: false },
    ],
    schedule: [
      { time: "7:30 AM", item: "Table & power setup" },
      { time: "8:00 AM", item: "Student project setup" },
      { time: "9:00 AM", item: "Doors open" },
      { time: "9:30 AM", item: "Judging begins" },
      { time: "12:00 PM", item: "Awards ceremony" },
      { time: "1:00 PM", item: "Teardown" },
    ],
  },
];
