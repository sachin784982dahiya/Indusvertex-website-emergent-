'use client';
import { useState } from 'react';

export default function ClientLogo({ client, size = 'md', variant = 'card' }) {
  const [imgError, setImgError] = useState(false);

  const dimClass =
    size === 'sm' ? 'w-12 h-12 text-sm' :
    size === 'lg' ? 'w-24 h-24 text-2xl' :
    'w-16 h-16 text-base';

  const monogram = (
    <div
      className={`${dimClass} rounded-2xl flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0 relative overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${client.color} 0%, ${client.color}dd 60%, ${client.color}88 100%)` }}
    >
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0%, transparent 55%)' }} />
      <span className="relative z-10 tracking-tight">{client.initials}</span>
    </div>
  );

  const logoEl = client.logo && !imgError ? (
    <div className={`${dimClass} rounded-2xl flex items-center justify-center bg-white shadow-lg flex-shrink-0 overflow-hidden border border-gray-100`}>
      <img
        src={client.logo}
        alt={client.name}
        className="w-4/5 h-4/5 object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  ) : monogram;

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3">
        {logoEl}
        <div className="text-left">
          <div className="font-bold text-foreground/90 leading-tight">{client.short || client.name}</div>
        </div>
      </div>
    );
  }

  return logoEl;
}
