import React from 'react';

const colors = {
    primary: '#2E4636',      // Verde Musgo Profundo
    support: '#F4F1E8',      // Bege Areia
    accent: '#D87D4A',       // Laranja Queimado
    text: '#333333',         // Cinza Grafite
    footerText: '#5F6368'
};

const fonts = {
    title: "'PT Serif', serif",
    body: "'Lato', sans-serif",
};

const DocumentPage: React.FC<{ children: React.ReactNode, isCover?: boolean, pageNumber?: number }> = ({ children, isCover = false, pageNumber }) => (
    <div
        className="shadow-lg mb-4 mx-auto w-full max-w-[21cm] p-12 flex flex-col relative"
        style={{ backgroundColor: colors.support, color: colors.text, fontFamily: fonts.body, aspectRatio: '210 / 297' }}
    >
        <div className="flex-grow w-full">
            {children}
        </div>
        {!isCover && (
            <footer
                className="absolute bottom-10 left-0 right-0 px-12 flex justify-between items-center"
                style={{ fontFamily: fonts.body, fontSize: '9pt', color: colors.footerText }}
            >
                <span>IMOBILIÁRIA ALMEIDA | ONDE O INVESTIMENTO ENCONTRA A PAZ</span>
                <span>{pageNumber}</span>
            </footer>
        )}
    </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>
        <h2 style={{ fontFamily: fonts.title, color: colors.primary, fontSize: '24pt' }}>
            {children}
        </h2>
        <hr style={{ borderTop: `1px solid ${colors.accent}`, margin: '1rem 0' }} />
    </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 style={{ fontFamily: fonts.body, fontWeight: 'bold', color: colors.primary, fontSize: '16pt', marginTop: '2rem', marginBottom: '1rem' }}>
        {children}
    </h3>
);

// FIX: Changed BodyText to render children directly instead of using dangerouslySetInnerHTML, which is safer and correct for JSX children.
const BodyText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p style={{ fontSize: '12pt', lineHeight: 1.7 }}>{children}</p>
);

const WireframeCard: React.FC<{ headline: string, image: string, isCta?: boolean, ctaText?: string }> = ({ headline, image, isCta = false, ctaText }) => (
    <div className="text-center space-y-4">
        <div className="bg-white border-2 border-gray-200 aspect-[4/5] p-6 flex flex-col items-center justify-between rounded-lg shadow-md">
            <h4 style={{ fontFamily: fonts.title, color: colors.primary }} className="text-xl">{headline}</h4>
            <div className="flex-grow flex items-center justify-center">
                <p style={{ color: colors.footerText, border: '2px dashed #ccc', padding: '2rem', borderRadius: '8px' }}>
                    {image}
                </p>
            </div>
        </div>
        {isCta && (
            <button
                className="w-full"
                style={{
                    backgroundColor: colors.accent,
                    color: colors.support,
                    fontFamily: fonts.body,
                    fontWeight: 'bold',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: 'none',
                    textTransform: 'uppercase'
                }}
            >
                {ctaText}
            </button>
        )}
    </div>
);

const PromptBlock: React.FC<{ content: string }> = ({ content }) => (
    <pre className="bg-gray-800 text-white p-6 rounded-lg text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto custom-scrollbar">
        <code>{content.trim()}</code>
    </pre>
);


