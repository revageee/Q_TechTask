import type { CSSProperties } from 'react';

// Panel styles
export const dosPanelHeaderStyle: CSSProperties = {
  background: '#55FFFF',
  height: 32,
};

export const dosPanelStyle: CSSProperties = {
  background: '#0000AA',
  borderLeft: '4px solid #55FFFF',
  borderBottom: '4px solid #55FFFF',
  borderRight: '4px solid #55FFFF',
};

export const dosLeftPanelStyle: CSSProperties = {
  background: '#0000AA',
  borderRight: '4px solid #55FFFF',
  borderBottom: '4px solid #55FFFF',
  borderLeft: '4px solid #55FFFF',
};

export const dosPanelContentStyle: CSSProperties = {
  borderRight: '4px solid #55FFFF',
  borderBottom: '2px solid #55FFFF',
  borderLeft: '2px solid #55FFFF',
};

export const dosPanelBottomStyle: CSSProperties = {
  borderTop: '2px solid #55FFFF',
  color: '#55FFFF',
  background: 'transparent',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontSize: 32,
  lineHeight: '100%',
  letterSpacing: 0,
};

// Button styles
export const dosButtonStyle: CSSProperties = {
  background: 'transparent',
  color: '#0000AA',
  fontWeight: 400,
  fontSize: 36,
  lineHeight: '100%',
  letterSpacing: 0,
  fontFamily: 'ModernDOS8x16',
  border: 'none',
  cursor: 'pointer',
};

export const dosButtonSelectedStyle: CSSProperties = {
  background: '#0000AA',
  color: '#55FFFF',
};

export const dosButtonSmallStyle: CSSProperties = {
  ...dosButtonStyle,
  fontSize: 32,
};

// Header styles
export const dosHeaderStyle: CSSProperties = {
  background: '#00AAAA',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontSize: 36,
  lineHeight: '100%',
  letterSpacing: 0,
};

export const dosMenuButtonStyle: CSSProperties = {
  background: 'transparent',
  color: '#000',
  border: 'none',
  borderRadius: 0,
  position: 'relative',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontSize: 'clamp(20px, 2.5vw, 36px)',
  lineHeight: '100%',
  letterSpacing: 0,
  height: '100%',
  cursor: 'pointer',
};

export const dosMenuButtonActiveStyle: CSSProperties = {
  background: '#000',
  color: '#FFF',
};

export const dosDropdownStyle: CSSProperties = {
  background: '#00AAAA',
};

export const dosDropdownItemStyle: CSSProperties = {
  background: 'transparent',
  color: '#000',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: 'clamp(16px, 2vw, 32px)',
  lineHeight: '100%',
  letterSpacing: 0,
  height: 'clamp(32px, 4vw, 40px)',
  cursor: 'pointer',
  marginBottom: 'clamp(1px, 0.1vw, 2px)',
  border: 'none',
  textAlign: 'left',
};

export const dosDropdownItemSelectedStyle: CSSProperties = {
  background: '#000',
  color: '#FFF',
};

// Panel title styles
export const dosPanelTitleStyle: CSSProperties = {
  color: '#FFFF55',
  fontWeight: 400,
  fontSize: 32,
  background: 'transparent',
  padding: '2px 0',
  fontFamily: 'ModernDOS8x16',
  lineHeight: '100%',
  letterSpacing: 0,
  textAlign: 'center',
};

// Tree styles for LeftPanel
export const dosTreeIconStyle: CSSProperties = {
  position: 'absolute',
  left: 12,
  top: 32,
  width: 48,
  height: 32,
  background: '#55FFFF',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 2,
  boxSizing: 'border-box',
};

export const dosTreeIconTextStyle: CSSProperties = {
  color: '#FFFF55',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontSize: 40,
  lineHeight: '100%',
  letterSpacing: 0,
  userSelect: 'none',
};

export const dosTreeListStyle: CSSProperties = {
  padding: '0px 8px',
  fontFamily: 'ModernDOS8x16',
  fontWeight: 400,
  fontSize: 32,
  lineHeight: '100%',
  letterSpacing: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
  position: 'relative',
  top: 30,
  left: 10,
};

export const dosTreeItemStyle: CSSProperties = {
  width: '99%',
  display: 'flex',
  position: 'relative',
  height: 48,
};

export const dosTreeLineStyle: CSSProperties = {
  width: 32,
  height: 48,
  borderLeft: '4px solid #55FFFF',
  marginRight: 8,
  marginLeft: 8,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

export const dosTreeLineLastStyle: CSSProperties = {
  ...dosTreeLineStyle,
  height: 28,
};

export const dosTreeLineTopStyle: CSSProperties = {
  width: 28,
  height: 0,
  borderTop: '4px solid #55FFFF',
  position: 'absolute',
  left: 0,
  top: 24,
};

// Divider styles
export const dosDividerStyle: CSSProperties = {
  width: 4,
  background: '#55FFFF',
  minHeight: '100%',
};

// Hotkey styles
export const dosHotkeyStyle: CSSProperties = {
  color: '#FFF',
  marginLeft: 'clamp(8px, 1vw, 16px)',
  fontSize: 'clamp(14px, 1.8vw, 28px)',
};

// Dropdown border style
export const dosDropdownBorderStyle: CSSProperties = {
  border: 'clamp(2px, 0.3vw, 4px) solid #000',
  padding: 'clamp(4px, 0.5vw, 8px)',
  margin: 'clamp(2px, 0.3vw, 5px)',
};
