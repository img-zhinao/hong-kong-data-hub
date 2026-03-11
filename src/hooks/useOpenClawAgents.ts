import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { OpenClawAgent } from '@/components/openclaw/openClawData';

interface DbAgent {
  id: string;
  agent_code: string;
  name: string;
  status: string;
  hardware: string;
  employees: string[];
  run_days: number;
  total_revenue: number;
  price: number;
  monthly_revenue: number;
  annual_return: number;
  revenue_history: { day: string; revenue: number }[];
  tcr: number;
  memory_entries: number;
  memory_compression: number;
  geo_score: number;
  apple_id_unbound: boolean;
  pii_sanitized: boolean;
  soul_md_uploaded: boolean;
  identity_md_uploaded: boolean;
  hw_model: string;
  hw_ram: number;
  hw_storage: number;
  hw_quantity: number;
  hw_coefficient: number;
  soul_description: string | null;
  identity_description: string | null;
}

function mapDbToAgent(row: DbAgent): OpenClawAgent {
  return {
    id: row.agent_code,
    name: row.name,
    status: row.status as OpenClawAgent['status'],
    hardware: row.hardware,
    employees: row.employees,
    runDays: row.run_days,
    totalRevenue: Number(row.total_revenue),
    price: Number(row.price),
    monthlyRevenue: Number(row.monthly_revenue),
    annualReturn: Number(row.annual_return),
    revenueHistory: (row.revenue_history ?? []) as { day: string; revenue: number }[],
    metrics: {
      tcr: Number(row.tcr),
      memoryEntries: row.memory_entries,
      memoryCompression: Number(row.memory_compression),
      geoScore: Number(row.geo_score),
    },
    compliance: {
      appleIdUnbound: row.apple_id_unbound,
      piiSanitized: row.pii_sanitized,
      soulMdUploaded: row.soul_md_uploaded,
      identityMdUploaded: row.identity_md_uploaded,
    },
    hardwareSpec: {
      model: row.hw_model,
      ram: row.hw_ram,
      storage: row.hw_storage,
      quantity: row.hw_quantity,
      hwCoefficient: Number(row.hw_coefficient),
    },
    soulDescription: row.soul_description ?? undefined,
    identityDescription: row.identity_description ?? undefined,
  };
}

export function useOpenClawAgents() {
  return useQuery({
    queryKey: ['openclaw-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('openclaw_agents' as any)
        .select('*')
        .order('agent_code');
      if (error) throw error;
      return (data as unknown as DbAgent[]).map(mapDbToAgent);
    },
  });
}
