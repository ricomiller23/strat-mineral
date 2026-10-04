import React, { useState } from 'react';
import { getAllMinerals } from '../lib/data';
import { Mineral } from '../types';
import { Search, ExternalLink, AlertTriangle, ShieldCheck, Flame, Info } from 'lucide-react';

export const MineralMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [activeModalMineral, setActiveModalMineral] = useState<Mineral | null>(null);

  const minerals = getAllMinerals();

  const filteredMinerals = minerals.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.primary_defense_uses.some(u => u.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.top_refining_nation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = selectedTier === 'all' || m.criticality_tier.toLowerCase().includes(selectedTier.toLowerCase());
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span>CRITICAL MINERAL REFINING MATRIX</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Refining concentration monopolies and National Defense Stockpile depletion runway.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search mineral, defense use..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs font-mono">
            {['all', 'tier 1', 'tier 2', 'energy'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded capitalize transition ${
                  selectedTier === tier
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Minerals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMinerals.map((mineral) => {
          const isHighDeficit = mineral.stockpile_months_available < 4.0;
          return (
            <div
              key={mineral.id}
              onClick={() => setActiveModalMineral(mineral)}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/50 rounded-xl p-4 transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-12 h-12 rounded-lg bg-[#0F172A] border border-slate-700/80 flex flex-col items-center justify-center font-mono">
                      <span className="text-[10px] text-slate-500 font-mono">{mineral.atomic_number}</span>
                      <span className="text-base font-bold text-amber-400 leading-none">{mineral.symbol}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition font-mono">
                        {mineral.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">
                        {mineral.criticality_tier}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    mineral.vulnerability_score >= 90
                      ? 'bg-red-950/60 text-red-400 border-red-800/60'
                      : 'bg-amber-950/60 text-amber-400 border-amber-800/60'
                  }`}>
                    SCORE {mineral.vulnerability_score}
                  </span>
                </div>

                {/* Refining Concentration & Import Reliance */}
                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Refining Concentration ({mineral.top_refining_nation})</span>
                      <span className="text-amber-400 font-bold">{mineral.top_refining_share_pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                        style={{ width: `${mineral.top_refining_share_pct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">US Import Reliance</span>
                      <span className="text-slate-200 font-bold">{mineral.us_import_reliance_pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${mineral.us_import_reliance_pct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Primary Defense Subsystems */}
                <div className="mt-3 pt-3 border-t border-slate-800/70">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Core Application</span>
                  <p className="text-xs text-slate-300 font-mono truncate mt-0.5">
                    {mineral.primary_defense_uses[0]}
                  </p>
                </div>
              </div>

              {/* Stockpile Status Footer */}
              <div className="mt-4 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  {isHighDeficit ? (
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                  ) : (
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  )}
                  Stockpile:
                </span>
                <span className={`font-bold ${isHighDeficit ? 'text-red-400' : 'text-emerald-400'}`}>
                  {mineral.stockpile_months_available} mos ({mineral.us_defense_stockpile_status})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail Drawer */}
      {activeModalMineral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1124] border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-amber-500/50 flex flex-col items-center justify-center font-mono">
                  <span className="text-xs text-slate-500">{activeModalMineral.atomic_number}</span>
                  <span className="text-xl font-bold text-amber-400">{activeModalMineral.symbol}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">{activeModalMineral.name}</h3>
                  <span className="text-xs text-amber-500 font-mono font-medium">{activeModalMineral.criticality_tier}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalMineral(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1 rounded bg-slate-800/60"
              >
                ESC
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Top Refining Monopolist</span>
                <strong className="text-amber-400 text-sm">{activeModalMineral.top_refining_nation} ({activeModalMineral.top_refining_share_pct}%)</strong>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">US Net Import Reliance</span>
                <strong className="text-cyan-400 text-sm">{activeModalMineral.us_import_reliance_pct}%</strong>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Defense Stockpile Buffer</span>
                <strong className="text-red-400 text-sm">{activeModalMineral.stockpile_months_available} Months Runway</strong>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Global Annual Output</span>
                <strong className="text-slate-200 text-sm">{activeModalMineral.global_annual_production_mt.toLocaleString()} MT/yr</strong>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-1">
                Active Export Restrictions & Sanctions
              </span>
              <div className="bg-red-950/30 border border-red-900/60 p-3 rounded-lg text-xs font-mono text-red-200">
                {activeModalMineral.active_export_controls}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-1">
                Critical Defense Applications
              </span>
              <ul className="space-y-1.5 text-xs font-mono">
                {activeModalMineral.primary_defense_uses.map((use, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Primary Substitute: {activeModalMineral.primary_substitute}</span>
              </span>
              <a
                href={activeModalMineral.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
              >
                <span>USGS / DLA Receipt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
