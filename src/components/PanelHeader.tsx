import React from "react";

type PanelHeaderProps = {
  label: string;
  onClick?: () => void;
};

export const PanelHeader: React.FC<PanelHeaderProps> = ({ label, onClick }) => (
  <div
    className="w-full flex items-stretch justify-center relative"
    style={{ background: '#55FFFF', height: 32 }}
  >
    <button
      className="flex items-center justify-center h-full px-4 font-bold text-center"
      style={{
        background: '#0000AA',
        color: '#55FFFF',
        fontWeight: 400,
        fontSize: 36,
        lineHeight: '100%',
        letterSpacing: 0,
        fontFamily: 'ModernDOS8x16',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  </div>
); 