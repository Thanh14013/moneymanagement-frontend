const Input = ({label, value, onChange, placeholder, type, isSelect, options}) => {
  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">
        {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blur-500"
            value={value}
            onChange={(e) => onChange(e)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blur-500"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
          />
        )}
      </div>
    </div>
  )
}

export default Input;
