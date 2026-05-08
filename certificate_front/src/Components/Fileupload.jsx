import { useRef, useState } from 'react'

export default function FileUpload({ label, hint, preview, onChange, error, isSignature }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) onChange(file)
  }

  return (
    <div data-error={!!error}>
      <label className="block text-sm font-medium text-[#1a1a2e]/70 mb-1.5">
        {label}
      </label>
      {hint && (
        <p className="text-xs text-[#1a1a2e]/40 mb-1.5 font-mono">{hint}</p>
      )}

      {preview ? (
        <div className="relative inline-flex flex-col items-start">
          <div className={`border border-[#1a1a2e]/10 rounded-xl overflow-hidden bg-[#f8f8f6] ${isSignature ? 'p-4' : 'p-2'}`}>
            <img
              src={preview}
              alt={label}
              className={isSignature ? 'h-14 w-auto object-contain' : 'h-16 w-auto max-w-[160px] object-contain'}
            />
          </div>
          <button
            type="button"
            onClick={() => { onChange(null); inputRef.current.value = '' }}
            className="mt-2 text-xs text-red-400 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
          >
            <span>✕</span> Remove
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
            ${dragging ? 'border-amber-400 bg-amber-50' : error ? 'border-red-300 bg-red-50/30' : 'border-[#1a1a2e]/15 bg-white/50 hover:border-amber-400/60 hover:bg-amber-50/30'}
          `}
        >
          <div className="text-2xl mb-2">{isSignature ? '✍️' : '🖼️'}</div>
          <p className="text-sm text-[#1a1a2e]/60 font-medium">
            Drop image here or <span className="text-amber-600">click to browse</span>
          </p>
          <p className="text-xs text-[#1a1a2e]/35 mt-1">PNG, JPG, WebP accepted</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && onChange(e.target.files[0])}
          />
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}