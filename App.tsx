import React, { useState, useEffect, useCallback } from 'react';
import { DashboardSidebar } from './components/DashboardSidebar';
import { CreateTaskModal } from './components/CreateTaskModal';
import { Task, TaskStatus, Client, Page, OnboardingStatus, TeamUser, TvidDocumentData } from './types';
import DashboardPage from './pages/Dashboard';
import ClientsPage from './pages/Clients';
import { ClientDetailPage } from './pages/ClientDetailPage';
import TaskMediaPage from './pages/TaskMediaPage';
import UsersPage from './pages/UsersPage';
import TaskDisplayPage from './pages/TaskDisplayPage';
import CreateUserPage from './pages/CreateUserPage';
import { CreateClientPage } from './pages/CreateClientPage';
import TaskMappingPage from './pages/TaskMappingPage';
import { LoginPage } from './pages/LoginPage';
import { TaskMappingRunnerPage } from './pages/TaskMappingRunnerPage';
import { ProfileModal } from './components/ProfileModal';
// FIX: Import ProfilePage to handle navigation to the user's profile.
import ProfilePage from './pages/ProfilePage';
import PenseDocumentPage from './pages/PenseDocumentPage';
import TvidDocumentPage from './pages/TvidDocumentPage';
import TaskAdminPage from './pages/TaskAdminPage';
import { UtilizeBotModal } from './components/UtilizeBotModal';
import FlowPage from './pages/FlowPage';


const initialTasks: Task[] = [
    { id: '1', time: '09:00', priority: 2, description: 'Aprovação E.E.D. [EMPRESA] Apresentação ao Cliente', status: TaskStatus.DONE },
    { 
        id: '2', 
        time: '10:00', 
        priority: 1, 
        description: 'Onboarding Novo Cliente Comércio de Joias XPTO via Meetings', 
        status: TaskStatus.PENDING,
        title: 'Onboarding Novo Cliente',
        origin: 'Agendamento Automático via Cliente',
        dateTime: '01/07/2025 - 10:00 Manhã',
        location: 'Google Meeting',
        locationLink: '#',
        instructions: [
            'Vá até a sessão CLIENTES e acesse o cadastro do novo cliente',
            'Copie o link do Task Mapping já gerado para esse cliente',
            'Entre na reunião 5 minutos antes do início.',
            'Caso todos os participantes estejam presentes inicie explicando o objetivo da reunião de onboarding e sobre a importância do EED.',
            'Responda o Task Mapping o mais detalhadamente possível e só envie para o DUnner após ter certeza de que coletou o máximo de informações para que o EED seja fiel ao que o cliente informou.'
        ] 
    },
    { id: '3', time: '12:00', priority: 3, description: 'Almoço com Equipe de Filmagem + Orçamento Serviços para Evento', status: TaskStatus.PENDING },
    { id: '4', time: '13:00', priority: 3, description: 'JANELA', isWindow: true, status: TaskStatus.PENDING },
    { id: '5', time: '15:00', priority: 3, description: 'JANELA', isWindow: true, status: TaskStatus.PENDING },
    { id: '6', time: '16:00', priority: 1, description: 'Reunião de Fechamento com Clínica de Fertilidade Luz Vida', status: TaskStatus.PENDING },
];

