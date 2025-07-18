import React from "react";

type LeftPanelProps = {
  title?: string;
  items?: string[];
  bottomText: string;
};

const leftPanelItems = ["DOS", "TOOLS", "XTGOLD", "LAPLINK", "DN"];

export const LeftPanel: React.FC<LeftPanelProps> = ({ title, bottomText }) => (
  <aside
    className="flex flex-col h-full bg-[#0000AA] border-r-4 border-[#55FFFF] border-b-4 border-l-4"
  >
    {/* Хедер TREE с "вырезом" по всей высоте */}
    <div className="w-full flex items-stretch justify-center relative" style={{ background: '#55FFFF', height: 32 }}>
      <div className="flex items-center justify-center h-full px-4 font-bold text-center" style={{ background: '#0000AA', color: '#55FFFF', fontWeight: 400, fontSize: 36, lineHeight: '100%', letterSpacing: 0, fontFamily: 'ModernDOS8x16' }}>
        TREE
      </div>
    </div>
    <ul
      className="flex flex-col items-start"
      style={{
        padding: '0px 8px',
        width: 661,
        height: 534,
        fontFamily: 'ModernDOS8x16',
        fontWeight: 400,
        fontSize: 32,
        lineHeight: '100%',
        letterSpacing: 0,
        alignSelf: 'stretch',
        flexGrow: 1,
      }}
    >
      {leftPanelItems.map((item, idx) => (
        <li key={idx} style={{ color: '#00FFFF', fontWeight: 400, fontSize: 32, fontFamily: 'ModernDOS8x16', lineHeight: '100%', letterSpacing: 0, width: '100%' }}>{item}</li>
      ))}
    </ul>
      <div
          className="px-2 py-1 text-xs border-t-2"
          style={{
              borderTop: '2px solid #55FFFF',
              color: '#55FFFF',
              background: 'transparent',
              fontFamily: 'ModernDOS8x16',
              fontWeight: 400,
              fontSize: 32,
              lineHeight: '100%',
              letterSpacing: 0
          }}
      >
          {bottomText}
      </div>
  </aside>
); 