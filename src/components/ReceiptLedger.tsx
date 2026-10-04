import React, { useState } from 'react';
import { getAllMinerals, getAllChokepoints, getAllDefensePlatforms, getAllStockpileInitiatives } from '../lib/data';
import { BookOpen, ExternalLink, Search } from 'lucide-react';

export const ReceiptLedger: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const minerals = getAllMinerals();
  const chokepoints = getAllChokepoints();
  const platforms = getAllDefensePlatforms();
  const initiatives = getAllStockpileInitiatives();

  const allReceipts = [
    ...minerals.map(m => ({
      category: 'Critical Mineral',
      name: `${m.name} (${m.symbol})`,
      detail: `US Import: ${m.us_import_reliance_pct}% | Top Refining: ${m.top_refining_nation} (${m.top_refining_share_pct}%)`,
      source_url: m.source_url,
      retrieved_at: m.retrieved_at
    })),
    ...chokepoints.map(cp => ({
      category: 'Refining Chokepoint',
      name: cp.name,
      detail: `Controlled by ${cp.controlled_by} (${cp.global_refining_concentration_pct}% global concentration)`,
      source_url: cp.source_url,
      retrieved_at: cp.retrieved_at
    })),
    ...platforms.map(p => ({
      category: 'Defense Platform',
      name: p.name,
      detail: `Prime: ${p.lead_contractor} | Annual Procurement: ${p.annual_procurement_target} units`,
      source_url: p.source_url,
      retrieved_at: p.retrieved_at
    })),
    ...initiatives.map(init => ({
      category: 'Stockpile Initiative',
      name: init.project_name,
      detail: `Grant: $${(init.grant_amount_usd / 1000000).toFixed(1)}M USD | ${init.authority}`,
      source_url: init.source_url,
      retrieved_at: init.retrieved_at
    }))
  ];

  const filteredReceipts = allReceipts.filter(r => {
    const matchesCategory = filter === 'all' || r.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.source_url.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>PRIMARY AUTHORITY RECEIPT LEDGER</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every entity, chokepoint, and defense metric anchored to authoritative USGS, DoD, and CRS citations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search receipts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs font-mono">
            {['all', 'mineral', 'chokepoint', 'defense', 'stockpile'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded capitalize transition ${
                  filter === cat
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#050C1B] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-500 uppercase text-[10px]">
                <th className="py-3 px-4">Entity & Category</th>
                <th className="py-3 px-4">Key Specification</th>
                <th className="py-3 px-4">Receipt URL</th>
                <th className="py-3 px-4">Retrieved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReceipts.map((receipt, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4">
                    <span className="text-[10px] text-amber-500 uppercase block font-semibold">
                      {receipt.category}
                    </span>
                    <strong className="text-white text-xs block mt-0.5">
                      {receipt.name}
                    </strong>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {receipt.detail}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={receipt.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 underline truncate max-w-xs"
                    >
                      <span className="truncate">{receipt.source_url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                    {receipt.retrieved_at.substring(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
