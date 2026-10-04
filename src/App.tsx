import React, { useState } from 'react';
import { Header } from './components/Header';
import { MineralMatrix } from './components/MineralMatrix';
import { ChokepointRadar } from './components/ChokepointRadar';
import { DefensePlatformDossier } from './components/DefensePlatformDossier';
import { StockpileTelemetry } from './components/StockpileTelemetry';
import { EmbargoShockSimulator } from './components/EmbargoShockSimulator';
import { ReceiptLedger } from './components/ReceiptLedger';
import { getComputedStats } from './lib/data';
import { Flame, ShieldAlert, AlertTriangle, Layers, DollarSign, Crosshair } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('minerals');
  const stats = getComputedStats();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Institutional Macro Ticker */}
      <div className="bg-[#050C1A] border-b border-amber-950/70 py-3">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Tracked Minerals</span>
            <strong className="text-white text-base font-bold flex items-center gap-1.5 mt-0.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{stats.totalMinerals} Elements</span>
            </strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Avg Refining Share</span>
            <strong className="text-amber-400 text-base font-bold flex items-center gap-1.5 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{stats.avgRefiningShare}%</span>
            </strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Active Export Curbs</span>
            <strong className="text-red-400 text-base font-bold flex items-center gap-1.5 mt-0.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{stats.exportControlledCount} Minerals</span>
            </strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Stockpile Shortfall</span>
            <strong className="text-orange-400 text-base font-bold flex items-center gap-1.5 mt-0.5">
              <Crosshair className="w-4 h-4 text-orange-400" />
              <span>{stats.deficitStockpileCount} Materials</span>
            </strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Title III Capital</span>
            <strong className="text-emerald-400 text-base font-bold flex items-center gap-1 mt-0.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>${(stats.totalGrantFundingUsd / 1000000).toFixed(1)}M</span>
            </strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Critical Tier 1</span>
            <strong className="text-cyan-400 text-base font-bold flex items-center gap-1.5 mt-0.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{stats.criticalTier1Count} Materials</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'minerals' && <MineralMatrix />}
        {activeTab === 'chokepoints' && <ChokepointRadar />}
        {activeTab === 'defense' && <DefensePlatformDossier />}
        {activeTab === 'stockpile' && <StockpileTelemetry />}
        {activeTab === 'simulator' && <EmbargoShockSimulator />}
        {activeTab === 'ledger' && <ReceiptLedger />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#02050E] py-6 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-slate-300 font-bold">STRAT-MINERAL TERMINAL</span> — National Defense Stockpile & Critical Materials Monitor.
          </div>
          <div>
            Data sourced from USGS MCS 2024, DLA Strategic Materials, and CRS reports.
          </div>
        </div>
      </footer>
    </div>
  );
};
