export default function Button({ children, loading, variant = 'primary', ...props }) {
  const styles = "w-full py-4 px-8 rounded-xs border-2 border-black font-black uppercase tracking-widest text-[12px] transition-all flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none";
  const colors = "bg-[#F5F216] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffff00]";

  return (
    <button disabled={loading} className={`${styles} ${colors}`} {...props}>
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Authorizing...
        </span>
      ) : children}
    </button>
  );
}