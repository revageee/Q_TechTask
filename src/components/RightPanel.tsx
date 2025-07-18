import React, {useState, useRef} from "react";
import {typographyStyle} from '@/styles/typography';
import {PanelHeader} from './PanelHeader';

type FileItem = {
    name: string;
    format?: string;
    active?: boolean;
};

type Column = {
    title: string;
    items: FileItem[];
};

type RightPanelProps = {
    title?: string;
    columns: Column[];
    bottomText: string;
};

export const RightPanel: React.FC<RightPanelProps> = ({title, columns, bottomText}) => {
    // Состояния активного элемента для каждой колонки
    const [activeIdx, setActiveIdx] = useState<[number, number, number]>([0, 0, 0]);
    const [activeCol, setActiveCol] = useState(0); // активная колонка
    const listRefs = [useRef<HTMLUListElement>(null), useRef<HTMLUListElement>(null), useRef<HTMLUListElement>(null)];

    const handleItemClick = (col: number, idx: number) => {
        setActiveCol(col);
        setActiveIdx(prev => prev.map((v, i) => (i === col ? idx : v)) as [number, number, number]);
    };
    const handleHeaderClick = () => alert('C: header clicked');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveIdx(prev => prev.map((v, i) => i === activeCol ? (v + 1) % columns[i].items.length : v) as [number, number, number]);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setActiveIdx(prev => prev.map((v, i) => i === activeCol ? (v - 1 + columns[i].items.length) % columns[i].items.length : v) as [number, number, number]);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            setActiveCol(col => (col - 1 + 3) % 3);
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            setActiveCol(col => (col + 1) % 3);
            e.preventDefault();
        }
    };

    return (
        <section
            className="flex flex-col h-full flex-1 font-dos mx-[4px]"
            style={{
                background: '#0000AA',
                borderLeft: '4px solid #55FFFF',
                borderBottom: '4px solid #55FFFF',
                borderRight: '4px solid #55FFFF',
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <PanelHeader label="C:\" onClick={handleHeaderClick}/>
            <div
                className="flex flex-col m-1 mt-0 h-full border-r-4 border-[#55FFFF] border-b-2 border-l-2"
            >
                <div className="flex flex-row w-full h-full items-stretch" style={{marginTop: 0}}>
                    {[0, 1, 2].map(col => (
                        <React.Fragment key={col}>
                            <div className="flex-1 text-center font-bold flex flex-col h-full">
                                <div style={{
                                    color: '#FFFF55',
                                    fontWeight: 400,
                                    fontSize: 32,
                                    background: 'transparent',
                                    padding: '2px 0',
                                    fontFamily: 'ModernDOS8x16',
                                    lineHeight: '100%',
                                    letterSpacing: 0,
                                    textAlign: 'center',
                                }}>{columns[col].title}</div>
                                <ul className="flex-1 h-full space-y-0.5"
                                    ref={listRefs[col]}
                                    tabIndex={-1}
                                >
                                    {columns[col].items.map((item, i) => (
                                        <li key={item.name} style={{width: '100%', padding: 8}}>
                                            <button
                                                style={{
                                                    color: activeIdx[col] === i && activeCol === col ? '#000' : '#00FFFF',
                                                    background: activeIdx[col] === i && activeCol === col ? '#55FFFF' : 'transparent',
                                                    fontWeight: 400,
                                                    fontSize: 32,
                                                    fontFamily: 'ModernDOS8x16',
                                                    lineHeight: '100%',
                                                    letterSpacing: 0,
                                                    width: '100%',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                                onClick={() => handleItemClick(col, i)}
                                                tabIndex={-1}
                                                aria-selected={activeIdx[col] === i && activeCol === col}
                                            >
                                                <span>{item.name}</span>
                                                {item.format && <span className="text-xs" style={{
                                                    color: activeIdx[col] === i && activeCol === col ? '#000' : '#00FFFF',
                                                    fontFamily: 'ModernDOS8x16',
                                                    fontWeight: 400,
                                                    fontSize: 32,
                                                    lineHeight: '100%',
                                                    letterSpacing: 0
                                                }}>{item.format}</span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {col < 2 && <div style={{width: 4, background: '#55FFFF', minHeight: '100%'}}/>}
                        </React.Fragment>
                    ))}
                </div>
                <div
                    className="p-2 text-xs"
                    style={{
                        borderTop: '2px solid #55FFFF',
                        color: '#55FFFF',
                        background: 'transparent',
                        fontFamily: 'ModernDOS8x16',
                        fontWeight: 400,
                        fontSize: 32,
                        lineHeight: '100%',
                        letterSpacing: 0,
                    }}
                >
                    {bottomText}
                </div>
            </div>
        </section>
    );
}; 