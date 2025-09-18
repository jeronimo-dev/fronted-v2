import React from 'react';

interface GaugeProps {
  value: number; // 0-100
}

const getStatus = (val: number) => {
    if (val <= 40) return { text: 'Fluindo', color: '#22C55E' }; // green-500
    if (val <= 70) return { text: 'Regular', color: '#F59E0B' }; // amber-500
    return { text: 'Crítico', color: '#EF4444' }; // red-500
};

const GaugeDisplay = ({ value }: GaugeProps) => {
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="relative w-48 h-24 mx-auto">
      <svg width="192" height="96" viewBox="0 0 200 100" className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible">
        {/* Background Arc with Gradient */}
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
        </defs>
        <path
          d="M 20 90 A 80 80 0 0 1 180 90"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Needle */}
        <g style={{ transform: `translate(100px, 90px) rotate(${rotation}deg)`, transition: 'transform 0.8s ease-out' }}>
          <path d="M 0 -70 L 8 0 L -8 0 Z" fill="var(--c-text-main)" />
          <circle cx="0" cy="0" r="10" fill="var(--c-text-main)" />
          <circle cx="0" cy="0" r="6" fill="var(--c-bg-body)" />
        </g>
      </svg>
    </div>
  );
};


export const Taskmometer = ({ value }: GaugeProps) => {
  const status = getStatus(value);
  return (
    <div className="bg-[var(--c-bg-card)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]">
      <h4 className="text-xl font-semibold text-[var(--c-text-main)] mb-4 text-center tracking-wider font-neue-machina">TASKMOMETER</h4>
      <GaugeDisplay value={value} />
      <div className="text-center mt-2">
        <span className={`text-lg font-bold`} style={{ color: status.color }}>{status.text}</span>
      </div>
      <p className="text-sm text-[var(--c-text-secondary)] text-center mt-1 mb-4">Seu nível de produtividade atual.</p>
      <button className="w-full bg-[var(--c-bg-sidebar)] hover:bg-[var(--c-accent-action)] hover:text-[var(--c-bg-body)] text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
        Avaliar
      </button>
    </div>
  );
};