const PENSE_DOCUMENT_ESTETICA_PLENA = `
# P.E.N.S.E: O Blueprint Estratégico para Estética Plena

**Resumo Executivo**
A análise revela que o mercado de óticas está saturado com "dicas" superficiais, criando uma oportunidade para a Estética Plena se posicionar como uma fonte de inteligência estratégica de elite, tornando a concorrência irrelevante ao oferecer acesso a conhecimentos de alto nível.

## P - Problema
A premissa sagrada do mercado de óticas é que o sucesso vem de "dicas de marketing" e "gestão de redes sociais". Isso é uma mentira que mantém os donos de óticas ocupados e pequenos. Nosso primeiro ato é demolir essa crença. O sucesso não vem de fazer mais do mesmo, mas de ter acesso ao que ninguém mais tem.

## E - Evidência
> "O mercado oferece 'dicas' genéricas e repetitivas que não se aplicam à realidade complexa das óticas." - *Análise do Task Mapping*

A evidência é clara: os donos de óticas estão sobrecarregados com informações de baixo valor que não geram resultados reais. Eles sentem-se estagnados, trabalhando excessivamente sem ver um crescimento correspondente, enquanto observam concorrentes menores decolarem.

## N - Nicho
O nicho não é apenas "donos de óticas", mas "donos de óticas ambiciosos que aspiram construir um império". Nosso objetivo é capturar o território mental de "crescimento real para óticas". Qualquer dono de ótica que pensar em "escalar" ou "construir um império" deve pensar instantaneamente em nós.

## S - Solução
Nossa anomalia é o "Acesso Direto à Sala de Guerra dos Titãs". Não é uma live, não é um curso. É uma transmissão de inteligência estratégica de alto nível, normalmente restrita a CEOs de elite. O mercado não sabe como precificar ou categorizar o acesso a segredos, apenas a "dicas". Nós não vendemos informação, nós vazamos poder.

## E - Execução
A live não é o fim, é a cabeça de ponte. O grupo de WhatsApp exclusivo criado para o evento se tornará o primeiro batalhão do "Círculo de Titãs". A partir dali, escalamos com produtos e mentorias que a concorrência, focada em "dicas", não tem a credibilidade ou o conhecimento para replicar. Ao final da execução, os "gurus de marketing para óticas" se tornarão irrelevantes.
`;

const PENSE_DOCUMENT_RPI = `
# P.E.N.S.E: O Blueprint Estratégico para RPI do Brasil Seguros

**Resumo Executivo**
A análise indica que o mercado de seguros opera num leilão de preços, ignorando a necessidade real de segurança do cliente. A RPI pode demolir este paradigma ao oferecer uma "Consultoria de Blindagem Pessoal", posicionando-se como arquiteta de segurança e não como mera vendedora de apólices, tornando a concorrência baseada em preço obsoleta.

## P - Problema
A premissa do mercado de seguros é a "cotação". O cliente pede, o corretor busca o menor preço. Isso é um leilão de insegurança. Vamos demolir a ideia de que seguro se compra por preço. Seguro se constrói com inteligência.

## E - Evidência
> "Corretores focados apenas na comissão do momento, deixando o cliente desprotegido no dia do sinistro." - *Análise do Task Mapping*

O mercado está focado na transação, não na proteção. Clientes e corretores entram num ciclo canibal de leilão de preços, o que inevitavelmente leva a uma cobertura inadequada e frustração no momento do sinistro.

## N - Nicho
Nosso nicho não são pessoas buscando "o seguro mais barato", mas sim indivíduos e empresas que buscam "certeza e paz de espírito". Capturaremos o território mental da "segurança real". A concorrência pode brigar pelo território do "barato"; nós dominaremos o território da "certeza".

## S - Solução
Nossa anomalia é a "Consultoria de Blindagem Pessoal". Não vendemos apólices, entregamos uma arquitetura de segurança. Enquanto a concorrência responde "quanto custa?", nós perguntamos "do que você realmente precisa se proteger?". A solução é a profundidade da nossa análise num mercado de superficialidade.

## E - Execução
A regra do mercado é comissão sobre a venda. Nossa regra é uma taxa de consultoria pela "Blindagem", com a corretagem como consequência. Isso muda o jogo: não somos vendedores, somos arquitetos pagos pelo projeto, não pelos tijolos. Escalamos através da educação, usando cada "Blindagem" bem-sucedida como um case para criar conteúdo de autoridade sobre riscos que o mercado ignora.
`;

