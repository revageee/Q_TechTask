import React from 'react';
import { PrefooterInput } from '@/components/PrefooterInput';
import { typographyStyle } from '@/styles/typography';

type Command = {
  name: string;
  number: number;
};

type FooterProps = {
  commands: Command[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onCommandClick: (command: Command) => void;
  onEnter?: (value: string) => void;
};

export const Footer: React.FC<FooterProps> = ({
  commands,
  inputValue,
  onInputChange,
  onCommandClick,
  onEnter,
}) => (
  <div className="bg-black">
    <PrefooterInput
      value={inputValue}
      onChange={onInputChange}
      onEnter={onEnter}
    />
    <footer className="w-full bg-dosBlack flex justify-between font-dos text-dosYellow">
      {commands.map((cmd) => (
        <div
          key={cmd.name}
          className="flex items-center cursor-pointer hover:bg-dosCyan hover:text-black transition-colors duration-200"
          onClick={() => onCommandClick(cmd)}
          role="button"
          tabIndex={0}
          aria-label={`Command ${cmd.name} (${cmd.number})`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCommandClick(cmd);
            }
          }}
        >
          <span
            className="font-bold"
            style={{ ...typographyStyle, color: '#AAAAAA' }}
          >
            {cmd.number}
          </span>
          <span
            className="text-dosCyan font-bold"
            style={{
              ...typographyStyle,
              color: '#000000',
              paddingRight: '24px',
              backgroundColor: '#00AAAA',
            }}
          >
            {cmd.name}
          </span>
        </div>
      ))}
    </footer>
  </div>
);
