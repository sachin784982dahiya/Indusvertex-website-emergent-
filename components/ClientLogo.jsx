'use client';

export default function ClientLogo({ client, size = 'md', variant = 'card' }) {
  const initialsSize =
    size === 'sm' ? 'w-11 h-11 text-sm' :
    size === 'lg' ? 'w-20 h-20 text-2xl' :
    'w-14 h-14 text-base';

  const monogram = (
    <div
      className={`${initialsSize} rounded-2xl flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0 relative overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${client.color} 0%, ${client.color}dd 60%, ${client.color}88 100%)` }}
    >
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0%, transparent 55%)' }} />
      <span className="relative z-10 tracking-tight">{client.initials}</span>
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3">
        {monogram}
        <div className="text-left">
          <div className="font-bold text-foreground/90 leading-tight">{client.short || client.name}</div>
        </div>
      </div>
    );
  }

  return monogram;
}
