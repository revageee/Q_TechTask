import React, { useState, useRef, useEffect } from 'react';
import { PanelHeader } from './PanelHeader';
import { PanelButton } from './PanelButton';
import {
  dosPanelStyle,
  dosPanelContentStyle,
  dosPanelBottomStyle,
  dosPanelTitleStyle,
  dosDividerStyle,
} from '@/styles/commonStyles';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

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
  activePanel?: 'left' | 'right' | 'header' | null;
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
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activePanel === 'left' || activePanel === 'header') {
      setSelectedCol(-1);
    } else if (activePanel === 'right' && selectedCol === -1) {
      setSelectedCol(0);
      if (panelRef.current) {
        panelRef.current.focus();
      }
    }
  }, [activePanel, selectedCol]);

  const handleHeaderClick = () => {
    setSelectedCol(-1);
    if (onPanelActive) {
      onPanelActive(false);
    }
  };

  const handleItemClick = (col: number, idx: number) => {
    if (idx === 0) {
      setSelectedCol(-1);
      if (onPanelActive) {
        onPanelActive(false);
      }
      return;
    }
    setSelectedCol(col);
    setSelectedIdx((prev) => prev.map((v, i) => (i === col ? idx : v)));
    if (onPanelActive) {
      onPanelActive(true);
    }
  };

  const { handleKeyDown } = useKeyboardNavigation({
    type: 'rightPanel',
    items: [],
    selectedIndex: selectedIdx,
    onIndexChange: (index) => setSelectedIdx(index as number[]),
    onPanelActive,
    columns,
    selectedCol,
    onColChange: setSelectedCol,
  });

  return (
    <section
      className="flex flex-col h-full flex-1 font-dos mx-[4px]"
      style={dosPanelStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={panelRef}
    >
      <PanelHeader label="C:\" onClick={handleHeaderClick} selected={activePanel === 'right'} />
      <div className="flex flex-col m-1 mt-0 h-full" style={dosPanelContentStyle}>
        <div className="flex flex-row w-full h-full items-stretch" style={{ marginTop: 0 }}>
          {[0, 1, 2].map((col) => (
            <React.Fragment key={col}>
              <div className="flex-1 text-center font-bold flex flex-col h-full">
                <div style={dosPanelTitleStyle}>{columns[col].title}</div>
                <ul className="flex-1 h-full space-y-0.5" ref={listRefs[col]} tabIndex={-1}>
                  {columns[col].items.map((item, i) => (
                    <li key={item.name} style={{ width: '100%', padding: 8 }}>
                      <PanelButton
                        isSelected={
                          selectedCol === col &&
                          selectedIdx[col] === i &&
                          activePanel !== 'left' &&
                          activePanel !== 'header'
                        }
                        onClick={() => handleItemClick(col, i)}
                        ariaLabel={`Select ${item.name}${item.format ? ` (${item.format})` : ''}`}
                        showFormat={!!item.format}
                        format={item.format}
                      >
                        {item.name}
                      </PanelButton>
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
