

import React from 'react';
import { Page } from '../types';
import { BackButton } from '../components/BackButton';

const taskMappingData = {
  "id": "kp2t4aujc49brn8r8px3fpvd",
  "name": "Task Mapping v3.0 - A Imersão Estratégica",
  "groups": [
    { "id": "group-modulo0", "title": "Módulo 0: O Alinhamento", "blocks": [
        { "id": "block-intro-1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Olá, Leandro. Bem-vindo(a) à Sessão de Imersão Estratégica da Taskdun. Nos próximos momentos, não vamos falar sobre marketing. Vamos falar sobre pessoas, dores e transformações." }] }] } },
        { "id": "block-intro-2", "type": "Wait", "options": { "secondsToWaitFor": "2" } },
        { "id": "block-intro-3", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "O que faremos aqui é a diferença entre criar um anúncio e construir uma lenda. Meu papel é ser seu copiloto, mas quem pilota é você." }] }] } },
        { "id": "block-intro-4", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Lembre-se desta regra de ouro, ensinada pelas maiores mentes dos negócios: as pessoas não compram o que você faz, elas compram o porquê você faz. Nossa missão hoje é encontrar esse 'porquê'. Pronto(a) para começar?" }] }] } },
        { "id": "block-intro-botao", "type": "choice input", "items": [{ "id": "item-estou-pronto", "content": "Estou pronto!" }] }
    ]},
    { "id": "group-modulo1", "title": "Módulo 1: O DNA do Cliente Final", "blocks": [
        { "id": "block-mod1-texto1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Excelente. O primeiro passo é entender a história de origem. Todo grande negócio nasce de uma frustração pessoal, de um problema que o fundador resolveu para si mesmo antes de resolver para os outros. Precisamos encontrar essa história." }] }] } },
        { "id": "block-mod1-texto2", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Pense no seu cliente. Antes de ele ser um 'empresário', ele era uma pessoa com um problema. Qual era a dor, a pedra no sapato dele que o fez dizer: 'Chega! Alguém precisa resolver isso'?" }] }] } },
        { "id": "block-mod1-input1", "type": "text input", "options": { "labels": { "placeholder": "Descreva a frustração original...", "button": "Continuar" } } },
        { "id": "block-mod1-texto3", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Entendido. Agora, vamos transformar essa frustração em uma visão. Quando ele decidiu criar o negócio, qual era a imagem de futuro que ele tinha em mente? Que mundo ele queria criar? Qual era a transformação que ele, pessoalmente, buscava?" }] }] } },
        { "id": "block-mod1-input2", "type": "text input", "options": { "labels": { "placeholder": "Descreva a visão/transformação...", "button": "Continuar" } } }
    ]},
    { "id": "group-modulo2", "title": "Módulo 2: O Campo de Batalha", "blocks": [
        { "id": "block-mod2-texto1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Perfeito. Agora conhecemos a alma do negócio. Vamos entender o mundo em que ele vive. Quem são os concorrentes que tiram o sono do seu cliente? O que eles prometem?" }] }] } },
        { "id": "block-mod2-texto2", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Agora, a pergunta mais importante sobre eles: Onde eles falham? Qual é a promessa que eles fazem, mas não cumprem? Qual é a 'jabuticaba' que todos no mercado oferecem, mas que, secretamente, nenhum cliente gosta?" }] }] } },
        { "id": "block-mod2-input", "type": "text input", "options": { "labels": { "placeholder": "Descreva a falha do mercado...", "button": "Continuar" } } }
    ]},
    { "id": "group-modulo3", "title": "Módulo 3: A 'Bala de Prata'", "blocks": [
        { "id": "block-mod3-texto1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Fantástico. Sabemos a dor do fundador e a falha do mercado. Agora, vamos conectar os dois e criar a nossa arma secreta. Vamos articular o E.E.D." }] }] } },
        { "id": "block-mod3-texto2", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Se o seu cliente pudesse ter um outdoor mágico que falasse diretamente à sua audiência ideal, o que estaria escrito nele? Qual é a única e grande promessa que só ele pode fazer e cumprir, e que torna todos os concorrentes instantaneamente obsoletos?" }] }] } },
        { "id": "block-mod3-input1", "type": "text input", "options": { "labels": { "placeholder": "Escreva a grande promessa...", "button": "Continuar" } } },
        { "id": "block-mod3-texto3", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Isso é potente. Agora, vamos tornar isso crível. Qual é o mecanismo, o processo único ou a 'magia técnica' que permite que seu cliente entregue essa promessa de forma consistente?" }] }] } },
        { "id": "block-mod3-input2", "type": "text input", "options": { "labels": { "placeholder": "Descreva o mecanismo único...", "button": "Continuar" } } }
    ]},
    { "id": "group-modulo4", "title": "Módulo 4: A Prova Final", "blocks": [
        { "id": "block-mod4-texto1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Estamos na reta final, e o que construímos é poderoso. Mas precisamos torná-lo à prova de balas. Vamos pensar como um advogado do diabo." }] }] } },
        { "id": "block-mod4-texto2", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Qual é o maior medo, a maior dúvida ou a objeção mais cínica que um cliente teria ao ouvir essa promessa, por mais incrível que ela pareça? O que o faria pensar 'Isso é bom demais para ser verdade'?" }] }] } },
        { "id": "block-mod4-input", "type": "text input", "options": { "labels": { "placeholder": "Descreva a maior objeção...", "button": "Continuar" } } }
    ]},
    { "id": "group-modulo5", "title": "Módulo 5: Finalização", "blocks": [
        { "id": "block-mod5-delay", "type": "Wait", "options": { "secondsToWaitFor": "2" } },
        { "id": "block-mod5-texto1", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Missão cumprida, Leandro. Você não apenas me deu informações. Você conduziu uma profunda sessão de arqueologia estratégica e desenterrou o verdadeiro tesouro do seu cliente." }] }] } },
        { "id": "block-mod5-texto2", "type": "text", "content": { "richText": [{ "type": "p", "children": [{ "text": "Agora, com essa matéria-prima de valor inestimável, vou me reunir com o meu time de especialistas. O Dunner irá forjar o P.E.N.S.E. e o manifesto da marca. O Taskelangelo começará a rascunhar o universo visual. E eu, Fluxen, já estou aprendendo com esta nossa conversa para me tornar ainda melhor. Você deu início a uma revolução." }] }] } },
        { "id": "block-mod5-botao", "type": "choice input", "items": [{ "id": "item-pronta-revolucao", "content": "ESTOU PRONTO PARA A REVOLUÇÃO!" }] }
    ]}
  ]
};

