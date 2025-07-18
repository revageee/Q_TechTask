import React, {useRef, useEffect, useState} from "react";
import { typographyStyle } from '@/styles/typography';

type DropdownItem = {
    label: string;
    hotkey?: string;
};

type MenuItem = {
    label: string;
    dropdown?: DropdownItem[];
};

type HeaderProps = {
    items: MenuItem[];
    activeDropdown: boolean;
    onDropdownToggle: () => void;
    onOutsideClick: () => void;
};

export const Header: React.FC<HeaderProps> = ({items, activeDropdown, onDropdownToggle, onOutsideClick}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownIndex, setDropdownIndex] = useState(0); // выделенный пункт в dropdown
    const [activeMenuIdx, setActiveMenuIdx] = useState(0); // активный пункт меню

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        }

        if (activeDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [activeDropdown, onOutsideClick]);

    // Пример данных для File
    const fileDropdown: DropdownItem[] = [
        {label: "NCD Tree", hotkey: "Alt+F4"},
        {label: "Exit", hotkey: "Esc"},
    ];

    const handleMenuClick = (idx: number) => {
        setActiveMenuIdx(idx);
        if (items[idx].dropdown) {
            onDropdownToggle();
        }
    };
    const handleDropdownClick = (i: number) => {
        setDropdownIndex(i);
        alert(`Выбран пункт: ${fileDropdown[i].label}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (activeDropdown && items[activeMenuIdx].dropdown) {
            // Навигация по дропдауну
            if (e.key === 'ArrowDown') {
                setDropdownIndex(idx => (idx + 1) % fileDropdown.length);
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                setDropdownIndex(idx => (idx - 1 + fileDropdown.length) % fileDropdown.length);
                e.preventDefault();
            }
        } else {
            // Навигация по меню
            if (e.key === 'ArrowRight') {
                setActiveMenuIdx(idx => (idx + 1) % items.length);
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                setActiveMenuIdx(idx => (idx - 1 + items.length) % items.length);
                e.preventDefault();
            }
        }
    };

    return (
        <header className="w-full flex items-center px-12 h-8" style={{
            background: '#00AAAA',
            fontFamily: 'ModernDOS8x16',
            fontWeight: 400,
            fontSize: 36,
            lineHeight: '100%',
            letterSpacing: 0
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        >
            <nav className="flex h-full">
                {items.map((item, idx) => {
                    const isActive = idx === activeMenuIdx;
                    return (
                        <div key={item.label} className="relative h-full">
                            <button
                                className={`h-full px-12 flex items-center font-bold border-none outline-none`}
                                onClick={() => handleMenuClick(idx)}
                                tabIndex={-1}
                                style={{
                                    background: isActive ? '#000' : 'transparent',
                                    color: isActive ? '#FFF' : '#000',
                                    border: 'none',
                                    borderRadius: 0,
                                    position: 'relative',
                                    fontFamily: 'ModernDOS8x16',
                                    fontWeight: 400,
                                    fontSize: 36,
                                    lineHeight: '100%',
                                    letterSpacing: 0,
                                    height: '100%',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{color: '#FFFF55'}}>{item.label[0]}</span>
                                {item.label.slice(1)}
                            </button>
                            {isActive && item.dropdown && activeDropdown && (
                                <div
                                    ref={dropdownRef}
                                    className="fixed z-10 min-w-[700px] flex flex-col"
                                    style={{background: '#00AAAA', left: 0}}
                                >
                                    <div style={{border: '4px solid #000', padding: '8px', margin: 5,}}>
                                        {(fileDropdown as DropdownItem[]).map((sub, i) => {
                                            const isSelected = i === dropdownIndex;
                                            return (
                                                <button
                                                    key={sub.label}
                                                    className="w-full flex flex-row items-center justify-between px-2"
                                                    style={{
                                                        background: isSelected ? '#000' : 'transparent',
                                                        color: isSelected ? '#FFF' : '#000',
                                                        fontFamily: 'ModernDOS8x16',
                                                        fontWeight: 400,
                                                        fontStyle: 'normal',
                                                        fontSize: 32,
                                                        lineHeight: '100%',
                                                        letterSpacing: 0,
                                                        height: '40px',
                                                        cursor: 'pointer',
                                                        marginBottom: '2px',
                                                        border: 'none',
                                                        textAlign: 'left',
                                                    }}
                                                    onClick={() => handleDropdownClick(i)}
                                                    tabIndex={-1}
                                                    aria-selected={isSelected}
                                                >
                                                    <span>
                                                        <span style={{color: '#FFFF55'}}>{sub.label[0]}</span>
                                                        {sub.label.slice(1)}
                                                    </span>
                                                    {sub.hotkey && (
                                                        <span style={{color: '#FFF', marginLeft: 16}}>{sub.hotkey}</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}; 