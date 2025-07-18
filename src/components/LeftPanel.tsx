import React, {useState, useRef} from "react";
import { typographyStyle } from '@/styles/typography';
import { PanelHeader } from './PanelHeader';

type LeftPanelProps = {
    title?: string;
    items?: string[];
    bottomText: string;
};

const leftPanelItems = ["DOS", "TOOLS", "XTGOLD", "LAPLINK", "DN"];

export const LeftPanel: React.FC<LeftPanelProps> = ({title, bottomText}) => {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const listRef = useRef<HTMLUListElement>(null);

    const handleItemClick = (idx: number) => setActiveIdx(idx);
    const handleHeaderClick = () => alert('TREE header clicked');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveIdx(idx => (idx + 1) % leftPanelItems.length);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setActiveIdx(idx => (idx - 1 + leftPanelItems.length) % leftPanelItems.length);
            e.preventDefault();
        }
    };

    return (
        <aside
            className="flex flex-col h-full bg-[#0000AA] border-r-4 border-[#55FFFF] border-b-4 border-l-4"
            style={{position: 'relative'}}
        >
            {/* Жёлтый квадрат с символом \, поверх дерева */}
            <PanelHeader label="TREE" onClick={handleHeaderClick} />
            <div
                className="flex flex-col m-1 mt-0 h-full border-r-4 border-[#55FFFF] border-b-2 border-l-2"
            >
                <div style={{
                    position: 'absolute',
                    left: 12,
                    top: 32,
                    width: 48,
                    height: 32,
                    background: '#55FFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxSizing: 'border-box',
                }}>
                <span style={{
                    color: '#FFFF55',
                    fontFamily: 'ModernDOS8x16',
                    fontWeight: 400,
                    fontSize: 40,
                    lineHeight: '100%',
                    letterSpacing: 0,
                    userSelect: 'none',
                }}>{'\\'}</span>
                </div>
                <ul
                    className="flex flex-col items-start"
                    style={{
                        padding: '0px 8px',
                        fontFamily: 'ModernDOS8x16',
                        fontWeight: 400,
                        fontSize: 32,
                        lineHeight: '100%',
                        letterSpacing: 0,
                        alignSelf: 'stretch',
                        flexGrow: 1,
                        position: 'relative',
                        top: 30,
                        left: 10,
                    }}
                    ref={listRef}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {leftPanelItems.map((item, idx) => (
                        <li key={idx} style={{
                            width: '99%',
                            display: 'flex',
                            position: 'relative',
                            height: 48
                        }}>
                            {/* Вертикальная линия слева */}
                            <div style={{
                                width: 32,
                                height: idx === leftPanelItems.length - 1 ? 28 : 48,
                                borderLeft: '4px solid #55FFFF',
                                marginRight: 8,
                                marginLeft: 8,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                                {/* Горизонтальная линия к элементу */}
                                <div style={{
                                    width: 24,
                                    height: 0,
                                    borderTop: '4px solid #55FFFF',
                                    position: 'absolute',
                                    left: 0,
                                    top: 24,
                                }}/>
                            </div>
                            <button
                                style={{
                                    color: activeIdx === idx ? '#000' : '#00FFFF',
                                    background: activeIdx === idx ? '#55FFFF' : 'transparent',
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
                                }}
                                onClick={() => handleItemClick(idx)}
                                tabIndex={-1}
                                aria-selected={activeIdx === idx}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
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
        </aside>
    );
}; 