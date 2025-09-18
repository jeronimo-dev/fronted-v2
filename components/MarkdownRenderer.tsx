
import React from 'react';

// This is a simple markdown parser that handles specific patterns.
// It's not a full-fledged markdown library but is tailored for the expected P.E.N.S.E. format.

const themes = {
  dark: {
    containerBg: 'transparent', // The parent container in DunnerPage is already dark
    fontH1: "font-['Cormorant_Garamond',_serif] font-bold text-[32pt] text-[#D4AF37] tracking-[.05em] mt-8 mb-4",
    fontH2: "font-['Montserrat',_sans-serif] font-bold text-xl mt-10 mb-4 text-[#D4AF37] uppercase tracking-wider",
    fontH3: "font-['Montserrat',_sans-serif] font-bold text-lg mt-8 mb-3 text-white",
    fontH4: "font-['Montserrat',_sans-serif] font-semibold text-base mt-6 mb-2 text-gray-300",
    fontP: "font-['Montserrat',_sans-serif] text-[12pt] leading-[1.7] text-white mb-4",
    fontList: "list-disc list-inside space-y-2 font-['Montserrat',_sans-serif] text-[12pt] leading-[1.7] text-white pl-4 mb-4",
    fontBold: "font-bold text-white",
  },
  light: {
    containerBg: '#f8f9fa', // Branco Neve
    fontH1: "font-['Cormorant_Garamond',_serif] font-bold text-[32pt] text-[#001f3f] tracking-[.05em] mt-8 mb-4", // Azul-Marinho
    fontH2: "font-['Cormorant_Garamond',_serif] font-bold text-[24pt] mt-10 mb-4 text-[#001f3f] border-b-2 border-[#b08d57] pb-2", // Azul-Marinho com borda Bronze
    fontH3: "font-['Roboto',_sans-serif] font-bold text-[16pt] mt-8 mb-3 text-[#001f3f]", // Azul-Marinho
    fontH4: "font-['Roboto',_sans-serif] font-semibold text-base mt-6 mb-2 text-[#343a40]", // Cinza Chumbo
    fontP: "font-['Roboto',_sans-serif] text-[12pt] leading-[1.7] text-[#343a40] mb-4", // Cinza Chumbo
    fontList: "list-disc list-inside space-y-2 font-['Roboto',_sans-serif] text-[12pt] leading-[1.7] text-[#343a40] pl-4 mb-4", // Cinza Chumbo
    fontBold: "font-bold text-[#343a40]", // Cinza Chumbo
  }
};

interface MarkdownRendererProps {
  content: string;
  theme?: 'dark' | 'light';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, theme = 'dark' }) => {
    const currentTheme = themes[theme];

    const parseAndRender = (text: string) => {
        // Split by newlines but keep double newlines as paragraph breaks
        const blocks = text.split(/\n\s*\n/);

        return blocks.map((block, index) => {
            // Trim whitespace from the block
            block = block.trim();
            if (!block) return null;

            // Match headings (e.g., #, ##, ###)
            const headingMatch = block.match(/^(#+)\s(.*)/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const content = headingMatch[2];
                switch (level) {
                    case 1: return <h1 key={index} className={currentTheme.fontH1}>{content}</h1>;
                    case 2: return <h2 key={index} className={currentTheme.fontH2}>{content}</h2>;
                    case 3: return <h3 key={index} className={currentTheme.fontH3}>{content}</h3>;
                    default: return <h4 key={index} className={currentTheme.fontH4}>{content}</h4>;
                }
            }

            const renderTextWithBold = (text: string, textClassName: string, boldClassName: string) => {
                const parts = text.split(/(\*\*.*?\*\*)/g);
                return (
                    <>
                        {parts.map((part, i) =>
                            part.startsWith('**') ? (
                                <strong key={i} className={boldClassName}>{part.slice(2, -2)}</strong>
                            ) : (
                                part
                            )
                        )}
                    </>
                );
            };

            // Match unordered list items (e.g., * or -)
            if (block.startsWith('* ') || block.startsWith('- ')) {
                const listItems = block.split('\n').map(item => item.replace(/^[\*\-]\s*/, '').trim());
                return (
                    <ul key={index} className={currentTheme.fontList}>
                        {listItems.map((item, itemIndex) => 
                            <li key={itemIndex}>
                                {renderTextWithBold(item, '', currentTheme.fontBold)}
                            </li>
                        )}
                    </ul>
                );
            }
            
            // Match ordered list items (e.g., 1.)
            if (/^\d+\.\s/.test(block)) {
                 const listItems = block.split('\n').map(item => item.replace(/^\d+\.\s*/, '').trim());
                 return (
                    <ol key={index} className={currentTheme.fontList.replace('list-disc', 'list-decimal')}>
                        {listItems.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                    </ol>
                 );
            }

            // Default to paragraph
            return <p key={index} className={currentTheme.fontP}>
                {renderTextWithBold(block, '', currentTheme.fontBold)}
            </p>;
        });
    };

    return (
        <div style={{ backgroundColor: currentTheme.containerBg }} className="h-full">
            <div className="p-8 md:p-16 max-w-full w-full">
                {parseAndRender(content)}
            </div>
        </div>
    );
};
