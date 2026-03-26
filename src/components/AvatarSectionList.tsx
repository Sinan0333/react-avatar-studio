import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import type { AvatarConfig } from 'react-nice-avatar';
import { AvatarSection } from './AvatarSection';

interface Props extends AvatarCustomizeProps {
  config: AvatarConfig;
  displaySections: any[];
  handleOptionChange: (sectionId: string, value: string | number) => void;
  cx: (...names: (string | undefined)[]) => string | undefined;
}

export function AvatarSectionList({
  config, displaySections, handleOptionChange, unstyled,
  classes, classNames, components, slots, slotProps,
  labels, sectionOptionOverrides, columns, cx
}: Props) {
  return (
    <div className={!unstyled ? 'ras-category-content' : ''}>
      {displaySections.map((section: any) => (
        <AvatarSection
          key={section.id}
          config={config}
          section={section}
          handleOptionChange={handleOptionChange}
          unstyled={unstyled}
          columns={columns}
          classes={classes}
          classNames={classNames}
          components={components}
          slots={slots}
          slotProps={slotProps}
          labels={labels}
          sectionOptionOverrides={sectionOptionOverrides}
        />
      ))}
    </div>
  );
}
