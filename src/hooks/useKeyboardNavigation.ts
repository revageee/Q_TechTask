import React, { useCallback } from 'react';

export type NavigationConfig = {
  type: 'header' | 'leftPanel' | 'rightPanel';
  items: any[];
  selectedIndex: number | number[];
  onIndexChange: (index: number | number[]) => void;
  onItemSelect?: (item: any, index: number) => void;
  onPanelActive?: (active: boolean) => void;
  onDropdownToggle?: () => void;
  onOutsideClick?: () => void;
  activeDropdown?: boolean;
  dropdownIndex?: number;
  onDropdownIndexChange?: ((index: number) => void) | React.Dispatch<React.SetStateAction<number>>;
  onDropdownClick?: (index: number) => void;
  columns?: any[];
  selectedCol?: number;
  onColChange?: (col: number) => void;
};

export const useKeyboardNavigation = (config: NavigationConfig) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const {
        type,
        items,
        selectedIndex,
        onIndexChange,
        onItemSelect,
        onPanelActive,
        onDropdownToggle,
        onOutsideClick,
        activeDropdown,
        dropdownIndex = 0,
        onDropdownIndexChange,
        onDropdownClick,
        columns,
        selectedCol = -1,
        onColChange,
      } = config;

      // Header navigation
      if (type === 'header') {
        const isDropdownActive = activeDropdown;
        const currentIndex = selectedIndex as number;

        const menuActions: Record<string, () => void> = {
          ArrowRight: () => onIndexChange((currentIndex + 1) % items.length),
          ArrowLeft: () => onIndexChange((currentIndex - 1 + items.length) % items.length),
          Enter: () => {
            if (items[currentIndex]?.dropdown) {
              onDropdownToggle?.();
            }
          },
        };

        const dropdownActions: Record<string, () => void> = {
          ArrowDown: () => onDropdownIndexChange?.((dropdownIndex + 1) % items.length),
          ArrowUp: () => onDropdownIndexChange?.((dropdownIndex - 1 + items.length) % items.length),
          Enter: () => {
            onDropdownClick?.(dropdownIndex);
            onOutsideClick?.();
          },
          Escape: () => onOutsideClick?.(),
        };

        const actions = isDropdownActive ? dropdownActions : menuActions;
        const action = actions[e.key];

        if (action) {
          action();
          e.preventDefault();
        }
        return;
      }

      // LeftPanel navigation
      if (type === 'leftPanel') {
        const currentIndex = selectedIndex as number;

        const actions: Record<string, () => void> = {
          ArrowDown: () => {
            const newIdx = Math.min(currentIndex + 1, items.length - 1);
            onIndexChange(newIdx);
            if (onItemSelect) {
              onItemSelect(items[newIdx], newIdx);
            }
          },
          ArrowUp: () => {
            const newIdx = Math.max(currentIndex - 1, -1);
            onIndexChange(newIdx);
            if (newIdx >= 0 && onItemSelect) {
              onItemSelect(items[newIdx], newIdx);
            }
          },
          Enter: () => {
            if (currentIndex === -1) {
              onIndexChange(0);
              if (onItemSelect) {
                onItemSelect(items[0], 0);
              }
            } else if (currentIndex >= 0) {
              if (onPanelActive) {
                onPanelActive(false);
              }
            }
          },
          Backspace: () => {
            if (currentIndex > -1) onIndexChange(-1);
          },
          Escape: () => {
            if (currentIndex > -1) onIndexChange(-1);
          },
          F10: () => {
            if (onPanelActive) {
              onPanelActive(false);
            }
          },
        };

        const action = actions[e.key];
        if (action) {
          action();
          e.preventDefault();
        }
        return;
      }

      // RightPanel navigation
      if (type === 'rightPanel') {
        if (selectedCol === -1 && e.key === 'Enter') {
          onColChange?.(0);
          e.preventDefault();
          return;
        }

        if (selectedCol > -1 && columns) {
          const colLength = columns[selectedCol]?.items.length ?? 0;
          const currentIndices = selectedIndex as number[];

          const actions: Record<string, () => void> = {
            ArrowDown: () => {
              const newIndices = currentIndices.map((v, i) =>
                i === selectedCol ? Math.min(v + 1, colLength - 1) : v
              );
              onIndexChange(newIndices);
            },
            ArrowUp: () => {
              const newIndices = currentIndices.map((v, i) =>
                i === selectedCol ? Math.max(v - 1, 0) : v
              );
              onIndexChange(newIndices);
            },
            ArrowLeft: () => {
              if (selectedCol > 0) onColChange?.(selectedCol - 1);
            },
            ArrowRight: () => {
              if (selectedCol < columns.length - 1) onColChange?.(selectedCol + 1);
            },
            Enter: () => {
              if (currentIndices[selectedCol] === 0) {
                onColChange?.(-1);
                if (onPanelActive) {
                  onPanelActive(false);
                }
              }
            },
            Backspace: () => onColChange?.(-1),
            Escape: () => {
              onColChange?.(-1);
              if (onPanelActive) {
                onPanelActive(false);
              }
            },
            F10: () => {
              if (onPanelActive) {
                onPanelActive(false);
              }
            },
          };

          const action = actions[e.key];
          if (action) {
            action();
            e.preventDefault();
          }
        }
      }
    },
    [config]
  );

  return { handleKeyDown };
}; 