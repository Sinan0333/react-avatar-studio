import React from 'react';
import type { AvatarCustomizeProps } from '../types';
import type { AvatarConfig } from 'react-nice-avatar';
import { cx } from '../utils/cx';

interface Props extends AvatarCustomizeProps {
  config: AvatarConfig;
}

export function AvatarFooterActions({
  config, onCancel, onSave, unstyled, classes, classNames, components, slots, slotProps
}: Props) {
  if (!onCancel && !onSave) return null;

  const resolvedSlots = components || slots;
  const Footer = resolvedSlots?.Footer || 'div';

  const footerProps = slotProps?.footer || {};
  const saveBtnProps = slotProps?.saveButton || {};
  const cancelBtnProps = slotProps?.cancelButton || {};

  const footerClass = unstyled ? '' : 'ras-footer-actions';
  const cancelClass = unstyled ? '' : 'ras-btn ras-btn-ghost';
  const saveClass = unstyled ? '' : 'ras-btn ras-btn-primary';

  return (
    <Footer
      {...footerProps}
      className={cx(footerClass, classes?.footer, classNames?.actionBar, footerProps.className)}
    >
      {onCancel && (
        <button
          type="button"
          {...cancelBtnProps}
          className={cx(cancelClass, classes?.actionBtn, cancelBtnProps.className)}
          onClick={(e) => {
            onCancel();
            if (cancelBtnProps.onClick) cancelBtnProps.onClick(e);
          }}
        >
          Cancel
        </button>
      )}
      {onSave && (
        <button
          type="button"
          {...saveBtnProps}
          className={cx(saveClass, classes?.actionBtn, saveBtnProps.className)}
          onClick={async (e) => {
            const helpers = await import('../utils/avatarHelpers');
            const exportData = await helpers.getAvatarData('ras-avatar-download-target');
            onSave({
              config,
              svg: exportData?.svg || '',
              base64: exportData?.base64 || '',
              blob: exportData?.blob || new Blob(),
            });
            if (saveBtnProps.onClick) saveBtnProps.onClick(e);
          }}
        >
          Save Avatar
        </button>
      )}
    </Footer>
  );
}
