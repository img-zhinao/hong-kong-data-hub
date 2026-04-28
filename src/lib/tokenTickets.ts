export type TokenTicketStatus = 'submitted' | 'reviewing' | 'approved' | 'rejected';

export interface TokenTicket {
  id: string;
  createdAt: string;
  status: TokenTicketStatus;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  volume: string;
  settlement: string;
  models: string[];
  notes?: string;
}

const KEY = 'thk_model_access_tickets_v1';

export function loadTickets(): TokenTicket[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveTicket(t: TokenTicket) {
  const list = loadTickets();
  list.unshift(t);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
}

export function getTicket(id: string): TokenTicket | undefined {
  return loadTickets().find((t) => t.id === id);
}

export function generateTicketId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `THK-${ts}-${rand}`;
}

export const STATUS_LABELS: Record<TokenTicketStatus, { label: string; color: string }> = {
  submitted: { label: '已提交', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  reviewing: { label: '审核中', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  approved: { label: '已开通', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  rejected: { label: '已拒绝', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
};

export const SETTLEMENT_LABELS: Record<string, string> = {
  'hkd-prepaid': '港币预付（HKD Prepaid）',
  'usd-postpaid': '美元后付（USD Postpaid）',
  'cny-onshore': '人民币境内结算（CNY Onshore）',
  'crypto': '稳定币结算（USDT / USDC）',
};

export const MODEL_LABELS: Record<string, string> = {
  'openai-gpt': 'OpenAI GPT 系列',
  'anthropic-claude': 'Anthropic Claude 系列',
  'google-gemini': 'Google Gemini 系列',
  'meta-llama': 'Meta Llama 系列',
  'mistral': 'Mistral 系列',
};
