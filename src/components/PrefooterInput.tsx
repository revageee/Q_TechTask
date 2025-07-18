import React from "react";
import {typographyStyle} from "@/components/Footer";

type PrefooterInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export const PrefooterInput: React.FC<PrefooterInputProps> = ({ value, onChange, placeholder }) => (
  <div className="w-full bg-dosBlack text-dosYellow font-dos py-1 flex items-center">
      <span className="mr-2" style={{ ...typographyStyle, color: '#AAAAAA' }}>C:\&gt;</span>
      <input
      className="bg-transparent outline-none border-none flex-1 text-dosYellow font-dos placeholder-dosGray text-sm"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Command input"
      type="text"
      style={{ fontFamily: 'inherit' }}
    />
  </div>
); 