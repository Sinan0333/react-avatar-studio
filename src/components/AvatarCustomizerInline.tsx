import React, { useState, useMemo, useEffect } from 'react';
import type { AvatarCustomizerProps } from '../types';
import { useAvatarCustomizer } from '../hooks/useAvatarCustomizer';
import { AvatarPreview } from './AvatarPreview';
import '../styles/index.css';

export function AvatarCustomizerInline<TConfig = any>(props: AvatarCustomizerProps<TConfig>) {
  const {
    engine,
    config,
    sections,
    handleOptionChange,
    randomize,
  } = useAvatarCustomizer(props);

  const { theme, classes, style, className } = props;

  // Transform theme object into CSS custom properties
  const themeStyles = useMemo(() => {
    const s: any = {};
    if (theme?.primary) s['--ras-primary'] = theme.primary;
    if (theme?.primaryHover) s['--ras-primary-hover'] = theme.primaryHover;
    if (theme?.bg) s['--ras-bg'] = theme.bg;
    if (theme?.surface) s['--ras-surface'] = theme.surface;
    if (theme?.surfaceHover) s['--ras-surface-hover'] = theme.surfaceHover;
    if (theme?.border) s['--ras-border'] = theme.border;
    if (theme?.textMain) s['--ras-text-main'] = theme.textMain;
    if (theme?.textMuted) s['--ras-text-muted'] = theme.textMuted;
    if (theme?.shadowSm) s['--ras-shadow-sm'] = theme.shadowSm;
    if (theme?.shadowMd) s['--ras-shadow-md'] = theme.shadowMd;
    if (theme?.shadowLg) s['--ras-shadow-lg'] = theme.shadowLg;
    if (theme?.font) s['--ras-font'] = theme.font;
    return s;
  }, [theme]);

  const containerStyle = { ...style, ...themeStyles };

  // Group sections by category
  const categories = useMemo(() => {
    const cats: string[] = [];
    sections.forEach(s => {
      const group = s.group || 'General';
      if (!cats.includes(group)) cats.push(group);
    });
    return cats;
  }, [sections]);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || 'General');

  // Update active category if categories change and active is no longer valid
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const activeSections = useMemo(() => {
    return sections.filter(s => (s.group || 'General') === activeCategory);
  }, [sections, activeCategory]);

  return (
    <div className={`ras-container ${className || ''} ${classes?.container || ''}`} style={containerStyle}>
      <div className="ras-layout">
        
        {/* Left Column: Avatar Preview */}
        <div className={`ras-avatar-column ${classes?.avatarColumn || ''}`}>
          <div className={`ras-preview-wrapper ${classes?.previewWrapper || ''}`}>
            <AvatarPreview engine={engine} config={config} id="ras-avatar-download-target" className="ras-preview-large" />
          </div>
          <div className="ras-avatar-actions">
            <button className={`ras-btn ras-btn-secondary ras-randomize-btn ${classes?.actionBtn || ''}`} onClick={randomize}>
              <span className="ras-btn-icon">🎲</span> Randomize
            </button>
            <button 
              className={`ras-btn ras-btn-secondary ras-download-btn ${classes?.actionBtn || ''}`} 
              onClick={() => {
                import('../utils/avatarHelpers').then(module => {
                  module.downloadAvatarAsPng('ras-avatar-download-target', 'my-avatar.png');
                });
              }}
            >
              <span className="ras-btn-icon">⬇️</span> Download
            </button>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className={`ras-settings-column ${classes?.settingsColumn || ''}`}>
          
          {/* Category Tabs */}
          {categories.length > 1 && (
            <div className={`ras-category-nav-wrapper ${classes?.categoryNav || ''}`}>
              <div className="ras-category-nav">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`ras-category-tab ${activeCategory === category ? 'active' : ''} ${classes?.categoryTab || ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Category Sections */}
          <div className="ras-category-content">
            {activeSections.map(section => (
              <div key={section.id} className={`ras-section-block ${classes?.sectionBlock || ''}`}>
                <div className="ras-section-header">
                  <h3 className={`ras-section-title ${classes?.sectionTitle || ''}`}>{props.labels?.[section.id] || section.label}</h3>
                  {section.description && <p className="ras-section-desc">{section.description}</p>}
                </div>
                
                <div className={`ras-options-grid ${section.type === 'color' ? 'ras-options-color' : ''} ${classes?.optionsGrid || ''}`}>
                  {section.options.map(option => {
                    const isSelected = (config as any)[section.id] === option.value;
                    
                    if (section.type === 'color') {
                      return (
                        <button
                          key={String(option.value)}
                          className={`ras-color-btn ${isSelected ? 'active' : ''} ${classes?.colorBtn || ''}`}
                          style={{ backgroundColor: option.colorHex || String(option.value) }}
                          onClick={() => handleOptionChange(section.id, option.value)}
                          title={option.label}
                          aria-label={option.label}
                          aria-pressed={isSelected}
                        >
                          {isSelected && (
                            <span className="ras-color-check">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={String(option.value)}
                        className={`ras-option-btn ${isSelected ? 'active' : ''} ${classes?.optionBtn || ''}`}
                        onClick={() => handleOptionChange(section.id, option.value)}
                        aria-pressed={isSelected}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          {(props.onCancel || props.onSave) && (
            <div className={`ras-footer-actions ${classes?.footer || ''}`}>
              {props.onCancel && (
                <button className={`ras-btn ras-btn-ghost ${classes?.actionBtn || ''}`} onClick={props.onCancel}>
                  Cancel
                </button>
              )}
              {props.onSave && (
                <button 
                  className={`ras-btn ras-btn-primary ${classes?.actionBtn || ''}`} 
                  onClick={async () => {
                    const helpers = await import('../utils/avatarHelpers');
                    const exportData = await helpers.getAvatarData('ras-avatar-download-target');
                    props.onSave!(config as TConfig, {
                      config: config as TConfig,
                      svg: exportData?.svg || '',
                      pngDataUrl: exportData?.pngDataUrl || ''
                    });
                  }}
                >
                  Save Avatar
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AvatarCustomizerInline;
