import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import Toast from "../components/Toast";
import { projects } from "../data/projects";
import { validateDPRForm, isFormValid } from "../utils/validation";

const WEATHER_OPTIONS = ["Sunny", "Cloudy", "Rainy"];

const WEATHER_ICONS = {
  Sunny: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Cloudy: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  Rainy: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  ),
};

const INITIAL_FORM = {
  projectId: "",
  date: "",
  weather: "",
  description: "",
  workerCount: "",
  photos: [],
};

/**
 * DPR Form Page — Screen 3
 * Daily Progress Report submission form.
 */
export default function DPRForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Pre-select the project from URL param
  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    projectId: projectId || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const selectedProject = projects.find((p) => String(p.id) === String(formData.projectId));

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotosChange = useCallback((photos) => {
    setFormData((prev) => ({ ...prev, photos }));
    if (errors.photos) setErrors((prev) => ({ ...prev, photos: "" }));
  }, [errors.photos]);

  const handleWeatherSelect = (w) => {
    setFormData((prev) => ({ ...prev, weather: w }));
    if (errors.weather) setErrors((prev) => ({ ...prev, weather: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validateDPRForm(formData);
    if (!isFormValid(fieldErrors)) {
      setErrors(fieldErrors);
      // Scroll to first error
      const firstKey = Object.keys(fieldErrors)[0];
      document.getElementById(`dpr-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));

    setSubmitting(false);

    // Success!
    setToast({ message: "Daily Progress Report submitted successfully! ✓", type: "success" });

    // Reset form
    setFormData({ ...INITIAL_FORM, projectId: "" });
    setErrors({});

    // Navigate back after short delay
    setTimeout(() => navigate("/projects"), 2500);
  };

  // ── Field component helpers ───────────────────────────────────────────────
  const FieldLabel = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="form-label">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p id={`${name}-error`} className="form-error mt-1" role="alert">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="page-container min-h-screen">
      <Navbar />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">Daily Progress Report</h1>
              <p className="text-slate-500 text-sm mt-1">
                {selectedProject ? `Filing for: ${selectedProject.name}` : "Fill in all required fields below"}
              </p>
            </div>
            {/* Date chip */}
            <div className="shrink-0 hidden sm:flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-2 rounded-xl border border-primary-100">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="card p-6 sm:p-8 animate-slide-up">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── Section 1: Project Info ──────────────────────────────── */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-primary-100 text-primary-600 text-xs rounded-md flex items-center justify-center font-bold">1</span>
                Project Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Project dropdown */}
                <div id="dpr-projectId">
                  <FieldLabel htmlFor="dpr-project-select" required>Project</FieldLabel>
                  <select
                    id="dpr-project-select"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className={`form-input ${errors.projectId ? "error" : ""}`}
                    aria-describedby={errors.projectId ? "dpr-projectId-error" : undefined}
                    aria-invalid={!!errors.projectId}
                  >
                    <option value="">— Select a project —</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <FieldError name="projectId" />
                  {selectedProject && (
                    <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {selectedProject.location}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div id="dpr-date">
                  <FieldLabel htmlFor="dpr-date-input" required>Report Date</FieldLabel>
                  <input
                    id="dpr-date-input"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`form-input ${errors.date ? "error" : ""}`}
                    aria-describedby={errors.date ? "dpr-date-error" : undefined}
                    aria-invalid={!!errors.date}
                  />
                  <FieldError name="date" />
                </div>

              </div>
            </div>

            <hr className="border-slate-100 mb-8" />

            {/* ── Section 2: Site Conditions ─────────────────────────────── */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-primary-100 text-primary-600 text-xs rounded-md flex items-center justify-center font-bold">2</span>
                Site Conditions
              </h2>

              {/* Weather */}
              <div id="dpr-weather" className="mb-4">
                <FieldLabel htmlFor="weather-group" required>Weather Condition</FieldLabel>
                <div id="weather-group" className="flex flex-wrap gap-3" role="group" aria-label="Select weather">
                  {WEATHER_OPTIONS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      id={`weather-${w.toLowerCase()}`}
                      onClick={() => handleWeatherSelect(w)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold
                        transition-all duration-200
                        ${formData.weather === w
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600"
                        }
                      `}
                      aria-pressed={formData.weather === w}
                    >
                      {WEATHER_ICONS[w]}
                      {w}
                    </button>
                  ))}
                </div>
                <FieldError name="weather" />
              </div>

              {/* Worker count */}
              <div id="dpr-workerCount">
                <FieldLabel htmlFor="dpr-workers" required>Workers on Site</FieldLabel>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    id="dpr-workers"
                    name="workerCount"
                    type="number"
                    min={1}
                    value={formData.workerCount}
                    onChange={handleChange}
                    placeholder="e.g. 45"
                    className={`form-input pl-10 ${errors.workerCount ? "error" : ""}`}
                    aria-describedby={errors.workerCount ? "dpr-workerCount-error" : undefined}
                    aria-invalid={!!errors.workerCount}
                  />
                </div>
                <FieldError name="workerCount" />
              </div>
            </div>

            <hr className="border-slate-100 mb-8" />

            {/* ── Section 3: Work Details ────────────────────────────────── */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-primary-100 text-primary-600 text-xs rounded-md flex items-center justify-center font-bold">3</span>
                Work Details
              </h2>

              {/* Description */}
              <div id="dpr-description" className="mb-4">
                <FieldLabel htmlFor="dpr-desc" required>Work Description</FieldLabel>
                <textarea
                  id="dpr-desc"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the work completed today, milestones achieved, issues encountered… (min. 10 characters)"
                  className={`form-input resize-none ${errors.description ? "error" : ""}`}
                  aria-describedby={errors.description ? "dpr-description-error" : undefined}
                  aria-invalid={!!errors.description}
                />
                {/* Character count */}
                <div className="flex items-center justify-between mt-1">
                  <FieldError name="description" />
                  <span className={`text-xs ml-auto ${formData.description.length < 10 && formData.description.length > 0 ? "text-red-400" : "text-slate-400"}`}>
                    {formData.description.length} chars
                    {formData.description.length < 10 && formData.description.length > 0 && " (min 10)"}
                  </span>
                </div>
              </div>

              {/* Photos */}
              <div id="dpr-photos">
                <FieldLabel htmlFor="photo-upload-input">Site Photos</FieldLabel>
                <p className="text-xs text-slate-400 mb-2">Upload 1–3 site photos (PNG, JPG, WebP)</p>
                <ImageUploader
                  photos={formData.photos}
                  onChange={handlePhotosChange}
                  error={errors.photos}
                />
                <FieldError name="photos" />
              </div>
            </div>

            {/* ── Submit area ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                id="dpr-submit-btn"
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto sm:flex-1 order-1 sm:order-2"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Submit DPR
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Fields marked with <span className="text-red-500">*</span> are required
        </p>

      </main>
    </div>
  );
}
