'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { RightPanel } from '@/components/RightPanel';
import { Footer } from '@/components/Footer';
import {
  HEADER_DATA,
  FOLDER_DATA,
  LEFT_PANEL_DATA,
  FOOTER_DATA,
  DEFAULT_SELECTED_FOLDER,
} from '@/constants/appConstants';

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<
    'left' | 'right' | 'header' | null
  >(null);
  const [footerInputValue, setFooterInputValue] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>(
    DEFAULT_SELECTED_FOLDER,
  );

  const handleCommandClick = (command: { name: string; number: number }) => {
    alert(`Виконується команда: ${command.name} (${command.number})`);
  };

  const handleFooterInputChange = (value: string) => {
    setFooterInputValue(value);
    if (value.toLowerCase() === 'help') {
      alert(
        'Справка: Доступні команди - help, menu, view, edit, copy, remmov, mkdir, delete, pulldn, quit',
      );
    } else if (value.toLowerCase() === 'quit') {
      alert('Вихід з програми...');
    }
  };

  const handleFooterEnter = (value: string) => {
    alert(`Виконується команда: ${value}`);
    setFooterInputValue('');
  };

  const handleLeftPanelItemClick = (folderName: string) => {
    setSelectedFolder(folderName);
  };

  const handleLeftPanelActive = (active: boolean) => {
    if (active) {
      setActivePanel('left');
    } else {
      if (activePanel === 'header') {
        setActivePanel('header');
      } else {
        setActivePanel('right');
      }
    }
  };

  const handleRightPanelActive = (active: boolean) => {
    if (active) {
      setActivePanel('right');
    } else {
      if (activePanel === 'header') {
        setActivePanel('header');
      } else {
        setActivePanel('left');
      }
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((v) => !v);
    if (!dropdownOpen) {
      setActivePanel('header');
    }
  };

  const handleOutsideClick = () => {
    setDropdownOpen(false);
    setActivePanel('left');
  };

  const currentRightPanelData =
    FOLDER_DATA[selectedFolder as keyof typeof FOLDER_DATA] || FOLDER_DATA.DN;

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0000AA] text-[#55FFFF] font-dos">
      <Header
        items={HEADER_DATA}
        activeDropdown={dropdownOpen}
        onDropdownToggle={handleDropdownToggle}
        onOutsideClick={handleOutsideClick}
        activePanel={activePanel}
      />
      <div className="flex-1 flex flex-col">
        <div
          className="flex-1 flex flex-row"
          style={{
            borderTop: 0,
            borderRadius: 0,
            height: '100%',
            paddingLeft: 4,
            paddingBottom: 4,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <LeftPanel
              title={LEFT_PANEL_DATA.title}
              items={LEFT_PANEL_DATA.items}
              bottomText={LEFT_PANEL_DATA.bottomText}
              activePanel={activePanel}
              onPanelActive={handleLeftPanelActive}
              onItemSelect={handleLeftPanelItemClick}
              selectedItem={selectedFolder}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <RightPanel
              title={currentRightPanelData.title}
              columns={currentRightPanelData.columns}
              bottomText={currentRightPanelData.bottomText}
              activePanel={activePanel}
              onPanelActive={handleRightPanelActive}
            />
          </div>
        </div>
        <Footer
          commands={FOOTER_DATA}
          inputValue={footerInputValue}
          onInputChange={handleFooterInputChange}
          onCommandClick={handleCommandClick}
          onEnter={handleFooterEnter}
        />
      </div>
    </div>
  );
}
