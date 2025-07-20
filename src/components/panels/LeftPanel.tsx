import React, { useState, useRef, useEffect } from 'react';
import { PanelHeader } from './PanelHeader';
import { PanelButton } from './PanelButton';
import {
  dosLeftPanelStyle,
  dosPanelContentStyle,
  dosPanelBottomStyle,
  dosTreeIconStyle,
  dosTreeIconTextStyle,
  dosTreeListStyle,
  dosTreeItemStyle,
  dosTreeLineStyle,
  dosTreeLineLastStyle,
  dosTreeLineTopStyle,
} from '@/styles/commonStyles';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

type LeftPanelProps = {
  title?: string;
  items?: string[];
  bottomText: string;
  activePanel?: 'left' | 'right' | 'header' | null;
  onPanelActive?: (active: boolean) => void;
  onItemSelect?: (itemName: string) => void;
  selectedItem?: string;
};

const leftPanelItems = ['DOS', 'TOOLS', 'XTGOLD', 'LAPLINK', 'DN'];

export const LeftPanel: React.FC<LeftPanelProps> = ({
  bottomText,
  activePanel = null,
  onPanelActive,
  onItemSelect,
  selectedItem,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(4); // Start with DN selected
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (selectedItem) {
      const idx = leftPanelItems.indexOf(selectedItem);
      if (idx !== -1) {
        setSelectedIdx(idx);
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    if (activePanel === 'right' || activePanel === 'header') {
      setSelectedIdx(-1);
    } else if (activePanel === 'left') {
      if (panelRef.current) {
        panelRef.current.focus();
      }
    }
  }, [activePanel]);

  useEffect(() => {
    if (onItemSelect) {
      onItemSelect(leftPanelItems[selectedIdx]);
    }
  }, []);

  const handleHeaderClick = () => {
    setSelectedIdx(-1);
    if (onPanelActive) {
      onPanelActive(false);
    }
  };

  const handleItemClick = (idx: number) => {
    setSelectedIdx(idx);
    if (onPanelActive) {
      onPanelActive(true);
    }
    if (onItemSelect) {
      onItemSelect(leftPanelItems[idx]);
    }
  };

  const { handleKeyDown } = useKeyboardNavigation({
    type: 'leftPanel',
    items: leftPanelItems,
    selectedIndex: selectedIdx,
    onIndexChange: (index) => setSelectedIdx(index as number),
    onItemSelect: (item) => onItemSelect?.(item),
    onPanelActive,
  });

  return (
    <aside
      className="flex flex-col h-full"
      style={{ ...dosLeftPanelStyle, position: 'relative' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={panelRef}
    >
      <div style={dosTreeIconStyle}>
        <span style={dosTreeIconTextStyle}>{'\\'}</span>
      </div>
      <PanelHeader
        label="TREE"
        onClick={handleHeaderClick}
        selected={activePanel !== 'right' && activePanel !== 'header'}
      />
      <div className="flex flex-col m-1 mt-0 h-full" style={dosPanelContentStyle}>
        <ul className="flex flex-col items-start" style={dosTreeListStyle} ref={listRef}>
          {leftPanelItems.map((item, idx) => (
            <li key={idx} style={dosTreeItemStyle}>
              <div
                style={idx === leftPanelItems.length - 1 ? dosTreeLineLastStyle : dosTreeLineStyle}
              >
                <div style={dosTreeLineTopStyle} />
              </div>
              <PanelButton
                isSelected={
                  selectedIdx === idx && activePanel !== 'right' && activePanel !== 'header'
                }
                onClick={() => handleItemClick(idx)}
                ariaLabel={`Select ${item}`}
              >
                {item}
              </PanelButton>
            </li>
          ))}
        </ul>
        <div className="p-2 text-xs" style={dosPanelBottomStyle}>
          {bottomText}
        </div>
      </div>
    </aside>
  );
};
