import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('freelancer');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '', otp: '' });

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Strict Mandatory Field Check
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirm) {
      setAlert({ type: 'error', message: 'Please fill all mandatory fields.' });
      return;
    }
    
    if (form.password !== form.confirm) {
      setAlert({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    
    setAlert(null);
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      if (role === 'client') {
        // Direct Success Redirection for Client[cite: 1]
        navigate('/client-home'); 
      } else {
        // Trigger OTP Popup for Freelancer[cite: 1]
        setShowOtp(true); 
      }
    }, 1000);
  };

  return (
    <AuthLayout 
      heading="Join Hadei" description="A managed talent network built for all creative professionals. Whether you are a designer, developer, or visual storyteller, Hadei provides a secure workspace built on trust and reliability."
      footerText="Already a member?" 
      footerLinkLabel="Sign in" 
      footerLinkTo="/login"
    >
      {/* OTP Verification Popup[cite: 1] */}
      {showOtp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white border-2 border-black p-8 rounded-[24px] shadow-[10px_10px_0px_0px_rgba(245,242,22,1)] w-full max-w-sm">
            <h3 className="text-2xl font-black uppercase mb-4 italic text-black">Verify identity</h3>
            <Input label="Verification code" placeholder="000000" value={form.otp} onChange={(e) => setForm({...form, otp: e.target.value})} />
            <Button onClick={() => navigate('/freelancer-home')}>Verify</Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-3">
        <Alert type={alert?.type} message={alert?.message} />
        
        {/* Role Toggle Tabs[cite: 1] */}
        <div className="flex gap-2 mb-2">
          {['freelancer', 'client'].map(r => (
            <button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 py-2 rounded-md border-2 font-black uppercase text-[10px] tracking-widest transition-all ${role === r ? 'bg-[#F5F216] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'border-black/10 text-black/40'}`}>
              {r}
            </button>
          ))}
        </div>

        <Input label="Full Name" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} />
        
        <div className="grid grid-cols-2 gap-3">
          <Input label="Email" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          <Input label="Phone" type="tel" placeholder="+91 PH_NO" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
          <Input label="Confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({...form, confirm: e.target.value})} />
        </div>

        <div className="pt-2">
          <Button type="submit" loading={loading}>Sign up as {role}</Button>
        </div>
      </form>
    </AuthLayout>
  );
}