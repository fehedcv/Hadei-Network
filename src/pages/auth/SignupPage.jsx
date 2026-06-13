import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/auth/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/auth/Alert';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('client'); 
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });

  const handleSignup = async (e) => {
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
    
    // Live Supabase Sign Up Pipeline
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password: form.password,
      options: {
        data: {
          full_name: form.fullName.trim(),
          phone: form.phone.trim(),
          role: role,            
          has_onboarded: false,  // Client lands on onboarding path first entry
        },
      },
    });

    setLoading(false);

    if (error) {
      setAlert({ type: 'error', message: error.message });
      return;
    }

    // Redirect directly into the single viewport onboarding steps
    if (role === 'client') {
      navigate('/client/onboarding'); 
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <AuthLayout 
      heading="Join Hadei" 
      description="A managed talent network built for all creative professionals. Whether you are a designer, developer, or visual storyteller, Hadei provides a secure workspace built on trust and reliability."
      footerText="Already a member?" 
      footerLinkLabel="Sign in" 
      footerLinkTo="/auth/login"
    >
      <form onSubmit={handleSignup} className="space-y-3">
        <Alert type={alert?.type} message={alert?.message} />
        
        {/* Role Segment Toggle */}
        <div className="flex gap-2 mb-2">
          {['client'].map(r => (
            <button 
              key={r} 
              type="button" 
              onClick={() => setRole(r)} 
              className="w-full py-2 rounded-md border-2 font-black uppercase text-[10px] tracking-widest bg-[#F5F216] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black"
            >
              {r}
            </button>
          ))}
        </div>

        <Input 
          label="Full Name" 
          placeholder="Full name" 
          value={form.fullName} 
          onChange={(e) => setForm({...form, fullName: e.target.value})} 
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Input 
            label="Email" 
            type="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})} 
          />
          <Input 
            label="Phone" 
            type="tel" 
            placeholder="+91 PH_NO" 
            value={form.phone} 
            onChange={(e) => setForm({...form, phone: e.target.value})} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={form.password} 
            onChange={(e) => setForm({...form, password: e.target.value})} 
          />
          <Input 
            label="Confirm" 
            type="password" 
            placeholder="••••••••" 
            value={form.confirm} 
            onChange={(e) => setForm({...form, confirm: e.target.value})} 
          />
        </div>

        <div className="pt-2">
          <Button type="submit" loading={loading}>Sign up as {role}</Button>
        </div>
      </form>
    </AuthLayout>
  );
}