export interface Mineral {
  id: string;
  name: string;
  symbol: string;
  atomic_number: number;
  criticality_tier: string;
  us_import_reliance_pct: number;
  top_refining_nation: string;
  top_refining_share_pct: number;
  global_annual_production_mt: number;
  us_defense_stockpile_status: string;
  stockpile_months_available: number;
  primary_defense_uses: string[];
  active_export_controls: string;
  vulnerability_score: number;
  primary_substitute: string;
  source_url: string;
  retrieved_at: string;
}

export interface Chokepoint {
  id: string;
  name: string;
  location: string;
  controlled_by: string;
  minerals_controlled: string[];
  global_refining_concentration_pct: number;
  vulnerability_description: string;
  risk_level: string;
  lat: number;
  lng: number;
  source_url: string;
  retrieved_at: string;
}

export interface PlatformMineralDemand {
  mineral: string;
  weight_lbs: number;
  critical_subsystem: string;
}

export interface DefensePlatform {
  platform_id: string;
  name: string;
  lead_contractor: string;
  critical_mineral_demand: PlatformMineralDemand[];
  supply_chain_bottleneck: string;
  annual_procurement_target: number;
  source_url: string;
  retrieved_at: string;
}

export interface StockpileInitiative {
  project_name: string;
  location: string;
  grant_amount_usd: number;
  authority: string;
  target_mineral: string;
  projected_capacity: string;
  status: string;
  source_url: string;
  retrieved_at: string;
}

export interface MineralDataset {
  dataset_metadata: {
    system_name: string;
    version: string;
    updated_at: string;
    jurisdiction: string;
    authority: string;
    source_url: string;
    retrieved_at: string;
  };
  minerals: Mineral[];
  chokepoints: Chokepoint[];
  defense_platforms: DefensePlatform[];
  stockpile_initiatives: StockpileInitiative[];
}

export interface ComputedStats {
  totalMinerals: number;
  avgRefiningShare: number;
  exportControlledCount: number;
  deficitStockpileCount: number;
  totalGrantFundingUsd: number;
  criticalTier1Count: number;
}
