import React from 'react';

/**
 * HADEI Alert Component
 * Purpose: Provides high-visibility feedback for mandatory validation
 * Theme: Bold Minimalism
 */
export default function Alert({ type = 'error', message }) {
  if (!message) return null;

  // Mapping to HADEI State Colors
  const styles = {
    error: 'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]', // Error Red
    success: 'bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A]', // Success Green
    warning: 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]', // Warning Orange
  };

  return (
    <div 
      className={`flex items-center gap-3 border-2 p-3 rounded-xs transition-all animate-in fade-in duration-300 ${styles[type]}`}
      role="alert"
    >
      {/* High-contrast status indicator */}
      <div className={`w-2 h-2 rounded-full shrink-0 ${type === 'error' ? 'bg-[#EF4444]' : 'bg-current'}`} />
      
      <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
        {message}
      </span>
    </div>
  );
}