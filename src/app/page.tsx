'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { RightPanel } from '@/components/RightPanel';
import { Footer } from '@/components/Footer';

const headerData = [
  {
    label: 'File',
    dropdown: [
      { label: 'NCD Tree', hotkey: 'Alt+F4' },
      { label: 'Exit', hotkey: 'Esc' },
    ],
  },
  { label: 'Disk' },
  { label: 'Commands' },
];

const leftPanelData = {
  title: '',
  items: ['TOOLS', 'XTGOLD', 'LAPLINK', 'DN'],
  bottomText: 'C:\\',
};

const rightPanelData = {
  title: 'C:\\',
  columns: [
    {
      title: 'Name',
      items: [
        { name: 'DN' },
        { name: 'autoexec', format: 'bat' },
        { name: 'command', format: 'com', active: true },
        { name: 'config', format: 'sys' },
        { name: 'Io', format: 'sys' },
        { name: '11Pro', format: 'sys' },
        { name: 'Msdod', format: 'sys' },
      ],
    },
    {
      title: 'Name',
      items: [],
    },
    {
      title: 'Name',
      items: [],
    },
  ],
  bottomText: 'DN',
};

const footerData = [
  { name: 'Help', number: 1 },
  { name: 'Menu', number: 2 },
  { name: 'View', number: 3 },
  { name: 'Edit', number: 4 },
  { name: 'Copy', number: 5 },
  { name: 'RemMov', number: 6 },
  { name: 'Mkdir', number: 7 },
  { name: 'Delete', number: 8 },
  { name: 'PullDn', number: 9 },
  { name: 'Quit', number: 10 },
];

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'left' | 'right' | null>(null);
  const [footerInputValue, setFooterInputValue] = useState('');

  const handleCommandClick = (command: { name: string; number: number }) => {
    alert(`Виконується команда: ${command.name} (${command.number})`);
  };

  const handleFooterInputChange = (value: string) => {
    setFooterInputValue(value);
    if (value.toLowerCase() === 'help') {
      alert(
        'Справка: Доступні команди - help, menu, view, edit, copy, remmov, mkdir, delete, pulldn, quit'
      );
    } else if (value.toLowerCase() === 'quit') {
      alert('Вихід з програми...');
    }
  };

  const handleFooterEnter = (value: string) => {
    alert(`Виконується команда: ${value}`);
    setFooterInputValue('');
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-[#0000AA] text-[#55FFFF] font-dos'>
      <Header
        items={headerData}
        activeDropdown={dropdownOpen}
        onDropdownToggle={() => setDropdownOpen(v => !v)}
        onOutsideClick={() => setDropdownOpen(false)}
      />
      <div className='flex-1 flex flex-col'>
        <div
          className='flex-1 flex flex-row'
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
              title={leftPanelData.title}
              items={leftPanelData.items}
              bottomText={leftPanelData.bottomText}
              activePanel={activePanel}
              onPanelActive={active => setActivePanel(active ? 'left' : null)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <RightPanel
              title={rightPanelData.title}
              columns={rightPanelData.columns}
              bottomText={rightPanelData.bottomText}
              activePanel={activePanel}
              onPanelActive={active => setActivePanel(active ? 'right' : null)}
            />
          </div>
        </div>
        <Footer
          commands={footerData}
          inputValue={footerInputValue}
          onInputChange={handleFooterInputChange}
          onCommandClick={handleCommandClick}
          onEnter={handleFooterEnter}
        />
      </div>
    </div>
  );
}
