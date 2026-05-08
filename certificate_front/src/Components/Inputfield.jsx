export default function InputField({
    label, name, type = 'text', placeholder = '',
    value, onChange, error, hint
  }) {
    return (
      <div data-error={!!error}>
        <label className="block text-sm font-medium text-[#1a1a2e]/70 mb-1.5">
          {label}
          <span className="text-red-400 ml-0.5">*</span>
        </label>
        {hint && (
          <p className="text-xs text-[#1a1a2e]/40 mb-1.5 font-mono">{hint}</p>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1a1a2e] bg-white/80 placeholder:text-[#1a1a2e]/25 transition-all duration-200 outline-none
            ${error
              ? 'border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50/40'
              : 'border-[#1a1a2e]/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
            }`}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }