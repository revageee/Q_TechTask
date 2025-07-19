import React, { useState, useRef, useEffect } from 'react';
import { PanelHeader } from './PanelHeader';
import {
  dosPanelStyle,
  dosPanelContentStyle,
  dosPanelBottomStyle,
  dosPanelTitleStyle,
  dosButtonSmallStyle,
  dosButtonSelectedStyle,
  dosDividerStyle,
} from '@/styles/commonStyles';

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
  onPanelActive?: (active: boolean) => void;
  activePanel?: 'left' | 'right' | null;
};

export const RightPanel: React.FC<RightPanelProps> = ({
  columns,
  bottomText,
  onPanelActive,
  activePanel = null,
}) => {
  const [selectedCol, setSelectedCol] = useState<number>(-1);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([0, 0, 0]);
  const listRefs = [
    useRef<HTMLUListElement>(null),
    useRef<HTMLUListElement>(null),
    useRef<HTMLUListElement>(null),
  ];

  useEffect(() => {
    if (activePanel === 'left') {
      setSelectedCol(-1);
    }
  }, [activePanel]);

  const handleHeaderClick = () => {
    setSelectedCol(-1);
    if (onPanelActive) {
      onPanelActive(false);
    }
  };

  const handleItemClick = (col: number, idx: number) => {
    setSelectedCol(col);
    setSelectedIdx((prev) => prev.map((v, i) => (i === col ? idx : v)));
    if (onPanelActive) {
      onPanelActive(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedCol === -1 && e.key === 'Enter') {
      setSelectedCol(0);
      e.preventDefault();
      return;
    }

    if (selectedCol > -1) {
      const colLength = columns[selectedCol]?.items.length ?? 0;

      const actions: Record<string, () => void> = {
        ArrowDown: () => {
          setSelectedIdx((prev) =>
            prev.map((v, i) =>
              i === selectedCol ? Math.min(v + 1, colLength - 1) : v,
            ),
          );
        },
        ArrowUp: () => {
          setSelectedIdx((prev) =>
            prev.map((v, i) => (i === selectedCol ? Math.max(v - 1, 0) : v)),
          );
        },
        ArrowLeft: () => {
          if (selectedCol > 0) setSelectedCol((col) => col - 1);
        },
        ArrowRight: () => {
          if (selectedCol < columns.length - 1)
            setSelectedCol((col) => col + 1);
        },
        Backspace: () => setSelectedCol(-1),
        Escape: () => setSelectedCol(-1),
      };

      const action = actions[e.key];
      if (action) {
        action();
        e.preventDefault();
      }
    }
  };

  return (
    <section
      className="flex flex-col h-full flex-1 font-dos mx-[4px]"
      style={dosPanelStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <PanelHeader
        label="C:\"
        onClick={handleHeaderClick}
        selected={activePanel === 'right'}
      />
      <div
        className="flex flex-col m-1 mt-0 h-full"
        style={dosPanelContentStyle}
      >
        <div
          className="flex flex-row w-full h-full items-stretch"
          style={{ marginTop: 0 }}
        >
          {[0, 1, 2].map((col) => (
            <React.Fragment key={col}>
              <div className="flex-1 text-center font-bold flex flex-col h-full">
                <div style={dosPanelTitleStyle}>{columns[col].title}</div>
                <ul
                  className="flex-1 h-full space-y-0.5"
                  ref={listRefs[col]}
                  tabIndex={-1}
                >
                  {columns[col].items.map((item, i) => (
                    <li key={item.name} style={{ width: '100%', padding: 8 }}>
                      <button
                        style={{
                          ...dosButtonSmallStyle,
                          width: '100%',
                          padding: 0,
                          textAlign: 'left' as const,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          ...(selectedCol === col &&
                          selectedIdx[col] === i &&
                          activePanel !== 'left'
                            ? {
                                ...dosButtonSelectedStyle,
                                background: '#55FFFF',
                                color: '#000',
                              }
                            : { color: '#00FFFF', background: 'transparent' }),
                        }}
                        onClick={() => handleItemClick(col, i)}
                        tabIndex={-1}
                        aria-pressed={
                          selectedCol === col &&
                          selectedIdx[col] === i &&
                          activePanel !== 'left'
                        }
                        aria-label={`Select ${item.name}${item.format ? ` (${item.format})` : ''}`}
                      >
                        <span>{item.name}</span>
                        {item.format && (
                          <span
                            className="text-xs"
                            style={{
                              ...dosButtonSmallStyle,
                              color:
                                selectedCol === col &&
                                selectedIdx[col] === i &&
                                activePanel !== 'left'
                                  ? '#000'
                                  : '#00FFFF',
                            }}
                          >
                            {item.format}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {col < 2 && <div style={dosDividerStyle} />}
            </React.Fragment>
          ))}
        </div>
        <div className="p-2 text-xs" style={dosPanelBottomStyle}>
          {bottomText}
        </div>
      </div>
    </section>
  );
};
