import React from "react";
import {PrefooterInput} from "@/components/PrefooterInput";
import { typographyStyle } from '@/styles/typography';

type Command = {
  name: string;
  number: number;
};

type FooterProps = {
  commands: Command[];
};

export const Footer: React.FC<FooterProps> = ({ commands }) => (
    <div className="bg-black">
      <PrefooterInput value={''} onChange={() => {}}/>
      <footer className="w-full bg-dosBlack flex justify-between font-dos text-dosYellow">
        {commands.map(cmd => (
            <div key={cmd.name} className="flex items-center">
              <span className="font-bold" style={{ ...typographyStyle, color: '#AAAAAA' }}>{cmd.number}</span>
              <span className="text-dosCyan font-bold" style={{ ...typographyStyle, color: '#000000', paddingRight: '24px', backgroundColor: '#00AAAA'}}>{cmd.name}</span>
            </div>
        ))}
      </footer>
    </div>
); 