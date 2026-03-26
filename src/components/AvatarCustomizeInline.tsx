import React, { useState, useMemo, useEffect } from 'react';
import type { AvatarCustomizeProps } from '../types';
import { useAvatarCustomize } from '../hooks/useAvatarCustomize';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { cx } from '../utils/cx';
import { AvatarPreviewColumn } from './AvatarPreviewColumn';
import { AvatarCategoryNav } from './AvatarCategoryNav';
import { AvatarSectionList } from './AvatarSectionList';
import { AvatarFooterActions } from './AvatarFooterActions';
import '../styles/index.css';

export function AvatarCustomizeInline(props: AvatarCustomizeProps) {
  const { config, sections, handleOptionChange, randomize } = useAvatarCustomize(props);

  const {
    theme, classes, classNames, style, className,
    unstyled = false, layout = 'sidebar', previewPosition = 'left',
  } = props;

  const themeStyles = useThemeStyles(theme);
  const containerStyle = { ...style, ...themeStyles };

  const categories = useMemo(() => {
    const cats: string[] = [];
    sections.forEach((s: any) => {
      const group = s.group || 'General';
      if (!cats.includes(group)) cats.push(group);
    });
    return cats;
  }, [sections]);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || 'General');

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const activeSections = useMemo(
    () => sections.filter((s: any) => (s.group || 'General') === activeCategory),
    [sections, activeCategory],
  );

  const displaySections = layout === 'accordion' ? sections : activeSections;

  const rootProps = props.slotProps?.root || {};
  const containerClass = unstyled ? '' : `ras-container ${theme === 'dark' ? 'ras-theme-dark' : 'ras-theme-light'}`;
  const layoutClass = unstyled ? '' : 'ras-layout';
  const settingsClass = unstyled ? '' : 'ras-settings-column';

  return (
    <div
      {...rootProps}
      className={cx(containerClass, className, classes?.container, classNames?.root, rootProps.className)}
      style={{ ...containerStyle, ...rootProps.style }}
      data-layout={layout}
      data-preview={previewPosition}
    >
      <div className={layoutClass}>
        <AvatarPreviewColumn {...props} config={config} randomize={randomize} />

        <div className={cx(settingsClass, classes?.settingsColumn)}>
          <AvatarCategoryNav
            {...props}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <AvatarSectionList
            {...props}
            config={config}
            displaySections={displaySections}
            handleOptionChange={handleOptionChange}
            cx={cx}
          />
          <AvatarFooterActions {...props} config={config} />
        </div>
      </div>
    </div>
  );
}

export default AvatarCustomizeInline;
