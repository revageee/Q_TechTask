'use client';

import { useState } from 'react';
import {
  FOLDER_DATA,
  DEFAULT_SELECTED_FOLDER,
  FOOTER_DATA,
  HEADER_DATA,
  LEFT_PANEL_DATA,
} from '@/constants/appConstants';

export function useHomeLogic() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'left' | 'right' | 'header' | null>(null);
  const [footerInputValue, setFooterInputValue] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>(DEFAULT_SELECTED_FOLDER);

  const currentRightPanelData =
    FOLDER_DATA[selectedFolder as keyof typeof FOLDER_DATA] || FOLDER_DATA.DN;

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
    setActivePanel(active ? 'left' : activePanel === 'header' ? 'header' : 'right');
  };

  const handleRightPanelActive = (active: boolean) => {
    setActivePanel(active ? 'right' : activePanel === 'header' ? 'header' : 'left');
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
    if (!dropdownOpen) setActivePanel('header');
  };

  const handleOutsideClick = () => {
    setDropdownOpen(false);
    setActivePanel('left');
  };

  return {
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
  };
}