const TVID_DOCUMENT_ESTETICA_PLENA: TvidDocumentData = {
  philosophy: 'A identidade visual da Estética Plena é um cockpit de F-22: precisa, imersiva e focada na ação. A beleza emerge da funcionalidade. Cada elemento é projetado para guiar o usuário com clareza absoluta, eliminando o ruído e focando na missão.',
  palette: [
    { name: 'Azul Meia-Noite', hex: '#0A0E1A', role: 'Fundo principal, imersão' },
    { name: 'Titânio Claro', hex: '#F5F7FA', role: 'Texto principal, legibilidade' },
    { name: 'Aço Polido', hex: '#A0AEC0', role: 'Texto de apoio, metadados' },
    { name: 'Ciano de Tração', hex: '#43D9C9', role: 'Acento de ação, destaques' },
  ],
  typography: [
    { level: 'H1', fontFamily: "'Saira', sans-serif", exampleText: 'Cabeçalho de Missão (H1)' },
    { level: 'H2', fontFamily: "'Saira', sans-serif", exampleText: 'Título de Seção (H2)' },
    { level: 'Parágrafo', fontFamily: "'Inter', sans-serif", exampleText: 'Este é o texto padrão para comunicação. Garante clareza e legibilidade em todas as interfaces e relatórios.' },
  ],
  components: [
    {
      name: 'Botão Primário',
      states: [
        { name: 'Padrão', style: { backgroundColor: '#43D9C9', color: '#0A0E1A' } },
        { name: 'Hover', style: { backgroundColor: '#F5F7FA', color: '#0A0E1A' } },
        { name: 'Ativo', style: { backgroundColor: '#F5F7FA', color: '#0A0E1A', transform: 'scale(0.98)' } },
      ],
    },
  ],
  guidelines: [
    { type: 'do', description: 'Use o Ciano de Tração para guiar o usuário à ação mais importante.' },
    { type: 'do', description: 'Mantenha alto contraste entre texto e fundo para máxima legibilidade.' },
    { type: 'dont', description: 'Não use mais de duas fontes na mesma tela para evitar ruído visual.' },
    { type: 'dont', description: 'Não misture o Ciano de Tração com outras cores de acento.' },
  ],
};


