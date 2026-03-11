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

export const mockAgents: OpenClawAgent[] = [
  {
    id: 'OC-001',
    name: 'OpenClaw 黄金军团 #001',
    status: 'available',
    hardware: 'Mac Mini M4 Pro × 2台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'CodeReviewer', 'Designer', 'Analyst'],
    runDays: 45,
    totalRevenue: 12580,
    price: 18999,
    monthlyRevenue: 3200,
    annualReturn: 64,
    revenueHistory: [
      { day: '第1周', revenue: 580 }, { day: '第2周', revenue: 1200 },
      { day: '第3周', revenue: 2100 }, { day: '第4周', revenue: 3500 },
      { day: '第5周', revenue: 5800 }, { day: '第6周', revenue: 8900 },
      { day: '第7周', revenue: 12580 },
    ],
    metrics: { tcr: 92, memoryEntries: 1247, memoryCompression: 0.32, geoScore: 88 },
    compliance: { appleIdUnbound: true, piiSanitized: true, soulMdUploaded: true, identityMdUploaded: true },
    hardwareSpec: { model: 'Mac Mini M4 Pro', ram: 24, storage: 512, quantity: 2, hwCoefficient: 1.35 },
    soulDescription: '专注于数据分析和内容创作的全栈AI军团，具备深度学习和自然语言处理能力。',
    identityDescription: '黄金军团 - 企业级AI数字员工团队，已通过48项能力测试。',
  },
  {
    id: 'OC-002',
    name: 'OpenClaw 白银军团 #002',
    status: 'available',
    hardware: 'Mac Mini M4 × 1台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'Analyst'],
    runDays: 30,
    totalRevenue: 6200,
    price: 12999,
    monthlyRevenue: 2100,
    annualReturn: 48,
    revenueHistory: [
      { day: '第1周', revenue: 320 }, { day: '第2周', revenue: 980 },
      { day: '第3周', revenue: 1800 }, { day: '第4周', revenue: 3200 },
      { day: '第5周', revenue: 6200 },
    ],
    metrics: { tcr: 78, memoryEntries: 623, memoryCompression: 0.45, geoScore: 72 },
    compliance: { appleIdUnbound: true, piiSanitized: true, soulMdUploaded: true, identityMdUploaded: false },
    hardwareSpec: { model: 'Mac Mini M4', ram: 16, storage: 256, quantity: 1, hwCoefficient: 1.0 },
    soulDescription: '轻量级内容创作军团，适合中小型业务场景。',
  },
  {
    id: 'OC-003',
    name: 'OpenClaw 钻石军团 #003',
    status: 'presale',
    hardware: 'Mac Mini M4 Pro × 3台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'CodeReviewer', 'Designer', 'Analyst', 'Trader', 'Researcher'],
    runDays: 0,
    totalRevenue: 0,
    price: 28999,
    monthlyRevenue: 4800,
    annualReturn: 72,
    revenueHistory: [],
    metrics: { tcr: 95, memoryEntries: 2100, memoryCompression: 0.28, geoScore: 94 },
    compliance: { appleIdUnbound: true, piiSanitized: true, soulMdUploaded: true, identityMdUploaded: true },
    hardwareSpec: { model: 'Mac Mini M4 Pro', ram: 36, storage: 1024, quantity: 3, hwCoefficient: 1.6 },
    soulDescription: '旗舰级全能军团，覆盖数据采集、分析、交易、研究全链路。',
    identityDescription: '钻石军团 - 顶配AI团队，8名数字员工协同作业。',
  },
  {
    id: 'OC-004',
    name: 'OpenClaw 精英军团 #004',
    status: 'sold',
    hardware: 'Mac Mini M4 Pro × 2台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'CodeReviewer', 'Designer'],
    runDays: 60,
    totalRevenue: 18600,
    price: 16999,
    monthlyRevenue: 2800,
    annualReturn: 56,
    revenueHistory: [
      { day: '第1周', revenue: 400 }, { day: '第2周', revenue: 1100 },
      { day: '第3周', revenue: 2400 }, { day: '第4周', revenue: 4200 },
      { day: '第5周', revenue: 6800 }, { day: '第6周', revenue: 10200 },
      { day: '第7周', revenue: 14000 }, { day: '第8周', revenue: 18600 },
    ],
    metrics: { tcr: 85, memoryEntries: 1580, memoryCompression: 0.38, geoScore: 80 },
    compliance: { appleIdUnbound: true, piiSanitized: true, soulMdUploaded: true, identityMdUploaded: true },
    hardwareSpec: { model: 'Mac Mini M4 Pro', ram: 24, storage: 512, quantity: 2, hwCoefficient: 1.35 },
    soulDescription: '精英军团专注代码审查和设计领域。',
    identityDescription: '精英军团 - 已售出，运行稳定。',
  },
  {
    id: 'OC-005',
    name: 'OpenClaw 先锋军团 #005',
    status: 'available',
    hardware: 'Mac Mini M4 × 2台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'Analyst', 'Designer'],
    runDays: 20,
    totalRevenue: 4100,
    price: 14999,
    monthlyRevenue: 2500,
    annualReturn: 52,
    revenueHistory: [
      { day: '第1周', revenue: 500 }, { day: '第2周', revenue: 1600 },
      { day: '第3周', revenue: 4100 },
    ],
    metrics: { tcr: 81, memoryEntries: 890, memoryCompression: 0.41, geoScore: 76 },
    compliance: { appleIdUnbound: true, piiSanitized: false, soulMdUploaded: true, identityMdUploaded: true },
    hardwareSpec: { model: 'Mac Mini M4', ram: 16, storage: 512, quantity: 2, hwCoefficient: 1.15 },
    soulDescription: '先锋军团擅长快速内容生成与数据分析。',
  },
  {
    id: 'OC-006',
    name: 'OpenClaw 旗舰军团 #006',
    status: 'presale',
    hardware: 'Mac Mini M4 Pro × 4台',
    employees: ['BossAgent', 'DataMiner', 'ContentWriter', 'CodeReviewer', 'Designer', 'Analyst', 'Trader', 'Researcher', 'Scheduler', 'Monitor'],
    runDays: 0,
    totalRevenue: 0,
    price: 38999,
    monthlyRevenue: 6500,
    annualReturn: 80,
    revenueHistory: [],
    metrics: { tcr: 97, memoryEntries: 3200, memoryCompression: 0.22, geoScore: 96 },
    compliance: { appleIdUnbound: true, piiSanitized: true, soulMdUploaded: true, identityMdUploaded: true },
    hardwareSpec: { model: 'Mac Mini M4 Pro', ram: 48, storage: 2048, quantity: 4, hwCoefficient: 1.85 },
    soulDescription: '超级旗舰军团，10名AI员工覆盖企业运营全场景。',
    identityDescription: '旗舰军团 - 顶级配置，预售中。',
  },
];

// Keep backward compat
export const mockProducts = mockAgents;
