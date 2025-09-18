import React, { useState, useEffect } from 'react';
import { Client, Page } from '../types';

const screens = [
    {
        type: 'intro',
        title: 'Olá Taskdunner!',
        content: `O onboarding da metodologia Taskdun é feito pela ferramenta Task Mapping. Uma forma simples, eficaz e capaz de gerar, além de resultados, melhora no relacionamento com seu cliente.\n\nNos próximos momentos, vamos falar sobre pessoas, dores e transformações. O que faremos aqui é a diferença entre criar um anúncio e construir uma lenda. Pronto(a)?`,
    },
    {
        type: 'input',
        title: 'História de Origem',
        content: `Excelente! O primeiro passo é entender a história de origem do negócio e sua razão de existir.`,
        question: `Qual o nome, a marca que o cliente utiliza, ou como ele é conhecido. Peça para seu cliente contar um pouco sobre a história do negócio de forma resumida e a razão pela qual ele decidiu abrir um negócio nesse ramo, que problema queria resolver (dor).`,
        variable: 'historia_negocio',
    },
    {
        type: 'input',
        title: 'Visão de Futuro',
        content: `Entendido. Agora reflita sobre o que acabamos de falar, ou seja, sobre a história do seu negócio e me diga:`,
        question: `Onde você quer que seu negócio chegue olhando para o futuro. Qual seu sonho grande quando falamos do seu negócio (aqui você pode mencionar o nome, a marca, o produto, etc).`,
        variable: 'sonho_grande',
    },
    {
        type: 'input',
        title: 'Cenário do Mercado',
        content: `Perfeito. Agora, sobre o mercado.`,
        question: `O que você acha que os clientes estão fartos de escutar no seu mercado, mas a maioria dos negócios continua perpetuando como uma prática, mas que acaba afastando o cliente ou fazendo com que ele fique desconfiado.`,
        variable: 'falha_mercado_percepcao',
    },
    {
        type: 'input',
        title: 'O Alvo Ideal',
        content: `Fantástico. Agora temos clareza sobre o propósito e o campo de batalha. Mas uma estratégia sem um alvo claro é como um navio sem leme. Antes de construirmos sua 'bala de prata', precisamos calibrar sua mira.`,
        question: `Pense no seu cliente IDEAL. Se você só pudesse fazer uma única pergunta para identificar essa pessoa em meio a uma multidão, qual seria essa pergunta?`,
        variable: 'pergunta_cliente_ideal',
    },
    {
        type: 'input',
        title: 'Barreiras da Decisão',
        content: `Agora, pense nos clientes que quase compraram, mas desistiram.`,
        question: `Quais foram as 2 ou 3 maiores barreiras que os impediram (preço, complexidade, confiança)?`,
        variable: 'barreiras_decisao',
    },
    {
        type: 'input',
        title: 'Sinais de Compra',
        content: `Por outro lado, quais são os 2 ou 3 sinais claros que indicam que um lead está pronto para comprar?`,
        question: `(Ex: perguntas que ele faz, problemas que descreve).`,
        variable: 'sinais_compra',
    },
    {
        type: 'input',
        title: 'A Grande Promessa',
        content: `Excelente. Agora, a grande promessa.`,
        question: `Se seu cliente tivesse um outdoor mágico, o que estaria escrito nele que tornaria os concorrentes obsoletos?`,
        variable: 'promessa_outdoor',
    },
    {
        type: 'input',
        title: 'A Prova da Promessa',
        content: `Isso é potente. Agora, a prova.`,
        question: `Qual é o mecanismo ou 'magia técnica' que torna essa promessa uma realidade consistente?`,
        variable: 'mecanismo_promessa',
    },
    {
        type: 'input',
        title: 'Medindo o Sucesso',
        content: `E como você mede o sucesso deste mecanismo?`,
        question: `Qual é o KPI (indicador chave) que prova que ele está funcionando? Como o seu cliente mede o resultado que você entrega?`,
        variable: 'kpi_sucesso',
    },
    {
        type: 'input',
        title: 'Advogado do Diabo',
        content: `Estamos na reta final. Agora, pense como um advogado do diabo.`,
        question: `Qual é a maior objeção ou dúvida que um cliente teria ao ouvir sua promessa?`,
        variable: 'maior_objecao',
    },
    {
        type: 'outro',
        title: 'Missão Cumprida!',
        content: `Você desenterrou o verdadeiro tesouro do seu cliente. Esta matéria-prima de valor inestimável será agora entregue ao nosso time de especialistas para forjar seu P.E.N.S.E. Você deu início a uma revolução.`,
    },
];

