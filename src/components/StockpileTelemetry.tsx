import React from 'react';
import { getAllStockpileInitiatives, getComputedStats } from '../lib/data';
import { Layers, ExternalLink, DollarSign, CheckCircle2, Building2 } from 'lucide-react';

export const StockpileTelemetry: React.FC = () => {
  const initiatives = getAllStockpileInitiatives();
  const stats = getComputedStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>NATIONAL DEFENSE STOCKPILE & TITLE III DPA RE-SHORING</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Congressionally authorized Defense Production Act Title III grants and strategic domestic processing facilities.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl font-mono text-right">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Capital Deployed</span>
          <span className="text-sm font-bold text-emerald-400">
            ${(stats.totalGrantFundingUsd / 1000000).toFixed(1)}M USD Authorized
          </span>
        </div>
      </div>

      {/* Grid of Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
        {initiatives.map((init, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 hover:border-amber-500/50 transition shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest block">
                    {init.authority}
                  </span>
                  <h3 className="font-bold text-white text-base mt-1">
                    {init.project_name}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {init.location}
                  </span>
                </div>

                <div className="bg-[#050C1B] border border-emerald-950 p-2 rounded-xl text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">DOD Grant</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center justify-end">
                    <DollarSign className="w-3.5 h-3.5" />
                    {(init.grant_amount_usd / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase">Target Mineral</span>
                  <span className="text-amber-400 font-bold text-xs">{init.target_mineral}</span>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase">Projected Output Capacity</span>
                  <span className="text-slate-200 text-xs">{init.projected_capacity}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{init.status}</span>
              </span>

              <a
                href={init.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 underline text-[11px]"
              >
                <span>DoD Release</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Stockpile Depletion Context */}
      <div className="bg-[#060D1E] border border-amber-950/70 rounded-2xl p-5 font-mono text-xs space-y-2">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-500" />
          <span>NATIONAL DEFENSE STOCKPILE (NDS) REAUTHORIZATION GAP</span>
        </h4>
        <p className="text-slate-300 leading-relaxed">
          The National Defense Stockpile transaction fund currently operates with an appropriated procurement balance of approximately $1.2 Billion against an estimated $14.8 Billion material shortfall identified in modern high-intensity conflict scenario modeling. Title III Defense Production Act expansion programs are targeted at bridging 3 to 7 year lead-times required to construct domestic hydrometallurgical cracking and reduction plants.
        </p>
      </div>
    </div>
  );
};
