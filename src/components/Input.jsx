export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">{label}</label>
      <input
        {...props}
        className={`w-full border-2 rounded-[16px] px-5 py-3 font-bold text-sm outline-none transition-all ${
          error ? 'border-[#EF4444]' : 'border-black focus:bg-[#F5F216]/5'
        }`}
      />
      {error && <span className="text-[9px] font-bold text-[#EF4444] uppercase px-1">{error}</span>}
    </div>
  );
}