interface TaskMappingRunnerPageProps {
    client: Client;
    onNavigate: (page: Page) => void;
    onSaveResults: (clientId: string, results: Record<string, string>) => void;
}

export const TaskMappingRunnerPage: React.FC<TaskMappingRunnerPageProps> = ({ client, onNavigate, onSaveResults }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>(client.taskMappingResults || {});
    const [inputValue, setInputValue] = useState('');

    const screen = screens[currentScreen];

    useEffect(() => {
        if (screen.type === 'input') {
            setInputValue(answers[screen.variable] || '');
        } else {
            setInputValue('');
        }
    }, [currentScreen, screen, answers]);


    const handleNext = () => {
        let currentAnswers = answers;
        if (screen.type === 'input') {
            if (!inputValue.trim()) { 
                alert("Por favor, preencha o campo para continuar.");
                return; 
            }
            currentAnswers = { ...answers, [screen.variable]: inputValue };
            setAnswers(currentAnswers);
        }

        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            onSaveResults(client.id, currentAnswers);
            onNavigate('clients');
        }
    };
    
    const handleBack = () => {
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleIntroChoice = (choice: 'yes' | 'no') => {
        if (choice === 'yes') {
            setCurrentScreen(currentScreen + 1);
        } else {
            onNavigate('clients');
        }
    };
    
    const progress = (currentScreen / (screens.length -1)) * 100;

    return (
        <div className="fixed inset-0 bg-[var(--c-bg-body)] z-50 flex flex-col font-inter">
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[var(--c-border-color)]">
                 <h2 className="text-xl font-bold text-white font-neue-machina">Task Mapping</h2>
                 <p className="text-sm text-[var(--c-text-secondary)]">Cliente: {client.name}</p>
                 <button onClick={() => onNavigate('clients')} className="text-gray-400 hover:text-white">
                     <span className="material-icons text-3xl">close</span>
                 </button>
            </header>

             <div className="w-full bg-[var(--c-bg-card)]">
                <div className="bg-[var(--c-accent-action)] h-1" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>

            <main className="flex-1 flex flex-col justify-center items-center text-center p-8 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-3xl animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">{screen.title.replace('{clientName}', client.manager)}</h1>
                    <p className="text-lg text-gray-300 whitespace-pre-line mb-8">{screen.content}</p>
                    
                    {screen.type === 'input' && (
                        <>
                             <p className="text-lg font-semibold text-white mb-4">{screen.question}</p>
                             <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full h-40 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] resize-none"
                                placeholder="Sua resposta..."
                            />
                        </>
                    )}
                </div>
            </main>

            <footer className="flex-shrink-0 p-6 flex justify-between items-center w-full max-w-3xl mx-auto">
                {currentScreen > 0 ? (
                     <button onClick={handleBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center space-x-2">
                        <span className="material-icons">arrow_back</span>
                        <span>Voltar</span>
                     </button>
                ) : <div></div>}
                
                {screen.type === 'intro' ? (
                     <div className="flex gap-4">
                        <button onClick={() => handleIntroChoice('no')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">NAO</button>
                        <button onClick={() => handleIntroChoice('yes')} className="bg-[var(--c-accent-action)] text-black font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-opacity">SIM</button>
                    </div>
                ) : screen.type === 'outro' ? (
                     <button onClick={handleNext} className="bg-[var(--c-accent-action)] text-black font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-opacity">Finalizar</button>
                ) : (
                    <button onClick={handleNext} className="bg-[var(--c-accent-action)] text-black font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-opacity flex items-center space-x-2">
                         <span>Avançar</span>
                         <span className="material-icons">arrow_forward</span>
                    </button>
                )}
            </footer>
        </div>
    );
};
