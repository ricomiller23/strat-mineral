import rawData from '../../data/minerals.json';
import { MineralDataset, Mineral, Chokepoint, DefensePlatform, StockpileInitiative, ComputedStats } from '../types';

export const mineralData: MineralDataset = rawData as MineralDataset;

export const getAllMinerals = (): Mineral[] => mineralData.minerals;
export const getAllChokepoints = (): Chokepoint[] => mineralData.chokepoints;
export const getAllDefensePlatforms = (): DefensePlatform[] => mineralData.defense_platforms;
export const getAllStockpileInitiatives = (): StockpileInitiative[] => mineralData.stockpile_initiatives;

export const getComputedStats = (): ComputedStats => {
  const minerals = mineralData.minerals;
  const initiatives = mineralData.stockpile_initiatives;

  const totalMinerals = minerals.length;
  const totalRefining = minerals.reduce((acc, m) => acc + m.top_refining_share_pct, 0);
  const avgRefiningShare = totalMinerals > 0 ? Math.round((totalRefining / totalMinerals) * 10) / 10 : 0;

  const exportControlledCount = minerals.filter(m => m.active_export_controls.toLowerCase().includes('active')).length;
  const deficitStockpileCount = minerals.filter(m => 
    m.us_defense_stockpile_status.toLowerCase().includes('deficit') || 
    m.us_defense_stockpile_status.toLowerCase().includes('shortfall')
  ).length;

  const totalGrantFundingUsd = initiatives.reduce((acc, init) => acc + init.grant_amount_usd, 0);
  const criticalTier1Count = minerals.filter(m => m.criticality_tier.includes('Tier 1')).length;

  return {
    totalMinerals,
    avgRefiningShare,
    exportControlledCount,
    deficitStockpileCount,
    totalGrantFundingUsd,
    criticalTier1Count
  };
};
