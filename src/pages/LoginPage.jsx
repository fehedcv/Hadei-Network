import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mandatory field check
    if (!form.email || !form.password) {
      setAlert({ type: 'error', message: 'All fields are mandatory.' });
      return;
    }

    setAlert(null);
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email: form.email, 
      password: form.password 
    });

    setLoading(false);
    
    if (error) {
      setAlert({ type: 'error', message: error.message });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout 
      heading="Welcome back!" 
      footerText="Not a member?" 
      footerLinkLabel="Register now" 
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Appropriate Alert Positioning */}
        <Alert type={alert?.type} message={alert?.message} />

        <Input 
          label="Email address" 
          type="email" 
          value={form.email} 
          onChange={(e) => setForm({...form, email: e.target.value})} 
          placeholder="you@hadei.network" 
        />
        
        <Input 
          label="Secure password" 
          type="password" 
          value={form.password} 
          onChange={(e) => setForm({...form, password: e.target.value})} 
          placeholder="••••••••" 
        />
        
        <div className="flex justify-end pr-1">
           <button type="button" className="text-[10px] font-black uppercase text-black/30 hover:text-black tracking-widest">
             Forgot password?
           </button>
        </div>

        {/* Shadow Model Button */}
        <Button type="submit" loading={loading}>Sign in</Button>

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[10px] font-black text-black/20 uppercase tracking-widest text-center">or continue with</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <button 
          type="button"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="w-full border-2 border-black py-3 rounded-xs font-bold text-xs uppercase hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"
        >
          <span className="font-black">Google Account</span>
        </button>
      </form>
    </AuthLayout>
  );
}