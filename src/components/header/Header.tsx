import React, { useRef, useEffect, useState } from 'react';
import {
  dosHeaderStyle,
  dosMenuButtonStyle,
  dosMenuButtonActiveStyle,
  dosDropdownStyle,
  dosDropdownItemStyle,
  dosDropdownItemSelectedStyle,
  dosHotkeyStyle,
  dosDropdownBorderStyle,
} from '@/styles/commonStyles';
import { FILE_DROPDOWN_ITEMS, DropdownItem, MenuItem } from '@/constants/appConstants';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

type HeaderProps = {
  items: MenuItem[];
  activeDropdown: boolean;
  onDropdownToggle: () => void;
  onOutsideClick: () => void;
  activePanel?: 'left' | 'right' | 'header' | null;
};

export const Header: React.FC<HeaderProps> = ({
  items,
  activeDropdown,
  onDropdownToggle,
  onOutsideClick,
  activePanel = null,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const [activeMenuIdx, setActiveMenuIdx] = useState(0);
  const fileDropdown: DropdownItem[] = FILE_DROPDOWN_ITEMS;

  useEffect(() => {
    if (activePanel === 'header' && headerRef.current) {
      headerRef.current.focus();
    }
  }, [activePanel]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown, onOutsideClick]);

  const handleMenuClick = (idx: number) => {
    setActiveMenuIdx(idx);
    if (items[idx].dropdown) {
      onDropdownToggle();
    }
  };
  const handleDropdownClick = (i: number) => {
    setDropdownIndex(i);
    alert(`Вибрано пункт: ${fileDropdown[i].label}`);
  };

  const { handleKeyDown } = useKeyboardNavigation({
    type: 'header',
    items: activeDropdown ? fileDropdown : items,
    selectedIndex: activeDropdown ? dropdownIndex : activeMenuIdx,
    onIndexChange: (index) => {
      if (activeDropdown) {
        setDropdownIndex(index as number);
      } else {
        setActiveMenuIdx(index as number);
      }
    },
    onDropdownToggle,
    onOutsideClick,
    activeDropdown,
    dropdownIndex,
    onDropdownIndexChange: setDropdownIndex,
    onDropdownClick: handleDropdownClick,
  });

  return (
    <header
      className="w-full flex items-center px-12"
      style={dosHeaderStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={headerRef}
    >
      <nav className="flex h-full">
        {items.map((item, idx) => {
          const isActive = idx === activeMenuIdx;
          return (
            <div key={item.label} className="relative h-full">
              <button
                className={'h-full px-12 flex items-center font-bold border-none outline-none'}
                onClick={() => handleMenuClick(idx)}
                tabIndex={-1}
                style={{
                  ...dosMenuButtonStyle,
                  ...(isActive ? dosMenuButtonActiveStyle : {}),
                }}
              >
                <span style={{ color: '#FFFF55' }}>{item.label[0]}</span>
                {item.label.slice(1)}
              </button>
              {isActive && item.dropdown && activeDropdown && (
                <div
                  ref={dropdownRef}
                  className="fixed z-10 left-0 min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px] flex flex-col"
                  style={dosDropdownStyle}
                >
                  <div style={dosDropdownBorderStyle}>
                    {(fileDropdown as DropdownItem[]).map((sub, i) => {
                      const isSelected = i === dropdownIndex;
                      return (
                        <button
                          key={sub.label}
                          className="w-full flex flex-row items-center justify-between px-2"
                          style={{
                            ...dosDropdownItemStyle,
                            ...(isSelected ? dosDropdownItemSelectedStyle : {}),
                          }}
                          onClick={() => handleDropdownClick(i)}
                          tabIndex={-1}
                          aria-pressed={isSelected}
                          aria-label={`Select ${sub.label}${sub.hotkey ? ` (${sub.hotkey})` : ''}`}
                        >
                          <span>
                            <span style={{ color: '#FFFF55' }}>{sub.label[0]}</span>
                            {sub.label.slice(1)}
                          </span>
                          {sub.hotkey && <span style={dosHotkeyStyle}>{sub.hotkey}</span>}
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
