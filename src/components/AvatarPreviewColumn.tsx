import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import type { AvatarConfig } from 'react-nice-avatar';
import { AvatarPreview } from './AvatarPreview';
import { cx } from '../utils/cx';

interface Props extends AvatarCustomizeProps {
  config: AvatarConfig;
  randomize: () => void;
}

export function AvatarPreviewColumn({
  config, randomize, unstyled, classes, classNames, components, slots, slotProps
}: Props) {
  const resolvedSlots = components || slots;
  const PreviewWrapper = resolvedSlots?.PreviewWrapper || 'div';

  const previewProps = slotProps?.previewWrapper || {};
  const randomizeBtnProps = slotProps?.randomizeButton || {};
  const downloadBtnProps = slotProps?.downloadButton || {};

  const previewClass = unstyled ? '' : 'ras-preview-wrapper';
  const downloadBtnClass = unstyled ? '' : 'ras-btn ras-btn-secondary ras-download-btn';

  return (
    <div className={cx(!unstyled ? 'ras-avatar-column' : undefined, classes?.avatarColumn)}>
      <PreviewWrapper
        {...previewProps}
        className={cx(previewClass, classes?.previewWrapper, classNames?.preview, previewProps.className)}
        style={previewProps.style}
      >
        <AvatarPreview config={config} id="ras-avatar-download-target" className="ras-preview-large" />
      </PreviewWrapper>

      <div className={cx(!unstyled ? 'ras-avatar-actions' : undefined, classNames?.actionBar)}>
        <button
          type="button"
          {...randomizeBtnProps}
          className={cx(!unstyled ? 'ras-btn ras-btn-secondary ras-randomize-btn' : undefined, classes?.actionBtn, randomizeBtnProps.className)}
          onClick={(e) => {
            randomize();
            if (randomizeBtnProps.onClick) randomizeBtnProps.onClick(e);
          }}
        >
          <span className={!unstyled ? 'ras-btn-icon' : ''}>🎲</span> Randomize
        </button>

        <button
          type="button"
          {...downloadBtnProps}
          className={cx(downloadBtnClass, classes?.actionBtn, downloadBtnProps.className)}
          onClick={(e) => {
            import('../utils/avatarHelpers').then(m => m.downloadAvatarAsPng('ras-avatar-download-target', 'my-avatar.png'));
            if (downloadBtnProps.onClick) downloadBtnProps.onClick(e);
          }}
        >
          <span className={!unstyled ? 'ras-btn-icon' : ''}>⬇️</span> Download
        </button>
      </div>
    </div>
  );
}