const initialClients: Client[] = [
    {
        id: '1', name: 'Estética Plena', manager: 'Maria da Silva', contact: '(11) 99999-9999', monthlyRevenue: 'R$ +4.800,00', startDate: '01/04/2025', contractTerm: '12 MESES', planName: 'FUNNEL', billingStatus: 'PAGA', grossProfit: '111.235,44',
        taskloaderStatus: OnboardingStatus.FINALIZADO,
        infoStatus: {
            arquivos: OnboardingStatus.FINALIZADO,
            acessos: OnboardingStatus.FINALIZADO,
            contrato: OnboardingStatus.FINALIZADO,
            design: OnboardingStatus.FINALIZADO,
        },
        stats: [
            { value: '401', label: 'CONTATOS', color: 'bg-blue-600' },
            { value: '9.000,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
            { value: '129', label: 'QUALIFICADOS', color: 'bg-green-600' },
            { value: '5.765', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
            { value: '13', label: 'CONVERSÕES', color: 'bg-lime-500' },
            { value: '20', label: 'R.O.I.', color: 'bg-orange-500' },
        ],
        taskMappingResults: {
          "var-dor-original": "Sentimento de estagnação, trabalhando muito sem ver o crescimento correspondente, vendo concorrentes menores decolarem.",
          "var-visao-futuro": "Construir um império, não apenas um negócio. Ter acesso a um círculo de elite e estratégias que realmente funcionam.",
          "var-falha-mercado": "O mercado oferece 'dicas' genéricas e repetitivas que não se aplicam à realidade complexa das óticas.",
          "var-eed-promessa": "Acesso Direto à Sala de Guerra dos Titãs: 3 segredos de gestão e escala dos maiores CEOs do Brasil.",
          "var-eed-mecanismo": "Uma live gratuita e exclusiva, com conhecimento restrito, entregue por Daves Davolli que tem acesso direto a esses mentores de elite.",
          "var-objecao-principal": "'Isso é bom demais para ser verdade'. A dúvida sobre se o conteúdo realmente será de alto nível e não mais do mesmo."
        },
        penseDocument: PENSE_DOCUMENT_ESTETICA_PLENA,
        tvidDocument: TVID_DOCUMENT_ESTETICA_PLENA,
    },
    {
        id: '2', name: 'Clínica Luz Vida', manager: 'Dr. Ricardo Alves', contact: '(21) 98888-8888', monthlyRevenue: 'R$ +12.500,00', startDate: '15/05/2025', contractTerm: '24 MESES', planName: 'IMPERIO', billingStatus: 'PAGA', grossProfit: '250.780,10',
        taskloaderStatus: OnboardingStatus.EM_ATRASO,
        infoStatus: {
            arquivos: OnboardingStatus.FINALIZADO,
            acessos: OnboardingStatus.EM_ATRASO,
            contrato: OnboardingStatus.FINALIZADO,
            design: OnboardingStatus.FALTAM_DADOS,
        },
        stats: [
            { value: '890', label: 'CONTATOS', color: 'bg-blue-600' },
            { value: '15.000,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
            { value: '310', label: 'QUALIFICADOS', color: 'bg-green-600' },
            { value: '11.200', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
            { value: '25', label: 'CONVERSÕES', color: 'bg-lime-500' },
            { value: '22', label: 'R.O.I.', color: 'bg-orange-500' },
        ],
        taskMappingResults: {
            "var-dor-original": "Pacientes chegam cheios de desinformação da internet, o que complica o tratamento e gera ansiedade.",
            "var-visao-futuro": "Ser a principal referência em fertilidade, conhecida pela abordagem humana, transparente e com tecnologia de ponta.",
            "var-falha-mercado": "Outras clínicas tratam o processo de forma fria e técnica, esquecendo o lado emocional e humano dos pacientes.",
            "var-eed-promessa": "Jornada da Vida: Um acompanhamento que vai além do tratamento, com apoio psicológico e conteúdo que desmistifica a fertilidade.",
            "var-eed-mecanismo": "Plataforma online exclusiva para pacientes com vídeos, artigos e sessões ao vivo com especialistas, criando uma comunidade de apoio.",
            "var-objecao-principal": "Custo. O medo de que um serviço tão completo seja inacessível financeiramente."
        }
    },
    {
        id: '3', name: 'RPI do Brasil Seguros', manager: 'Paulo', contact: '(41) 98765-1234', monthlyRevenue: 'R$ +25.000,00', startDate: '20/06/2025', contractTerm: '12 MESES', planName: 'GUARDIÃO', billingStatus: 'PAGA', grossProfit: '450.000,00',
        taskloaderStatus: OnboardingStatus.EM_PREENCHIMENTO,
        infoStatus: {
            arquivos: OnboardingStatus.NAO_ACESSADO,
            acessos: OnboardingStatus.EM_PREENCHIMENTO,
            contrato: OnboardingStatus.FINALIZADO,
            design: OnboardingStatus.FINALIZADO,
        },
        stats: [
            { value: '150', label: 'CONTATOS', color: 'bg-blue-600' },
            { value: '2.500,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
            { value: '80', label: 'QUALIFICADOS', color: 'bg-green-600' },
            { value: '8.000', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
            { value: '30', label: 'CONVERSÕES', color: 'bg-lime-500' },
            { value: '35', label: 'R.O.I.', color: 'bg-orange-500' },
        ],
        taskMappingResults: {
          "var-dor-original": "O mercado de seguros está 'prostituído'. Corretores e clientes entram em um leilão canibal, onde a única variável é o preço.",
          "var-visao-futuro": "Substituir a guerra de preços pela paz de espírito, sendo um guardião para o cliente e não apenas um corretor.",
          "var-falha-mercado": "Corretores focados apenas na comissão do momento, deixando o cliente desprotegido no dia do sinistro.",
          "var-eed-promessa": "A RPI não vende seguros. Desenhamos uma arquitetura de segurança personalizada para sua vida e seu negócio.",
          "var-eed-mecanismo": "A Consultoria de Blindagem Pessoal, que usa metodologia e experiência interna para traduzir a complexidade das apólices em clareza absoluta.",
          "var-objecao-principal": "Isso parece muito bom e personalizado, mas deve ser mais caro do que meu corretor atual que só me dá o melhor preço."
        },
        penseDocument: PENSE_DOCUMENT_RPI,
    },
];

const initialTeamUsers: TeamUser[] = [
    {
        id: '1',
        name: 'Jerônimo Souto Gonçalves',
        role: 'Master',
        taskName: 'Jera',
        email: 'jeronimo@taskdun.com.br',
        phone: '(11) 91111-1111',
    },
    {
        id: '2',
        name: 'Maria Oliveira',
        role: 'Agent',
        taskName: 'Maria',
        email: 'maria.oliveira@taskdun.com.br',
        phone: '(11) 92222-2222',
    },
    {
        id: '3',
        name: 'Carlos Pereira',
        role: 'User',
        taskName: 'Carlão',
        email: 'carlos.pereira@taskdun.com.br',
        phone: '(11) 93333-3333',
    },
    {
        id: '4',
        name: 'Ana Costa',
        role: 'User',
        taskName: 'Ana',
        email: 'ana.costa@taskdun.com.br',
        phone: '(11) 94444-4444',
    },
    {
        id: '5',
        name: 'Lucas Martins',
        role: 'User',
        taskName: 'Luke',
        email: 'lucas.martins@taskdun.com.br',
        phone: '(11) 95555-5555',
    },
    {
        id: '6',
        name: 'Beatriz Santos',
        role: 'User',
        taskName: 'Bia',
        email: 'beatriz.santos@taskdun.com.br',
        phone: '(11) 96666-6666',
    },
];


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false);
  const [page, setPage] = useState<Page>('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [clientForMapping, setClientForMapping] = useState<Client | null>(null);
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>(initialTeamUsers);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<TeamUser | null>(null);
  const [viewingDocument, setViewingDocument] = useState<{type: 'pense' | 'tvid' | 'task-media', client: Client} | null>(null);
  const [clientForTaskBotModal, setClientForTaskBotModal] = useState<Client | null>(null);


  const handleLogin = useCallback((email: string, pass: string) => {
    if (email.toLowerCase() === 'admin@taskdun.com.br' && pass === 'password') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('E-mail ou senha inválidos.');
      setTimeout(() => setLoginError(null), 3000);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleCreateTask = useCallback((newTaskData: Omit<Task, 'id' | 'status'>) => {
    setTasks(prevTasks => {
        const newTask: Task = {
            ...newTaskData,
            id: (prevTasks.length + 1).toString(),
            status: TaskStatus.PENDING,
        };
        return [...prevTasks, newTask].sort((a, b) => a.time.localeCompare(b.time));
    });
  }, []);
  
  const handleAddClient = useCallback((newClientData: Omit<Client, 'id'>) => {
    setClients(prevClients => {
        const newClient: Client = {
          ...newClientData,
          id: (prevClients.length + 1).toString(),
        };
        return [newClient, ...prevClients];
    });
    setIsCreateClientModalOpen(false);
  }, []);

  const handleNavigation = useCallback((targetPage: Page) => {
    setPage(targetPage);
    if (targetPage !== 'task-display') {
      setSelectedTask(null);
    }
    if (targetPage !== 'clients') {
      setSelectedClient(null);
    }
     if (targetPage !== 'task-mapping-runner') {
      setClientForMapping(null);
    }
  }, []);

  const handleViewTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setPage('task-display');
  }, []);

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  const handleCloseClientDetail = useCallback(() => {
    setSelectedClient(null);
  }, []);
  
  const handleStartTaskMapping = useCallback((client: Client) => {
    setClientForMapping(client);
    setPage('task-mapping-runner');
    setSelectedClient(null);
  }, []);

  const handleSaveTaskMappingResults = useCallback((clientId: string, results: Record<string, string>) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, taskMappingResults: results }
          : client
      )
    );
  }, []);
  
  const handleOpenProfileModal = useCallback((user: TeamUser) => {
    setSelectedUserForProfile(user);
    setIsProfileModalOpen(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
    setSelectedUserForProfile(null);
  }, []);

  const handleUpdateUser = useCallback((updatedUser: TeamUser) => {
    setTeamUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    handleCloseProfileModal();
  }, [handleCloseProfileModal]);

  const handleViewDocument = useCallback((type: 'pense' | 'tvid' | 'task-media', client: Client) => {
    setViewingDocument({ type, client });
    setSelectedClient(null); // Close detail page when opening document
  }, []);
  
  const handleViewTaskBot = useCallback((client: Client) => {
    setClientForTaskBotModal(client);
    setSelectedClient(null); // Close detail page when opening modal
  }, []);


  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} error={loginError} />;
  }

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <DashboardPage onNavigate={handleNavigation} />;
      case 'clients': return <ClientsPage clients={clients} onSelectClient={handleSelectClient} onOpenCreateClientModal={() => setIsCreateClientModalOpen(true)} />;
      case 'users': return <UsersPage onNavigate={handleNavigation} teamUsers={teamUsers} onOpenProfileModal={handleOpenProfileModal} />;
      case 'create-user': return <CreateUserPage onNavigate={handleNavigation} />;
      case 'task-admin': return <TaskAdminPage />;
      case 'task-talk': return <FlowPage />;
      case 'task-display': return selectedTask ? <TaskDisplayPage task={selectedTask} onClose={() => handleNavigation('dashboard')} /> : <DashboardPage onNavigate={handleNavigation} />;
      case 'task-mapping': return <TaskMappingPage onNavigate={handleNavigation} />;
      case 'task-mapping-runner': return clientForMapping ? <TaskMappingRunnerPage client={clientForMapping} onNavigate={handleNavigation} onSaveResults={handleSaveTaskMappingResults} /> : <ClientsPage clients={clients} onSelectClient={handleSelectClient} onOpenCreateClientModal={() => setIsCreateClientModalOpen(true)} />;
      // FIX: Add a case for 'profile' to render the ProfilePage component.
      case 'profile': return <ProfilePage onNavigate={handleNavigation} />;
      default: return <DashboardPage onNavigate={handleNavigation} />;
    }
  }

  return (
    <>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar currentPage={page} onNavigate={handleNavigation} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col overflow-y-auto ml-64">
          {renderPage()}
        </div>
        {selectedClient && <ClientDetailPage client={selectedClient} onClose={handleCloseClientDetail} onStartTaskMapping={handleStartTaskMapping} onViewDocument={handleViewDocument} onViewTaskBot={handleViewTaskBot} />}
        {viewingDocument?.type === 'pense' && <PenseDocumentPage client={viewingDocument.client} onClose={() => setViewingDocument(null)} />}
        {viewingDocument?.type === 'tvid' && <TvidDocumentPage client={viewingDocument.client} onClose={() => setViewingDocument(null)} />}
        {viewingDocument?.type === 'task-media' && <TaskMediaPage client={viewingDocument.client} onClose={() => setViewingDocument(null)} />}
        <CreateTaskModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleCreateTask}
        />
        {isCreateClientModalOpen && (
            <CreateClientPage 
                onClose={() => setIsCreateClientModalOpen(false)} 
                onAddClient={handleAddClient} 
            />
        )}
         <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={handleCloseProfileModal}
            user={selectedUserForProfile}
            onSave={handleUpdateUser}
        />
        {clientForTaskBotModal && (
            <UtilizeBotModal
                isOpen={true}
                onClose={() => setClientForTaskBotModal(null)}
                client={clientForTaskBotModal}
            />
        )}
      </div>
    </>
  );
};

export default App;