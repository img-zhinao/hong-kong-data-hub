export type ProductStatus = 'available' | 'sold' | 'presale';

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

export const mockProducts: OpenClawProduct[] = [
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
  },
];
