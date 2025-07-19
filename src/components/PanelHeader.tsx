import React from 'react';
import {
  dosPanelHeaderStyle,
  dosButtonStyle,
  dosButtonSelectedStyle,
} from '@/styles/commonStyles';

type PanelHeaderProps = {
  label: string;
  onClick?: () => void;
  selected?: boolean;
};

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  label,
  onClick,
  selected = false,
}) => (
  <div
    className="w-full flex items-stretch justify-center relative"
    style={dosPanelHeaderStyle}
  >
    <button
      className="flex items-center justify-center h-full px-4 font-bold text-center"
      style={{
        ...dosButtonStyle,
        ...(selected ? dosButtonSelectedStyle : {}),
      }}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Panel header: ${label}`}
    >
      {label}
    </button>
  </div>
);
