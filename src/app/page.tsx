'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { RightPanel } from '@/components/RightPanel';
import { Footer } from '@/components/Footer';
import { useHomeLogic } from '@/hooks/useHomeLogic';

export default function Home() {
  const {
    HEADER_DATA,
    LEFT_PANEL_DATA,
    FOOTER_DATA,
    dropdownOpen,
    activePanel,
    footerInputValue,
    selectedFolder,
    currentRightPanelData,
    handleDropdownToggle,
    handleOutsideClick,
    handleFooterInputChange,
    handleFooterEnter,
    handleCommandClick,
    handleLeftPanelActive,
    handleRightPanelActive,
    handleLeftPanelItemClick,
  } = useHomeLogic();

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
