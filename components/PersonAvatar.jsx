'use client';
import { useState } from 'react';
import { User } from 'lucide-react';

function nameHashColor(name) {
  const palette = ['#1e3a8a','#0f766e','#7c2d12','#b45309','#6d28d9','#9d174d','#155e75','#374151'];
  let h = 0;
  for (let i = 0; i < (name || '').length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return palette[Math.abs(h) % palette.length];
}

function initials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

export default function PersonAvatar({ name, imageUrl, size = 'md', shape = 'square' }) {
  const [errored, setErrored] = useState(false);

  const dims =
    size === 'sm' ? 'w-14 h-14 text-base' :
    size === 'lg' ? 'w-32 h-32 text-3xl' :
    size === 'xl' ? 'w-40 h-40 text-4xl' :
    'w-20 h-20 text-xl';

  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';
  const color = nameHashColor(name);

  if (imageUrl && !errored) {
    return (
      <div className={`${dims} ${radius} overflow-hidden shadow-lg flex-shrink-0 bg-muted`}>
        <img
          src={imageUrl}
          alt={name}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Premium placeholder: gradient background + subtle person silhouette + bold initials
  return (
    <div
      className={`${dims} ${radius} flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0 relative overflow-hidden`}
      style={{ background: `linear-gradient(140deg, ${color} 0%, ${color}cc 55%, ${color}77 100%)` }}
    >
      {/* Soft highlight */}
      <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.65) 0%, transparent 55%)' }} />
      {/* Subtle person silhouette */}
      <User className="absolute opacity-15" style={{ width: '60%', height: '60%' }} strokeWidth={1.5} />
      {/* Initials */}
      <span className="relative z-10 tracking-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>{initials(name)}</span>
      {/* Bottom subtle vignette for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-30" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
    </div>
  );
}
