import React, { useEffect, useState } from 'react';
import { ShieldAlert, Compass, Crosshair, Layers, Zap, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'minerals', label: 'Minerals Matrix', icon: ShieldAlert },
    { id: 'chokepoints', label: 'Refining Chokepoints', icon: Compass },
    { id: 'defense', label: 'Defense Platforms', icon: Crosshair },
    { id: 'stockpile', label: 'NDS Stockpile Grants', icon: Layers },
    { id: 'simulator', label: 'Embargo Simulator', icon: Zap },
    { id: 'ledger', label: 'Receipts Ledger', icon: BookOpen }
  ];

  return (
    <header className="border-b border-amber-900/40 bg-[#060D1E]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/50 flex items-center justify-center text-amber-400 font-mono font-bold text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-wider text-slate-100 font-mono">
                  STRAT-MINERAL <span className="text-xs text-amber-500 font-normal px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">DEFENSE MONOPOLY RADAR</span>
                </h1>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                USGS & DLA Strategic Materials Feed // Export Restriction Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block">System Telemetry</span>
              <span className="text-xs text-amber-400 font-mono font-semibold">{currentTime}</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/60 text-[11px] font-mono text-emerald-400">
              STATUS: MONITORED
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <nav className="flex space-x-1 sm:space-x-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
