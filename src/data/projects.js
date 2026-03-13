/**
 * Mock project data for the Construction Field Management App.
 * In a real application, this would be fetched from an API.
 */
export const projects = [
  {
    id: 1,
    name: "Mumbai Metro Line 4",
    status: "Active",
    startDate: "2025-01-15",
    location: "Mumbai, Maharashtra",
    manager: "Rajesh Kumar",
    budget: "₹2,400 Cr",
    progress: 42,
  },
  {
    id: 2,
    name: "Pune Smart Bridge",
    status: "Delayed",
    startDate: "2024-11-10",
    location: "Pune, Maharashtra",
    manager: "Priya Sharma",
    budget: "₹380 Cr",
    progress: 28,
  },
  {
    id: 3,
    name: "Delhi Highway Expansion",
    status: "Completed",
    startDate: "2024-05-01",
    location: "Delhi, NCR",
    manager: "Amit Singh",
    budget: "₹1,100 Cr",
    progress: 100,
  },
  {
    id: 4,
    name: "Bengaluru Outer Ring Road",
    status: "Active",
    startDate: "2025-03-01",
    location: "Bengaluru, Karnataka",
    manager: "Deepa Nair",
    budget: "₹900 Cr",
    progress: 15,
  },
  {
    id: 5,
    name: "Hyderabad Flyover Phase 2",
    status: "Delayed",
    startDate: "2024-08-20",
    location: "Hyderabad, Telangana",
    manager: "Suresh Reddy",
    budget: "₹550 Cr",
    progress: 60,
  },
];

export const statusConfig = {
  Active: {
    label: "Active",
    badgeClass: "badge-active",
    dotColor: "bg-emerald-500",
  },
  Delayed: {
    label: "Delayed",
    badgeClass: "badge-delayed",
    dotColor: "bg-amber-500",
  },
  Completed: {
    label: "Completed",
    badgeClass: "badge-completed",
    dotColor: "bg-blue-500",
  },
};
