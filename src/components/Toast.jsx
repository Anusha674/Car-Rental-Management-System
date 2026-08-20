import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: '#ffffff',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        fontWeight: 600,
        fontSize: '0.9rem',
        animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {type === 'success' && <CheckCircle2 size={20} />}
      {type === 'error' && <AlertCircle size={20} />}
      {type === 'info' && <Info size={20} />}
      <span>{message}</span>
      <button onClick={onClose} style={{ color: '#ffffff', marginLeft: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
        <X size={16} />
      </button>
    </div>
  );
}
