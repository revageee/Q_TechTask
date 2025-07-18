import React, { useRef, useEffect, useState } from "react";

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

export const Header: React.FC<HeaderProps> = ({ items, activeDropdown, onDropdownToggle, onOutsideClick }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownIndex, setDropdownIndex] = useState(0); // выделенный пункт в dropdown

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
    { label: "NCD Tree", hotkey: "Alt+F4" },
    { label: "Exit", hotkey: "Esc" },
  ];

  return (
    <header className="w-full flex items-center px-2 h-8" style={{ background: '#00AAAA', fontFamily: 'ModernDOS8x16', fontWeight: 400, fontSize: 36, lineHeight: '100%', letterSpacing: 0 }}>
      <nav className="flex gap-2 h-full">
        {items.map((item, idx) => {
          const isActive = idx === 0 && activeDropdown;
          return (
            <div key={item.label} className="relative h-full">
              <button
                className={`h-full px-3 flex items-center font-bold border-none outline-none`}
                onClick={idx === 0 ? onDropdownToggle : undefined}
                tabIndex={0}
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
                <span style={{ color: '#FFFF55' }}>{item.label[0]}</span>
                {item.label.slice(1)}
              </button>
              {idx === 0 && item.dropdown && activeDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full z-10 min-w-[220px] flex flex-col"
                  style={{ background: '#00AAAA', border: '4px solid #000', padding: '8px', margin: 0, top: '100%' }}
                >
                  {(fileDropdown as DropdownItem[]).map((sub, i) => {
                    const isSelected = i === dropdownIndex;
                    return (
                      <div
                        key={sub.label}
                        className="w-full flex flex-row items-center justify-between px-2"
                        style={{
                          background: isSelected ? '#000' : 'transparent',
                          color: isSelected ? '#FFF' : '#000',
                          fontFamily: 'inherit',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          height: '28px',
                          cursor: 'pointer',
                          marginBottom: '2px',
                        }}
                      >
                        <span>
                          <span style={{ color: '#FFFF55' }}>{sub.label[0]}</span>
                          {sub.label.slice(1)}
                        </span>
                        {sub.hotkey && (
                          <span style={{ color: '#FFF', marginLeft: 16 }}>{sub.hotkey}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </header>
  );
}; 