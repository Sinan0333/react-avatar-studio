import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import type { AvatarConfig } from 'react-nice-avatar';
import { cx } from '../utils/cx';

interface Props extends Pick<AvatarCustomizeProps,
  'classes' | 'classNames' | 'components' | 'slots' | 'slotProps' | 'unstyled' | 'columns'
> {
  config: AvatarConfig;
  section: any;
  handleOptionChange: (sectionId: string, value: string | number) => void;
}

export function AvatarOptionGrid({
  config, section, handleOptionChange, unstyled, columns,
  classes, classNames, components, slots, slotProps
}: Props) {
  const resolvedSlots = components || slots;
  const OptionButton = resolvedSlots?.OptionButton || (resolvedSlots as any)?.Button || 'button';

  const optionBtnProps = slotProps?.optionButton || {};
  const colorBtnProps = slotProps?.colorButton || {};

  const gridClass = unstyled ? '' : 'ras-options-grid';
  const optionBtnClass = unstyled ? '' : 'ras-option-btn';
  const colorBtnClass = unstyled ? '' : 'ras-color-btn';
  const gridStyle = columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined;

  return (
    <div
      className={cx(gridClass, section.type === 'color' && !unstyled ? 'ras-options-color' : undefined, classes?.optionsGrid)}
      style={gridStyle}
    >
      {section.options.map((option: any) => {
        const isSelected = (config as any)[section.id] === option.value;

        if (section.type === 'color') {
          return (
            <OptionButton
              key={String(option.value)}
              {...colorBtnProps}
              className={cx(colorBtnClass, isSelected ? 'active' : undefined, classes?.colorBtn, classNames?.optionButton, colorBtnProps.className)}
              style={{ backgroundColor: option.colorHex || String(option.value), ...colorBtnProps.style }}
              onClick={(e: any) => {
                handleOptionChange(section.id, option.value);
                if (colorBtnProps.onClick) colorBtnProps.onClick(e);
              }}
              title={option.label}
              aria-label={option.label}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <span className={!unstyled ? 'ras-color-check' : ''}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </OptionButton>
          );
        }

        return (
          <OptionButton
            key={String(option.value)}
            {...optionBtnProps}
            className={cx(optionBtnClass, isSelected ? 'active' : undefined, classes?.optionBtn, classNames?.optionButton, optionBtnProps.className)}
            onClick={(e: any) => {
              handleOptionChange(section.id, option.value);
              if (optionBtnProps.onClick) optionBtnProps.onClick(e);
            }}
            aria-pressed={isSelected}
          >
            {option.label}
          </OptionButton>
        );
      })}
    </div>
  );
}
