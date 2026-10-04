import React, { useState } from 'react';
import { getAllChokepoints } from '../lib/data';
import { Chokepoint } from '../types';
import { Compass, ExternalLink, MapPin, AlertOctagon } from 'lucide-react';

export const ChokepointRadar: React.FC = () => {
  const chokepoints = getAllChokepoints();
  const [selectedChokepoint, setSelectedChokepoint] = useState<Chokepoint>(chokepoints[0]);

  // Mercator-like projection calculation for SVG map (width: 900, height: 450)
  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 900;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = 225 - (mercN * 225) / Math.PI;
    return { x: Math.max(20, Math.min(880, x)), y: Math.max(20, Math.min(430, y)) };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-500" />
          <span>GEOGRAPHIC REFINING CHOKEPOINTS & PROCESSING HUBS</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Single-point-of-failure processing nodes controlling over 50% of global mineral supply chains.
        </p>
      </div>

      {/* Interactive Global Visualizer */}
      <div className="bg-[#050C1B] border border-amber-950/60 rounded-2xl p-4 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-white font-bold">RADAR PROJECTION // 4 STRATEGIC BOTTLENECKS</span>
          </div>
          <span className="text-amber-400">COORDINATE TRACKING ACTIVE</span>
        </div>

        {/* SVG World Background Canvas */}
        <div className="relative w-full aspect-[2/1] bg-[#020612] rounded-xl my-3 overflow-hidden border border-slate-900">
          <svg className="w-full h-full" viewBox="0 0 900 450" preserveAspectRatio="none">
            <defs>
              <pattern id="radarGrid" width="45" height="45" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="900" height="450" fill="url(#radarGrid)" />

            {/* Latitude Equator and Meridian Lines */}
            <line x1="0" y1="225" x2="900" y2="225" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
            <line x1="450" y1="0" x2="450" y2="450" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />

            {/* Chokepoint Nodes */}
            {chokepoints.map((cp) => {
              const { x, y } = projectCoords(cp.lat, cp.lng);
              const isSelected = selectedChokepoint.id === cp.id;

              return (
                <g
                  key={cp.id}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedChokepoint(cp)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "18" : "12"}
                    fill={cp.risk_level === 'Severe' ? '#ef4444' : '#f59e0b'}
                    fillOpacity={isSelected ? "0.3" : "0.15"}
                    className="animate-pulse"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "8" : "5"}
                    fill={cp.risk_level === 'Severe' ? '#ef4444' : '#f59e0b'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2" : "1"}
                  />
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill={isSelected ? '#f59e0b' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {cp.name.split(' ')[0]} ({cp.global_refining_concentration_pct}%)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Chokepoint Details */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Selected Hub</span>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {selectedChokepoint.name}
            </h4>
            <span className="text-slate-400 block">{selectedChokepoint.location}</span>
            <span className="text-[11px] text-amber-400/90 block">Controller: {selectedChokepoint.controlled_by}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Controlled Elements</span>
            <div className="flex flex-wrap gap-1">
              {selectedChokepoint.minerals_controlled.map((min, idx) => (
                <span key={idx} className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                  {min}
                </span>
              ))}
            </div>
            <div className="pt-1 text-[11px] text-red-400 font-bold flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" />
              <span>{selectedChokepoint.global_refining_concentration_pct}% Global Concentration</span>
            </div>
          </div>

          <div className="space-y-1 md:border-l md:border-slate-800 md:pl-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Vulnerability Threat</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {selectedChokepoint.vulnerability_description}
            </p>
            <a
              href={selectedChokepoint.source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-[11px] pt-1 underline"
            >
              <span>View Source Telemetry</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Chokepoint Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        {chokepoints.map((cp) => (
          <div
            key={cp.id}
            onClick={() => setSelectedChokepoint(cp)}
            className={`p-3.5 rounded-xl border cursor-pointer transition ${
              selectedChokepoint.id === cp.id
                ? 'bg-amber-500/10 border-amber-500/60 shadow-lg'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                cp.risk_level === 'Severe' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {cp.risk_level.toUpperCase()}
              </span>
              <span className="text-xs text-amber-400 font-bold">{cp.global_refining_concentration_pct}%</span>
            </div>
            <h4 className="font-bold text-white text-xs truncate">{cp.name}</h4>
            <span className="text-[10px] text-slate-400 block truncate mt-0.5">{cp.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
