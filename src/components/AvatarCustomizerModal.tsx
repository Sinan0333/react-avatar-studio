import React, { useEffect, useRef } from 'react';
import type { AvatarCustomizerModalProps } from '../types';
import { AvatarCustomizerInline } from './AvatarCustomizerInline';
import '../styles/index.css';

export function AvatarCustomizerModal<TConfig = any>(props: AvatarCustomizerModalProps<TConfig>) {
  const { open, onClose, modalClassName, overlayClassName, ...inlineProps } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Optional: Prevent body scroll here
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`ras-modal-overlay ${overlayClassName || ''}`}>
      <div 
        className="ras-modal-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`ras-modal-content ${modalClassName || ''}`} 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <div className="ras-modal-header">
          <h2 className="ras-modal-title">Customize Avatar</h2>
          <button className="ras-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ras-modal-body">
          <AvatarCustomizerInline
            {...inlineProps}
            onCancel={() => {
              if (inlineProps.onCancel) inlineProps.onCancel();
              onClose();
            }}
            onSave={(config) => {
              if (inlineProps.onSave) inlineProps.onSave(config);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AvatarCustomizerModal;
