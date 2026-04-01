import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import { cx } from '../utils/cx';

interface Props extends AvatarCustomizeProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function AvatarCategoryNav({
  categories, activeCategory, setActiveCategory, layout, unstyled, classes, classNames, slotProps
}: Props) {
  if (categories.length <= 1 || layout === 'accordion') return null;

  const tabProps = slotProps?.categoryTab || {};
  const tabClass = unstyled ? '' : 'ras-category-tab';

  return (
    <div className={cx(!unstyled ? 'ras-category-nav-wrapper' : undefined, classes?.categoryNav, classNames?.sectionNav)}>
      <div className={!unstyled ? 'ras-category-nav' : ''}>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            {...tabProps}
            className={cx(tabClass, activeCategory === category ? 'active' : undefined, classes?.categoryTab, tabProps.className)}
            onClick={(e) => {
              setActiveCategory(category);
              if (tabProps.onClick) tabProps.onClick(e as any);
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
