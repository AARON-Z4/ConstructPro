import { useRef, useCallback } from "react";

const MAX_PHOTOS = 3;

/**
 * Image upload component with drag-and-drop and thumbnail previews.
 *
 * Props:
 *   - photos     {File[]}  Array of uploaded file objects
 *   - onChange   {func}    Called with updated file array
 *   - error      {string}  Validation error message
 */
export default function ImageUploader({ photos = [], onChange, error }) {
  const inputRef = useRef(null);

  const handleFiles = useCallback((incoming) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const filtered = Array.from(incoming).filter((f) => validTypes.includes(f.type));
    const merged = [...photos, ...filtered].slice(0, MAX_PHOTOS);
    onChange(merged);
  }, [photos, onChange]);

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    // Reset input so same file can be re-added after removal
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    onChange(updated);
  };

  const remaining = MAX_PHOTOS - photos.length;

  return (
    <div>
      {/* Drop zone */}
      {photos.length < MAX_PHOTOS && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label="Upload site photos"
          className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
            transition-all duration-200
            ${error
              ? "border-red-400 bg-red-50 hover:bg-red-50"
              : "border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-primary-300"
            }
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${error ? "bg-red-100" : "bg-primary-100"}`}>
              <svg className={`w-5 h-5 ${error ? "text-red-400" : "text-primary-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Drop photos here or <span className="text-primary-600">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                PNG, JPG, WebP — up to {remaining} more photo{remaining !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            id="photo-upload-input"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {photos.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100"
              >
                <img
                  src={url}
                  alt={`Upload preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(url)}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label={`Remove photo ${idx + 1}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Index badge */}
                <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold shadow">
                  {idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Counter */}
      <p className="text-xs text-slate-400 mt-2">
        {photos.length}/{MAX_PHOTOS} photo{photos.length !== 1 ? "s" : ""} uploaded
      </p>
    </div>
  );
}
