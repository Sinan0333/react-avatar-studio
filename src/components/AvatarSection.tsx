import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import type { AvatarConfig } from 'react-nice-avatar';
import { AvatarOptionGrid } from './AvatarOptionGrid';
import { cx } from '../utils/cx';

interface Props extends Pick<AvatarCustomizeProps,
  'classes' | 'classNames' | 'components' | 'slots' | 'slotProps' | 'unstyled' | 'columns' | 'labels' | 'sectionOptionOverrides'
> {
  config: AvatarConfig;
  section: any;
  handleOptionChange: (sectionId: string, value: string | number) => void;
}

export function AvatarSection({
  config, section, handleOptionChange, unstyled, labels,
  sectionOptionOverrides, classes, classNames, components, slots, slotProps, columns
}: Props) {
  const resolvedSlots = components || slots;
  const SectionWrapper = resolvedSlots?.SectionWrapper || 'div';
  const SectionHeader = resolvedSlots?.SectionHeader || 'div';

  const sectionWrapperProps = slotProps?.sectionWrapper || {};
  const sectionHeaderProps = slotProps?.sectionHeader || {};

  const wrapperClass = unstyled ? '' : 'ras-section-block';
  const headerClass = unstyled ? '' : 'ras-section-header';
  const titleClass = unstyled ? '' : 'ras-section-title';
  const descClass = unstyled ? '' : 'ras-section-desc';

  const overrides = sectionOptionOverrides?.[section.id];
  const filteredSection = overrides
    ? { ...section, options: section.options.filter((o: any) => overrides.includes(o.value)) }
    : section;

  return (
    <SectionWrapper
      {...sectionWrapperProps}
      className={cx(wrapperClass, classes?.sectionBlock, sectionWrapperProps.className)}
    >
      <SectionHeader
        {...sectionHeaderProps}
        className={cx(headerClass, sectionHeaderProps.className)}
      >
        <h3 className={cx(titleClass, classes?.sectionTitle)}>
          {labels?.[section.id] || section.label}
        </h3>
        {section.description && <p className={descClass}>{section.description}</p>}
      </SectionHeader>

      <AvatarOptionGrid
        config={config}
        section={filteredSection}
        handleOptionChange={handleOptionChange}
        unstyled={unstyled}
        columns={columns}
        classes={classes}
        classNames={classNames}
        components={components}
        slots={slots}
        slotProps={slotProps}
      />
    </SectionWrapper>
  );
}
