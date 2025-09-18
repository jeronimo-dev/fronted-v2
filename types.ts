// FIX: Add 'profile' to the Page type to allow navigation to the profile page from components like ProfileCard.
// FIX: Add 'task-ia' to the Page type to support navigation to the Task IA page and resolve type errors.
export type Page = 'dashboard' | 'clients' | 'create-task' | 'users' | 'task-display' | 'create-user' | 'task-mapping' | 'task-mapping-runner' | 'profile' | 'task-admin' | 'task-ia' | 'task-talk';

export enum TaskPriority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export enum TaskStatus {
  DONE,
  PENDING,
}

export enum TaskType {
  PADRAO = 'Padrão',
  URGENTE = 'Urgente',
  IMPORTANTE = 'Importante',
}

export interface Task {
  id: string;
  time: string;
  priority: TaskPriority;
  description: string;
  isWindow?: boolean;
  status: TaskStatus;
  taskType?: TaskType;
  assignments?: string;
  dueDate?: string;
  // New fields for detail view
  title?: string;
  origin?: string;
  dateTime?: string;
  location?: string;
  locationLink?: string;
  instructions?: string[];
}

export interface User {
  name: string;
  title: string;
  avatarUrl: string;
  activityStatus: string;
  taskName: string;
  email: string;
  quote: string;
}

export interface ClientStat {
  value: string;
  label: string;
  subLabel?: string;
  color: string;
}

export enum OnboardingStatus {
    NAO_ACESSADO,
    EM_PREENCHIMENTO,
    FALTAM_DADOS,
    FINALIZADO,
    EM_ATRASO,
}

// --- TVID Document Types ---
export interface TvidColor {
  name: string;
  hex: string;
  role: string;
}

export interface TvidTypographyStyle {
  level: 'H1' | 'H2' | 'Parágrafo';
  fontFamily: string;
  exampleText: string;
}

export interface TvidUiComponentState {
  name: 'Padrão' | 'Hover' | 'Ativo';
  style: React.CSSProperties;
}

export interface TvidUiComponent {
  name: 'Botão Primário';
  states: TvidUiComponentState[];
}

export interface TvidGuideline {
  type: 'do' | 'dont';
  description: string;
}

export interface TvidDocumentData {
  philosophy: string;
  palette: TvidColor[];
  typography: TvidTypographyStyle[];
  components: TvidUiComponent[];
  guidelines: TvidGuideline[];
}
// --- End TVID Document Types ---


export interface Client {
  id:string;
  name: string;
  manager: string;
  contact: string;
  monthlyRevenue: string;
  startDate: string;
  contractTerm: string;
  planName?: string;
  billingStatus: 'PAGA' | 'PENDENTE';
  stats: ClientStat[];
  grossProfit: string;
  taskMappingResults?: Record<string, string>;
  penseDocument?: string;
  tvidDocument?: TvidDocumentData;
  taskloaderStatus: OnboardingStatus;
  infoStatus: {
    arquivos: OnboardingStatus;
    acessos: OnboardingStatus;
    contrato: OnboardingStatus;
    design: OnboardingStatus;
  };
}

export interface AI {
  id:string;
  name: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  avatarUrl: string;
  systemInstruction: string;
}

export type UserRole = 'Master' | 'Agent' | 'User';

export interface TeamUser {
  id: string;
  name: string;
  taskName: string;
  email: string;
  phone: string;
  role: UserRole;
}

// New types for Sales/Leads
export enum LeadColumnStatus {
    NOVAS_OPORTUNIDADES = 'NOVAS OPORTUNIDADES',
    CONTATADOS = 'CONTATADOS',
    REUNIAO_AGENDADA = 'REUNIÃO AGENDADA',
    EM_NEGOCIACAO = 'EM NEGOCIAÇÃO',
    VENDA_CONCLUIDA = 'VENDA CONCLUÍDA',
    VENDAS_PERDIDAS = 'VENDAS PERDIDAS'
}

export enum LeadQualificationStatus {
    ALTA = 'ALTA',
    BAIXA = 'BAIXA',
    NAO_QUALIFICADO = 'NÃO QUALIFICADO',
    DESQUALIFICADO = 'DESQUALIFICADO'
}

export enum BuyerJourney {
    J1 = 1,
    J2 = 2,
    J3 = 3
}

export interface LeadHistoryItem {
    timestamp: string;
    description: string;
}

export interface Lead {
    id: string;
    name: string;
    capturedAt: Date;
    status: LeadColumnStatus;
    qualification: LeadQualificationStatus;
    phone: string;
    email: string;
    motivation: string;
    origin: string;
    paymentCapacity: string;
    buyerJourney: BuyerJourney | null;
    contactAttempts: {
        first: boolean;
        second: boolean;
        third: boolean;
    };
    meetingScheduled: string | null;
    proposalSent: 'SIM' | 'NÃO';
    interactions: string;
    history: LeadHistoryItem[];
    saleValue?: number;
    lostReason?: string;
}