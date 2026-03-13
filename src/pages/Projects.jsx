import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const ALL_STATUSES = ["All", "Active", "Delayed", "Completed"];

/**
 * Project List Page — Screen 2
 * Shows all projects with search + status filter.
 */
export default function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtered + searched projects
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Stats
  const stats = useMemo(() => ({
    total: projects.length,
    active: projects.filter((p) => p.status === "Active").length,
    delayed: projects.filter((p) => p.status === "Delayed").length,
    completed: projects.filter((p) => p.status === "Completed").length,
  }), []);

  return (
    <div className="page-container min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-extrabold text-slate-800">Construction Projects</h1>
          <p className="text-slate-500 text-sm mt-1">
            Select a project to file a Daily Progress Report
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { label: "Total", value: stats.total, color: "text-slate-700", bg: "bg-slate-100" },
            { label: "Active", value: stats.active, color: "text-emerald-700", bg: "bg-emerald-50" },
            { label: "Delayed", value: stats.delayed, color: "text-amber-700", bg: "bg-amber-50" },
            { label: "Completed", value: stats.completed, color: "text-blue-700", bg: "bg-blue-50" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`card p-4 flex items-center gap-3 ${bg}`}>
              <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
              <span className="text-sm font-medium text-slate-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              id="project-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project name or location…"
              className="form-input pl-10"
              aria-label="Search projects"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by status">
            {ALL_STATUSES.map((status) => (
              <button
                key={status}
                id={`filter-${status.toLowerCase()}`}
                onClick={() => setStatusFilter(status)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
                  ${statusFilter === status
                    ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600"
                  }
                `}
                aria-pressed={statusFilter === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-400 font-medium mb-4">
          Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? "s" : ""}
          {search && ` for "${search}"`}
          {statusFilter !== "All" && ` · ${statusFilter} only`}
        </p>

        {/* Project grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-slate-600 font-semibold text-base">No projects found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSearch(""); setStatusFilter("All"); }}
              className="mt-4 text-primary-600 text-sm font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