const TextBlock: React.FC<{ content: any }> = ({ content }) => {
    const text = content?.richText?.[0]?.children?.[0]?.text ?? '';
    return (
        <div className="flex items-start gap-3">
            <img src="https://taskdun.com.br/wp-content/uploads/2025/07/FLUXEN_PROFILE.png" className="w-10 h-10 rounded-full border-2 border-[var(--c-accent-focus)] flex-shrink-0" alt="Fluxen Avatar" />
            <div className="bg-[var(--c-bg-sidebar)] text-white p-3 rounded-lg rounded-tl-none shadow-md max-w-lg">
                <p className="text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    );
};

const InputBlock: React.FC<{ options: any }> = ({ options }) => {
    const placeholder = options?.labels?.placeholder ?? 'Digite aqui...';
    return (
        <div className="flex justify-end">
            <div className="w-full max-w-md bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-lg p-3 text-right text-[var(--c-text-secondary)] italic">
                {placeholder}
            </div>
        </div>
    );
};

const ChoiceBlock: React.FC<{ items: any[] }> = ({ items }) => (
    <div className="flex justify-end">
        <div className="flex flex-col items-end gap-2">
            {items.map(item => (
                <button key={item.id} className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80 transition-opacity">
                    {item.content}
                </button>
            ))}
        </div>
    </div>
);

const WaitBlock: React.FC<{ options: any }> = ({ options }) => (
    <div className="flex justify-center items-center gap-2 text-[var(--c-text-secondary)] italic my-4">
        <span className="material-icons animate-spin" style={{ animationDuration: '2s' }}>hourglass_empty</span>
        Aguardando {options.secondsToWaitFor} segundos...
    </div>
);

const blockComponents: { [key: string]: React.FC<any> } = {
  text: TextBlock,
  'text input': InputBlock,
  'choice input': ChoiceBlock,
  Wait: WaitBlock,
};

export default function TaskMappingPage({ onNavigate }: { onNavigate: (page: Page) => void; }) {
    return (
        <main className="flex-1 p-8 text-[var(--c-text-main)] overflow-y-auto custom-scrollbar">
            <header className="flex justify-between items-center mb-8 sticky top-0 bg-[var(--c-bg-body)] py-4 z-10">
                <BackButton onClick={() => onNavigate('task-ia')} />
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider font-neue-machina text-center">{taskMappingData.name}</h1>
                <div className="w-24"></div> {/* Spacer to balance BackButton */}
            </header>
            <div className="max-w-4xl mx-auto bg-[var(--c-bg-card)] p-6 md:p-8 rounded-xl border border-[var(--c-border-color)]">
                {taskMappingData.groups.map((group, groupIndex) => (
                    <div key={group.id} className={`mb-12 last:mb-0 ${groupIndex > 0 ? 'border-t border-dashed border-[var(--c-border-color)] pt-12' : ''}`}>
                        <h2 className="text-xl font-semibold text-[var(--c-accent-dunner)] mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="material-icons-outlined">adjust</span>
                            {group.title}
                        </h2>
                        <div className="space-y-6">
                            {group.blocks.map(block => {
                                const BlockComponent = blockComponents[block.type];
                                return BlockComponent ? <BlockComponent key={block.id} {...block} /> : null;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
