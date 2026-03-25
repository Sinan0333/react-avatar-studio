import type { AvatarEngine, AvatarSection, AvatarOption } from '../core/AvatarEngine';

export interface AvatarStudioTheme {
  primary?: string;
  primaryHover?: string;
  bg?: string;
  surface?: string;
  surfaceHover?: string;
  border?: string;
  textMain?: string;
  textMuted?: string;
  shadowSm?: string;
  shadowMd?: string;
  shadowLg?: string;
  font?: string;
}

export interface AvatarStudioClasses {
  container?: string;
  previewWrapper?: string;
  avatarColumn?: string;
  settingsColumn?: string;
  categoryNav?: string;
  categoryTab?: string;
  sectionBlock?: string;
  sectionTitle?: string;
  optionsGrid?: string;
  optionBtn?: string;
  colorBtn?: string;
  footer?: string;
  actionBtn?: string;
}

export interface AvatarExportData<TConfig = any> {
  config: TConfig;
  svg: string;
  pngDataUrl: string;
}

export interface AvatarCustomizerProps<TConfig = any> {
  engine?: AvatarEngine<TConfig, any>;
  value?: TConfig;
  defaultValue?: TConfig;
  onChange?: (config: TConfig) => void;
  onSave?: (config: TConfig, exportData: AvatarExportData<TConfig>) => void;
  onCancel?: () => void;
  hiddenSections?: string[];
  sectionOrder?: string[];
  sectionOptionOverrides?: Record<string, string[]>;
  labels?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
  theme?: AvatarStudioTheme;
  classes?: AvatarStudioClasses;
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
  id?: string;
}

export { AvatarEngine, AvatarSection, AvatarOption };
