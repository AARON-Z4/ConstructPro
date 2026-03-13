import { useNavigate } from "react-router-dom";
import { statusConfig } from "../data/projects";

/**
 * Displays a single project as a clickable card.
 * Props:
 *   - project {object} — project data object
 */
export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const config = statusConfig[project.status] || statusConfig.Active;

  const handleClick = () => {
    navigate(`/dpr/${project.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  };

  // Format date nicely
  const formattedDate = new Date(project.startDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      role="button"
      tabIndex={0}
      id={`project-card-${project.id}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Open DPR for ${project.name}`}
      className="card card-hover p-6 animate-slide-up focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
    >

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-800 leading-snug truncate pr-2">
            {project.name}
          </h2>
        </div>
        <span className={`badge ${config.badgeClass} shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
          {project.status}
        </span>
      </div>

      {/* Meta grid */}
      <dl className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <dt className="text-xs text-slate-400 font-medium mb-0.5">Location</dt>
          <dd className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{project.location}</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400 font-medium mb-0.5">Start Date</dt>
          <dd className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400 font-medium mb-0.5">Site Manager</dt>
          <dd className="text-sm font-semibold text-slate-700 truncate">{project.manager}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400 font-medium mb-0.5">Budget</dt>
          <dd className="text-sm font-semibold text-slate-700">{project.budget}</dd>
        </div>
      </dl>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500 font-medium">Progress</span>
          <span className="text-xs font-bold text-slate-700">{project.progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              project.status === "Completed"
                ? "bg-blue-500"
                : project.status === "Delayed"
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${project.progress}%` }}
            role="progressbar"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* CTA hint */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Click to file DPR</span>
        <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </article>
  );
}
