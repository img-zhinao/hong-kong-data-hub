export type ProductStatus = 'available' | 'sold' | 'presale';

export interface AgentMetrics {
  tcr: number;
  memoryEntries: number;
  memoryCompression: number;
  geoScore: number;
}

export interface ComplianceStatus {
  appleIdUnbound: boolean;
  piiSanitized: boolean;
  soulMdUploaded: boolean;
  identityMdUploaded: boolean;
}

export interface HardwareSpec {
  model: string;
  ram: number;
  storage: number;
  quantity: number;
  hwCoefficient: number;
}

export interface OpenClawProduct {
  id: string;
  name: string;
  status: ProductStatus;
  hardware: string;
  employees: string[];
  runDays: number;
  totalRevenue: number;
  price: number;
  monthlyRevenue: number;
  annualReturn: number;
  revenueHistory: { day: string; revenue: number }[];
}

export interface OpenClawAgent extends OpenClawProduct {
  metrics: AgentMetrics;
  compliance: ComplianceStatus;
  hardwareSpec: HardwareSpec;
  soulDescription?: string;
  identityDescription?: string;
  basePrice?: number;
}

export function calculateBasePrice(agent: OpenClawAgent): number {
  const alpha = 100, beta = 500, gamma = 200;
  const T = Math.max(agent.runDays, 1);
  const sCount = agent.employees.length;
  const raw = (alpha * agent.metrics.tcr / 100 + beta * Math.log(T) + gamma * sCount) * agent.hardwareSpec.hwCoefficient;
  return Math.round(raw);
}
