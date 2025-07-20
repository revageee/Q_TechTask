import React from 'react';
import { typographyStyle } from '@/styles/typography';

type PrefooterInputProps = {
  value: string;
  onChange: (v: string) => void;
  onEnter?: (value: string) => void;
  placeholder?: string;
};

export const PreFooterInput: React.FC<PrefooterInputProps> = ({
  value,
  onChange,
  onEnter,
  placeholder,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(value);
    }
  };

  return (
    <div className="w-full bg-dosBlack text-dosYellow font-dos py-1 flex items-center">
      <span className="mr-2" style={{ ...typographyStyle, color: '#AAAAAA' }}>
        C:\&gt;
      </span>
      <input
        className="bg-transparent outline-none border-none flex-1 text-dosYellow font-dos placeholder-dosGray text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        aria-label="Command input"
        type="text"
        style={{ ...typographyStyle }}
      />
    </div>
  );
};
