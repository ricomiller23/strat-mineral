import React, { useState } from 'react';
import { getAllDefensePlatforms } from '../lib/data';
import { DefensePlatform } from '../types';
import { Crosshair, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';

export const DefensePlatformDossier: React.FC = () => {
  const platforms = getAllDefensePlatforms();
  const [selectedPlatform, setSelectedPlatform] = useState<DefensePlatform>(platforms[0]);
  const [multiplier, setMultiplier] = useState<number>(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-amber-500" />
            <span>MAJOR DEFENSE PLATFORM BILL-OF-MATERIALS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Critical mineral dependencies per airframe, hull, missile, and combat vehicle unit.
          </p>
        </div>

        {/* Multiplier toggle */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-mono">
          <span className="text-slate-400 px-2">Batch Scale:</span>
          {[1, 10, 50, selectedPlatform.annual_procurement_target].map((m) => (
            <button
              key={m}
              onClick={() => setMultiplier(m)}
              className={`px-2.5 py-1 rounded transition ${
                multiplier === m
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m === selectedPlatform.annual_procurement_target ? `Full Annual (${m})` : `${m}x`}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform.platform_id === platform.platform_id;
          return (
            <button
              key={platform.platform_id}
              onClick={() => {
                setSelectedPlatform(platform);
                setMultiplier(1);
              }}
              className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  {platform.lead_contractor}
                </span>
                <h4 className="font-bold text-white text-xs mt-1 leading-snug">
                  {platform.name}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400">
                <span>Annual Procurement:</span>
                <span className="text-amber-400 font-bold">{platform.annual_procurement_target} units/yr</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Platform Detailed Breakdown */}
      <div className="bg-[#070E20] border border-amber-950/60 rounded-2xl p-6 font-mono space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-amber-500 uppercase tracking-widest font-bold block">Platform Telemetry Dossier</span>
            <h3 className="text-xl font-bold text-white mt-1">{selectedPlatform.name}</h3>
            <span className="text-xs text-slate-400">Prime Systems Integrator: {selectedPlatform.lead_contractor}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-500 block uppercase">Simulated Batch</span>
              <strong className="text-amber-400 text-sm">{multiplier} {multiplier === 1 ? 'Unit' : 'Units'}</strong>
            </div>
            <a
              href={selectedPlatform.source_url}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 p-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <span>CRS / DoD Report</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mineral Requirements Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>CRITICAL MINERAL INVENTORY REQUIREMENT</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Mineral Spec</th>
                  <th className="py-2.5 px-3">Weight per Unit</th>
                  <th className="py-2.5 px-3">Batch Total ({multiplier}x)</th>
                  <th className="py-2.5 px-3">Mission-Critical Subsystem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {selectedPlatform.critical_mineral_demand.map((demand, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-amber-300">
                      {demand.mineral}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {demand.weight_lbs.toLocaleString()} lbs
                    </td>
                    <td className="py-3 px-3 text-white font-bold bg-amber-500/5">
                      {(demand.weight_lbs * multiplier).toLocaleString()} lbs
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {demand.critical_subsystem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supply Chain Bottleneck Callout */}
        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-red-300 uppercase tracking-wider">
              Documented Supply Chain Disruption / Bottleneck
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPlatform.supply_chain_bottleneck}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
