export default function RoleSelector({ value, onChange, error }) {
  const roles = [
    { id: 'freelancer', label: 'Freelancer', desc: 'Offering creative services.' },
    { id: 'client', label: 'Client', desc: 'Hiring top creative talent.' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          onClick={() => onChange(role.id)}
          className={`p-5 border-2 text-left rounded-[16px] transition-all ${
            value === role.id ? 'bg-[#F5F216] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white border-black/10 hover:border-black'
          }`}
        >
          <span className="block font-black text-xs uppercase tracking-widest">{role.label}</span>
          <span className="block text-[10px] text-black/50 mt-1 leading-tight font-medium">{role.desc}</span>
        </button>
      ))}
    </div>
  );
}