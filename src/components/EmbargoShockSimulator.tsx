import React, { useState } from 'react';
import { getAllMinerals } from '../lib/data';
import { Zap, ShieldAlert, Cpu } from 'lucide-react';

export const EmbargoShockSimulator: React.FC = () => {
  const minerals = getAllMinerals();

  const scenarios = [
    {
      id: 'antimony-cutoff',
      title: 'Full Chinese Antimony Export Halting',
      description: 'Simulation of 100% enforcement of MOFCOM Announcement No. 33 export curbs on antimony stibnite, metal, and trisulfide.',
      targetMineralId: 'antimony',
      disruptionSeverity: 'Extreme',
      leadTimeToExhaustionDays: 114,
      impactedPlatforms: ['Patriot PAC-3 MSE', '155mm Artillery Primer Production', 'Infrared Countermeasure Flares']
    },
    {
      id: 'heavy-ree-cutoff',
      title: 'Heavy Rare Earth (Dysprosium & Neodymium) Embargo',
      description: 'Total stoppage of refined sintered NdFeB permanent magnets and separated dysprosium oxide.',
      targetMineralId: 'dysprosium',
      disruptionSeverity: 'Catastrophic',
      leadTimeToExhaustionDays: 57,
      impactedPlatforms: ['F-35 Lightning II Control Actuators', 'Virginia-Class Submarine Propulsion Drives', 'Precision Guided Munitions']
    },
    {
      id: 'semiconductor-gallium',
      title: 'Gallium & Germanium Dual Electronic Warfare Embargo',
      description: 'Extended licensing suspension for high-purity gallium metal (99.9999%) and optical-grade germanium.',
      targetMineralId: 'gallium',
      disruptionSeverity: 'Severe',
      leadTimeToExhaustionDays: 72,
      impactedPlatforms: ['AN/SPY-6 Naval Radar', 'Next Generation Jammer (NGJ)', 'Night Vision Thermal Weapon Sights']
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  const activeMineral = minerals.find(m => m.id === activeScenario.targetMineralId) || minerals[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>GEOPOLITICAL EXPORT EMBARGO CASCADE SIMULATOR</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Dynamic mathematical projection of supply chain exhaustion and defense manufacturing disruption.
        </p>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
        {scenarios.map((scen) => {
          const isSelected = activeScenarioId === scen.id;
          return (
            <button
              key={scen.id}
              onClick={() => setActiveScenarioId(scen.id)}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase inline-block mb-2 ${
                  scen.disruptionSeverity === 'Catastrophic' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {scen.disruptionSeverity} Shock
                </span>
                <h4 className="font-bold text-white text-xs leading-snug">{scen.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{scen.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Runway:</span>
                <span className="text-amber-400 font-bold">{scen.leadTimeToExhaustionDays} Days</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Simulation Engine Output */}
      <div className="bg-[#050C1C] border border-amber-950/60 rounded-2xl p-6 font-mono space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block">
              Active Cascade Model // {activeScenario.disruptionSeverity} Impact
            </span>
            <h3 className="text-lg font-bold text-white mt-1">{activeScenario.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeScenario.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-red-950/40 border border-red-900/60 px-4 py-2.5 rounded-xl text-right">
              <span className="text-[10px] text-red-300 block uppercase">Critical Stockpile Exhaustion</span>
              <strong className="text-red-400 text-xl font-bold">{activeScenario.leadTimeToExhaustionDays} Calendar Days</strong>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Chokepoint Share Cut</span>
            <strong className="text-amber-400 text-base">{activeMineral.top_refining_share_pct}%</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">{activeMineral.top_refining_nation} refining control</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Domestic US Production</span>
            <strong className="text-cyan-400 text-base">{100 - activeMineral.us_import_reliance_pct}%</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">{activeMineral.us_import_reliance_pct}% import dependent</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Re-shoring Construction Lag</span>
            <strong className="text-slate-200 text-base">36 - 60 Months</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">Hydrometallurgical plant permitting</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Material Vulnerability Index</span>
            <strong className="text-red-400 text-base">{activeMineral.vulnerability_score} / 100</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">DOD Critical Materials metric</span>
          </div>
        </div>

        {/* Cascade Impact on Defense Platforms */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>PRIMARY DEFENSE WEAPONS PLATFORMS AT DIRECT RISK OF PRODUCTION HALT</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeScenario.impactedPlatforms.map((plat, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-ping"></div>
                <span className="text-xs text-slate-200 font-bold">{plat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Degradation Penalty of Substitutes */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs">
          <Cpu className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Emergency Substitute Penalty Assessment</span>
            <p className="text-slate-300">
              <strong className="text-amber-400">Available Alternative:</strong> {activeMineral.primary_substitute}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
