import React, { useState, useRef, useEffect } from 'react';
import { PanelHeader } from './PanelHeader';
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
  dosButtonSmallStyle,
  dosButtonSelectedStyle,
} from '@/styles/commonStyles';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowDown: () => {
        const newIdx = Math.min(selectedIdx + 1, leftPanelItems.length - 1);
        setSelectedIdx(newIdx);
        if (onItemSelect) {
          onItemSelect(leftPanelItems[newIdx]);
        }
      },
      ArrowUp: () => {
        const newIdx = Math.max(selectedIdx - 1, -1);
        setSelectedIdx(newIdx);
        if (newIdx >= 0 && onItemSelect) {
          onItemSelect(leftPanelItems[newIdx]);
        }
      },
      Enter: () => {
        if (selectedIdx === -1) {
          setSelectedIdx(0);
          if (onItemSelect) {
            onItemSelect(leftPanelItems[0]);
          }
        } else if (selectedIdx >= 0) {
          if (onPanelActive) {
            onPanelActive(false);
          }
        }
      },
      Backspace: () => {
        if (selectedIdx > -1) setSelectedIdx(-1);
      },
      Escape: () => {
        if (selectedIdx > -1) setSelectedIdx(-1);
      },
      F10: () => {
        if (onPanelActive) {
          onPanelActive(false);
        }
      },
    };

    const action = actions[e.key];
    if (action) {
      action();
      e.preventDefault();
    }
  };

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
      <div
        className="flex flex-col m-1 mt-0 h-full"
        style={dosPanelContentStyle}
      >
        <ul
          className="flex flex-col items-start"
          style={dosTreeListStyle}
          ref={listRef}
        >
          {leftPanelItems.map((item, idx) => (
            <li key={idx} style={dosTreeItemStyle}>
              <div
                style={
                  idx === leftPanelItems.length - 1
                    ? dosTreeLineLastStyle
                    : dosTreeLineStyle
                }
              >
                <div style={dosTreeLineTopStyle} />
              </div>
              <button
                style={{
                  ...dosButtonSmallStyle,
                  width: '100%',
                  padding: 0,
                  textAlign: 'left' as const,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(selectedIdx === idx &&
                  activePanel !== 'right' &&
                  activePanel !== 'header'
                    ? {
                        ...dosButtonSelectedStyle,
                        background: '#55FFFF',
                        color: '#000',
                      }
                    : { color: '#00FFFF', background: 'transparent' }),
                }}
                onClick={() => handleItemClick(idx)}
                tabIndex={-1}
                aria-pressed={
                  selectedIdx === idx &&
                  activePanel !== 'right' &&
                  activePanel !== 'header'
                }
                aria-label={`Select ${item}`}
              >
                <span>{item}</span>
              </button>
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
