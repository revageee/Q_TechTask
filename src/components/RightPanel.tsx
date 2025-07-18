import React from "react";

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

export const RightPanel: React.FC<RightPanelProps> = ({title, columns, bottomText}) => (
    <section
        className="flex flex-col h-full flex-1 font-dos mx-[4px]"
        style={{
            background: '#0000AA',
            borderLeft: '4px solid #55FFFF',
            borderBottom: '4px solid #55FFFF',
            borderRight: '4px solid #55FFFF',
        }}
    >
        {/* Хедер C:\ с "вырезом" по всей высоте */}
        <div className="w-full flex items-stretch justify-center relative" style={{background: '#55FFFF', height: 32}}>
            <div className="flex items-center justify-center h-full px-4 font-bold text-center" style={{
                background: '#0000AA',
                color: '#55FFFF',
                fontWeight: 400,
                fontSize: 36,
                lineHeight: '100%',
                letterSpacing: 0,
                fontFamily: 'ModernDOS8x16'
            }}>
                C:\
            </div>
        </div>
        {/* Заголовки колонок Name под хедером, без нижнего бордера */}
        <div className="flex flex-row w-full h-full items-stretch" style={{marginTop: 0}}>
            {/* Колонка 1 */}
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
                    textAlign: 'center'
                }}>{columns[0].title}</div>
                <ul className="flex-1 h-full space-y-0.5">
                    {columns[0].items.map((item, i) => (
                        <li
                            key={item.name}
                            className="flex items-center justify-between"
                            style={
                                item.active
                                    ? {
                                        background: '#55FFFF',
                                        color: '#000',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                                    : {
                                        color: '#00FFFF',
                                        background: 'transparent',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                            }
                        >
                            <span>{item.name}</span>
                            {item.format && <span className="text-xs" style={{
                                color: item.active ? '#000' : '#00FFFF',
                                fontFamily: 'ModernDOS8x16',
                                fontWeight: 400,
                                fontSize: 32,
                                lineHeight: '100%',
                                letterSpacing: 0
                            }}>{item.format}</span>}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Бордер между 1 и 2 */}
            <div style={{width: 4, background: '#55FFFF', minHeight: '100%'}}/>
            {/* Колонка 2 */}
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
                    textAlign: 'center'
                }}>{columns[1].title}</div>
                <ul className="flex-1 h-full space-y-0.5">
                    {columns[1].items.map((item, i) => (
                        <li
                            key={item.name}
                            className="flex items-center justify-between"
                            style={
                                item.active
                                    ? {
                                        background: '#55FFFF',
                                        color: '#000',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                                    : {
                                        color: '#00FFFF',
                                        background: 'transparent',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                            }
                        >
                            <span>{item.name}</span>
                            {item.format && <span className="text-xs" style={{
                                color: item.active ? '#000' : '#00FFFF',
                                fontFamily: 'ModernDOS8x16',
                                fontWeight: 400,
                                fontSize: 32,
                                lineHeight: '100%',
                                letterSpacing: 0
                            }}>.{item.format}</span>}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Бордер между 2 и 3 */}
            <div style={{width: 4, background: '#55FFFF', minHeight: '100%'}}/>
            {/* Колонка 3 */}
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
                    textAlign: 'center'
                }}>{columns[2].title}</div>
                <ul className="flex-1 h-full space-y-0.5">
                    {columns[2].items.map((item, i) => (
                        <li
                            key={item.name}
                            className="flex items-center justify-between"
                            style={
                                item.active
                                    ? {
                                        background: '#55FFFF',
                                        color: '#000',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                                    : {
                                        color: '#00FFFF',
                                        background: 'transparent',
                                        fontWeight: 400,
                                        fontSize: 32,
                                        fontFamily: 'ModernDOS8x16',
                                        lineHeight: '100%',
                                        letterSpacing: 0,
                                        padding: '0 2px',
                                    }
                            }
                        >
                            <span>{item.name}</span>
                            {item.format && <span className="text-xs" style={{
                                color: item.active ? '#000' : '#00FFFF',
                                fontFamily: 'ModernDOS8x16',
                                fontWeight: 400,
                                fontSize: 32,
                                lineHeight: '100%',
                                letterSpacing: 0
                            }}>{item.format}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div
            className="px-2 py-1 text-xs border-t-2"
            style={{
                borderTop: '2px solid #55FFFF',
                color: '#55FFFF',
                background: 'transparent',
                fontFamily: 'ModernDOS8x16',
                fontWeight: 400,
                fontSize: 32,
                lineHeight: '100%',
                letterSpacing: 0
            }}
        >
            {bottomText}
        </div>
    </section>
); 