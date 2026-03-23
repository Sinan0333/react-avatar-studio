import type { AvatarEngine, AvatarSection, AvatarOption } from '../core/AvatarEngine';

export interface AvatarCustomizerProps<TConfig = any> {
  engine?: AvatarEngine<TConfig, any>;
  value?: TConfig;
  defaultValue?: TConfig;
  onChange?: (config: TConfig) => void;
  onSave?: (config: TConfig) => void;
  onCancel?: () => void;
  hiddenSections?: string[];
  sectionOrder?: string[];
  sectionOptionOverrides?: Record<string, string[]>;
  labels?: Record<string, string>;
  className?: string;
}

export interface AvatarCustomizerModalProps<TConfig = any> extends AvatarCustomizerProps<TConfig> {
  open: boolean;
  onClose: () => void;
  modalClassName?: string;
  overlayClassName?: string;
}

export interface AvatarPreviewProps<TConfig = any> {
  engine?: AvatarEngine<TConfig, any>;
  config?: TConfig;
  className?: string;
  style?: React.CSSProperties;
}

export { AvatarEngine, AvatarSection, AvatarOption };
