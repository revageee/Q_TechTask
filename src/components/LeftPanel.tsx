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
  activePanel?: 'left' | 'right' | null;
  onPanelActive?: (active: boolean) => void;
};

const leftPanelItems = ['DOS', 'TOOLS', 'XTGOLD', 'LAPLINK', 'DN'];

export const LeftPanel: React.FC<LeftPanelProps> = ({
  title,
  bottomText,
  activePanel = null,
  onPanelActive,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activePanel === 'right') {
      setSelectedIdx(-1);
    }
  }, [activePanel]);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowDown: () => {
        setSelectedIdx(idx => Math.min(idx + 1, leftPanelItems.length - 1));
      },
      ArrowUp: () => {
        setSelectedIdx(idx => Math.max(idx - 1, -1));
      },
      Enter: () => {
        if (selectedIdx === -1) {
          setSelectedIdx(0);
        }
      },
      Backspace: () => {
        if (selectedIdx > -1) setSelectedIdx(-1);
      },
      Escape: () => {
        if (selectedIdx > -1) setSelectedIdx(-1);
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
      className='flex flex-col h-full'
      style={{ ...dosLeftPanelStyle, position: 'relative' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div style={dosTreeIconStyle}>
        <span style={dosTreeIconTextStyle}>{'\\'}</span>
      </div>
      <PanelHeader
        label='TREE'
        onClick={handleHeaderClick}
        selected={activePanel !== 'right'}
      />
      <div
        className='flex flex-col m-1 mt-0 h-full'
        style={dosPanelContentStyle}
      >
        <ul
          className='flex flex-col items-start'
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
                  ...(selectedIdx === idx && activePanel !== 'right'
                    ? {
                        ...dosButtonSelectedStyle,
                        background: '#55FFFF',
                        color: '#000',
                      }
                    : { color: '#00FFFF', background: 'transparent' }),
                }}
                onClick={() => handleItemClick(idx)}
                tabIndex={-1}
                aria-pressed={selectedIdx === idx && activePanel !== 'right'}
                aria-label={`Select ${item}`}
              >
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className='p-2 text-xs' style={dosPanelBottomStyle}>
          {bottomText}
        </div>
      </div>
    </aside>
  );
};