export const TaskelangeloDocument: React.FC = () => {
    const builderPrompt = `
**PROMPT PARA O BUILDER:**

**Objetivo:** Gerar um documento PDF premium e elegante (Task Visual ID) para a Imobiliária Almeida, com base na identidade visual "Luxo Rústico e Confiável".

**1. Configuração Global:**
- **Formato:** A4, orientação vertical.
- **Estilo Geral:** Sofisticado, orgânico, confiável. Estética de uma revista de arquitetura de luxo (ex: Architectural Digest) com foco em casas de campo.
- **Fundo:** #F4F1E8 (Bege Areia).

**2. Layout e Grade:**
- **Grade:** 12 colunas.
- **Margens:** Generosas (3cm) para uma sensação de espaço e calma.

**3. Paleta de Cores:**
- **Texto Principal:** #333333 (Cinza Grafite).
- **Títulos (H1, H2):** #2E4636 (Verde Musgo Profundo).
- **Acentos (Ícones, Linhas):** #D87D4A (Laranja Queimado).

**4. Hierarquia Tipográfica:**
- **Fonte para Títulos:** 'PT Serif' (importar do Google Fonts).
- **Fonte para Corpo:** 'Lato' (importar do Google Fonts).
- **H1 (Título do Documento na capa):** PT Serif Bold, 50pt, cor #2E4636.
- **H2 (Títulos de Parte):** PT Serif Bold, 28pt, cor #2E4636.
- **H3 (Títulos de Seção):** Lato Bold, 16pt, cor #2E4636.
- **Corpo de Texto:** Lato Regular, 12pt, entrelinha 1.7.

**5. Estrutura e Conteúdo:**
- **Capa:** Fundo Bege Areia. Logo da Imobiliária Almeida no topo. Título e subtítulo centralizados. Créditos no rodapé.
- **Seções Internas:** Aplicar a hierarquia de cores e tipografia definida.
- **Na seção da Paleta de Cores:** Apresentar as cores como círculos sólidos, com os códigos hexadecimais abaixo.
- **Na seção dos Cards:** Criar 4 wireframes que priorizem a imagem, mostrando o layout e a aplicação das fontes e cores.
- **Rodapé:** Incluir "Imobiliária Almeida | Onde o Investimento Encontra a Paz" e a numeração de página, em Lato, 9pt.
    `;
    return (
        <div className="bg-transparent">
            {/* Cover Page */}
            <DocumentPage isCover={true}>
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h1 style={{ fontFamily: fonts.title, color: colors.primary, fontSize: '50pt' }}>
                        Task Visual ID
                    </h1>
                    <p style={{ fontFamily: fonts.body, color: colors.primary, fontSize: '20pt', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem' }}>
                        Imobiliária Almeida
                    </p>
                    <hr style={{ borderTop: `2px solid ${colors.accent}`, width: '100px', margin: '2rem 0' }} />
                    <p style={{ fontFamily: fonts.body, fontSize: '11pt', color: colors.footerText }}>
                        Missão "Onde o Investimento Encontra a Paz"
                    </p>
                </div>
            </DocumentPage>

            {/* Content Page 1 */}
            <DocumentPage pageNumber={1}>
                <SectionHeading>Parte I: A Fundação Visual</SectionHeading>
                <SubHeading>1.1. Manifesto Visual (A Estética do Refúgio Inteligente)</SubHeading>
                <BodyText>
                    Nossa identidade visual deve ser um escape do caos digital e da frieza corporativa. Ela precisa ter a textura da madeira, o cheiro da terra molhada e a solidez da pedra. Cada elemento deve comunicar <strong>tradição, durabilidade e uma conexão profunda com a natureza</strong>. Não estamos vendendo modernidade; estamos vendendo <strong>permanência</strong>. A estética deve ser a de uma revista de arquitetura de luxo para casas de campo, não a de um portal imobiliário. O usuário deve sentir, ao entrar em nosso site, o mesmo alívio que sentiria ao chegar em seu refúgio na sexta-feira à noite.
                </BodyText>
                
                <SubHeading>1.2. Arquétipos Visuais: O Explorador + O Sábio</SubHeading>
                {/* FIX: Refactored to use valid HTML structure (ul cannot be inside p). This also fixes the 'class' vs 'className' error. */}
                <BodyText>
                    A persona da Imobiliária Almeida é a de um guia experiente, um curador sábio.
                </BodyText>
                <ul className="list-disc list-inside my-4 space-y-2" style={{ fontSize: '12pt', lineHeight: 1.7 }}>
                    <li><strong>O Explorador:</strong> Aquele que desbrava o mercado e encontra os "tesouros escondidos", as propriedades com alma.</li>
                    <li><strong>O Sábio:</strong> Aquele que, com 30 anos de experiência, valida o tesouro, garantindo sua segurança e seu valor.</li>
                </ul>
                <BodyText>
                    Nossa estética é a da <strong>aventura segura, da descoberta confiável</strong>.
                </BodyText>
                
                <SubHeading>1.3. A Paleta da Terra e do Fogo</SubHeading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-4">
                    {[
                        { color: '#2E4636', name: "Verde Musgo Profundo" }, 
                        { color: '#F4F1E8', name: "Bege Areia" }, 
                        { color: '#D87D4A', name: "Laranja Queimado" }, 
                        { color: '#333333', name: "Cinza Grafite" }
                    ].map(c => (
                        <div key={c.name}>
                            <div className="w-24 h-24 rounded-full mx-auto mb-2 shadow-inner" style={{ backgroundColor: c.color, border: c.color === colors.support ? '1px solid #ddd' : '' }}></div>
                            <p style={{ fontFamily: fonts.body, fontWeight: 'bold' }}>{c.name}</p>
                            <p className="text-sm" style={{ color: colors.footerText }}>{c.color}</p>
                        </div>
                    ))}
                </div>

                <SubHeading>1.4. A Tipografia da Tradição e da Clareza</SubHeading>
                 <div className="space-y-6">
                    <div>
                        <p className="font-bold" style={{ color: colors.footerText, fontFamily: fonts.body }}>Fonte de Autoridade (Títulos)</p>
                        <p style={{ fontFamily: fonts.title, fontSize: '28pt', color: colors.primary }}>PT Serif</p>
                        <BodyText>Uma serifa robusta, com raízes na tradição, mas projetada para uma excelente legibilidade na tela. É a voz do Sábio, confiável e atemporal.</BodyText>
                    </div>
                     <div>
                        <p className="font-bold" style={{ color: colors.footerText, fontFamily: fonts.body }}>Fonte de Clareza (Corpo e UI)</p>
                        <p style={{ fontFamily: fonts.body, fontSize: '28pt', color: colors.primary }}>Lato</p>
                        <BodyText>Uma sans-serif humanista, com cantos arredondados que a tornam amigável e acolhedora. É a voz clara e direta do Explorador.</BodyText>
                    </div>
                </div>
            </DocumentPage>
            
            {/* Content Page 2 */}
            <DocumentPage pageNumber={2}>
                 <SectionHeading>Parte II: O Kit de Execução Visual</SectionHeading>
                 <SubHeading>2.1. Roteiro Visual - "A Dupla Rentabilidade"</SubHeading>
                 <BodyText>
                    A cena na varanda é perfeita. Deve ser filmada ao amanhecer ou ao entardecer, para capturar a "luz dourada" que evoca nostalgia e serenidade. O figurino do Paulo deve ser "luxo casual": uma camisa de linho, sem gravata. A cinematografia deve usar planos abertos para mostrar a grandiosidade da natureza e closes para capturar a sinceridade e a confiança em seu olhar.
                 </BodyText>
                 
                 <SubHeading>2.2. Composição dos CARDS para Redes Sociais</SubHeading>
                 <BodyText>
                    Estilo Geral: Designs que valorizem a fotografia. A imagem deve ocupar a maior parte do espaço, com a headline sobreposta de forma elegante.
                 </BodyText>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <WireframeCard headline="O Investimento que te Abraça" image="[Fotografia de alta qualidade de uma fachada de casa de campo]" />
                    <WireframeCard headline="Rentabilidade + Tranquilidade" image="[Imagem de tela dividida: gráfico de rentabilidade / paisagem serena]" />
                    <WireframeCard headline="Mais que um imóvel, um legado." image="[Foto de família em frente a uma propriedade]" />
                    <WireframeCard headline="Seu Refúgio te Espera" image="[Imagem convidativa de uma varanda com vista]" isCta={true} ctaText="SAIBA MAIS" />
                 </div>
            </DocumentPage>

            {/* Content Page 3 */}
            <DocumentPage pageNumber={3}>
                <SectionHeading>Prompt Final para o Husbóndi (Builder)</SectionHeading>
                <PromptBlock content={builderPrompt} />
            </DocumentPage>
        </div>
    );
};