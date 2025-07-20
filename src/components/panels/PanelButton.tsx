import React from 'react';
import { dosButtonSmallStyle, dosButtonSelectedStyle } from '@/styles/commonStyles';

type DosButtonProps = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  ariaLabel: string;
  showFormat?: boolean;
  format?: string;
  formatColor?: string;
};

export const PanelButton: React.FC<DosButtonProps> = ({
  children,
  isSelected,
  onClick,
  ariaLabel,
  showFormat = false,
  format,
  formatColor = '#00FFFF',
}) => {
  return (
    <button
      style={{
        ...dosButtonSmallStyle,
        width: '100%',
        padding: 0,
        textAlign: 'left' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...(isSelected
          ? {
              ...dosButtonSelectedStyle,
              background: '#55FFFF',
              color: '#000',
            }
          : { color: '#00FFFF', background: 'transparent' }),
      }}
      onClick={onClick}
      tabIndex={-1}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {showFormat && format && (
        <span
          className="text-xs"
          style={{
            ...dosButtonSmallStyle,
            color: isSelected ? '#000' : formatColor,
            marginLeft: 8,
          }}
        >
          {format}
        </span>
      )}
    </button>
  );
};
