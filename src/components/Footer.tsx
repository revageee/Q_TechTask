import React, { useEffect, useState } from 'react';
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
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.matchMedia('(min-width: 1280px)').matches);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div className="bg-black">
      <PrefooterInput
        value={inputValue}
        onChange={onInputChange}
        onEnter={onEnter}
      />
      <footer
        className="w-full bg-dosBlack flex flex-wrap justify-between font-dos text-dosYellow overflow-x-auto"
        style={{ rowGap: 4 }}
      >
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
              style={{
                ...typographyStyle,
                color: '#AAAAAA',
                fontSize: isLargeScreen ? '36px' : 'clamp(16px,2vw,24px)',
              }}
            >
              {cmd.number}
            </span>
            <span
              className="text-dosCyan font-bold"
              style={{
                ...typographyStyle,
                color: '#000000',
                backgroundColor: '#00AAAA',
                fontSize: isLargeScreen ? '36px' : 'clamp(16px,2vw,28px)',
                paddingRight: isLargeScreen ? '24px' : 'clamp(8px,2vw,24px)',
              }}
            >
              {cmd.name}
            </span>
          </div>
        ))}
      </footer>
    </div>
  );
};
