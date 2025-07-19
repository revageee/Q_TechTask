// Types
export type DropdownItem = {
  label: string;
  hotkey?: string;
};

export type MenuItem = {
  label: string;
  dropdown?: DropdownItem[];
};

export type FileItem = {
  name: string;
  format?: string;
  active?: boolean;
};

export type Column = {
  title: string;
  items: FileItem[];
};

export type FolderData = {
  title: string;
  columns: Column[];
  bottomText: string;
};

export type FooterCommand = {
  name: string;
  number: number;
};

// Header constants
export const HEADER_DATA: MenuItem[] = [
  {
    label: 'File',
    dropdown: [
      { label: 'NCD Tree', hotkey: 'Alt+F4' },
      { label: 'Exit', hotkey: 'Esc' },
    ],
  },
  { label: 'Disk' },
  { label: 'Commands' },
];

export const FILE_DROPDOWN_ITEMS: DropdownItem[] = [
  { label: 'NCD Tree', hotkey: 'Alt+F4' },
  { label: 'Exit', hotkey: 'Esc' },
];

// Left panel constants
export const LEFT_PANEL_ITEMS = ['DOS', 'TOOLS', 'XTGOLD', 'LAPLINK', 'DN'];

export const LEFT_PANEL_DATA = {
  title: '',
  items: LEFT_PANEL_ITEMS,
  bottomText: 'C:\\',
};

// Folder data constants
export const FOLDER_DATA: Record<string, FolderData> = {
  DOS: {
    title: 'DOS',
    columns: [
      {
        title: 'Name',
        items: [
          { name: 'DOS' },
          { name: 'command', format: 'com' },
          { name: 'format', format: 'com' },
          { name: 'chkdsk', format: 'com' },
          { name: 'sys', format: 'com' },
          { name: 'fdisk', format: 'com' },
          { name: 'debug', format: 'exe' },
        ],
      },
      {
        title: 'Name',
        items: [],
      },
      {
        title: 'Name',
        items: [],
      },
    ],
    bottomText: 'DOS',
  },
  TOOLS: {
    title: 'TOOLS',
    columns: [
      {
        title: 'Name',
        items: [
          { name: 'TOOLS' },
          { name: 'norton', format: 'exe' },
          { name: 'pctools', format: 'exe' },
          { name: 'defrag', format: 'exe' },
          { name: 'scandisk', format: 'exe' },
        ],
      },
      {
        title: 'Name',
        items: [],
      },
      {
        title: 'Name',
        items: [],
      },
    ],
    bottomText: 'TOOLS',
  },
  XTGOLD: {
    title: 'XTGOLD',
    columns: [
      {
        title: 'Name',
        items: [
          { name: 'XTGOLD' },
          { name: 'xtgold', format: 'exe' },
          { name: 'config', format: 'cfg' },
          { name: 'setup', format: 'exe' },
        ],
      },
      {
        title: 'Name',
        items: [],
      },
      {
        title: 'Name',
        items: [],
      },
    ],
    bottomText: 'XTGOLD',
  },
  LAPLINK: {
    title: 'LAPLINK',
    columns: [
      {
        title: 'Name',
        items: [
          { name: 'LAPLINK' },
          { name: 'laplink', format: 'exe' },
          { name: 'll3', format: 'exe' },
          { name: 'll5', format: 'exe' },
        ],
      },
      {
        title: 'Name',
        items: [],
      },
      {
        title: 'Name',
        items: [],
      },
    ],
    bottomText: 'LAPLINK',
  },
  DN: {
    title: 'DN',
    columns: [
      {
        title: 'Name',
        items: [
          { name: 'DN' },
          { name: 'autoexec', format: 'bat' },
          { name: 'command', format: 'com' },
          { name: 'config', format: 'sys' },
          { name: 'Io', format: 'sys' },
          { name: '11Pro', format: 'sys' },
          { name: 'Msdod', format: 'sys' },
        ],
      },
      {
        title: 'Name',
        items: [],
      },
      {
        title: 'Name',
        items: [],
      },
    ],
    bottomText: 'DN',
  },
};

// Footer constants
export const FOOTER_DATA: FooterCommand[] = [
  { name: 'Help', number: 1 },
  { name: 'Menu', number: 2 },
  { name: 'View', number: 3 },
  { name: 'Edit', number: 4 },
  { name: 'Copy', number: 5 },
  { name: 'RemMov', number: 6 },
  { name: 'Mkdir', number: 7 },
  { name: 'Delete', number: 8 },
  { name: 'PullDn', number: 9 },
  { name: 'Quit', number: 10 },
];

// Default values
export const DEFAULT_SELECTED_FOLDER = 'DN';
export const DEFAULT_SELECTED_INDEX = 4; // DN index in LEFT_PANEL_ITEMS 