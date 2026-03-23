import React from 'react';
import type { AvatarCustomizerProps } from '../types';
import { useAvatarCustomizer } from '../hooks/useAvatarCustomizer';
import { AvatarPreview } from './AvatarPreview';
import '../styles/index.css';

export function AvatarCustomizerInline<TConfig = any>(props: AvatarCustomizerProps<TConfig>) {
  const {
    engine,
    config,
    sections,
    activeSectionId,
    setActiveSectionId,
    handleOptionChange,
    randomize,
  } = useAvatarCustomizer(props);

  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className={`ras-container ${props.className || ''}`}>
      <div className="ras-preview-area">
        <AvatarPreview engine={engine} config={config} className="ras-preview-large" />
      </div>

      <div className="ras-controls-area">
        <div className="ras-sections-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`ras-section-btn ${activeSectionId === section.id ? 'active' : ''}`}
              onClick={() => setActiveSectionId(section.id)}
            >
              {props.labels?.[section.id] || section.label}
            </button>
          ))}
        </div>

        <div className="ras-options-panel">
          {activeSection && (
            <div className="ras-options-grid">
              {activeSection.options.map(option => {
                const isSelected = (config as any)[activeSection.id] === option.value;
                
                if (activeSection.type === 'color') {
                  return (
                    <button
                      key={String(option.value)}
                      className={`ras-color-btn ${isSelected ? 'active' : ''}`}
                      style={{ backgroundColor: option.colorHex || String(option.value) }}
                      onClick={() => handleOptionChange(activeSection.id, option.value)}
                      title={option.label}
                    />
                  );
                }

                return (
                  <button
                    key={String(option.value)}
                    className={`ras-option-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleOptionChange(activeSection.id, option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="ras-actions-area">
        <button className="ras-action-btn ras-randomize-btn" onClick={randomize}>
          Randomize
        </button>
        {props.onCancel && (
          <button className="ras-action-btn ras-cancel-btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.onSave && (
          <button className="ras-action-btn ras-save-btn" onClick={() => props.onSave!(config as TConfig)}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default AvatarCustomizerInline;
