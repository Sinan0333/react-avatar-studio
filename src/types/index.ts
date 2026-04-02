import { AvatarConfig } from 'react-nice-avatar';

export type AvatarStudioTheme = 'light' | 'dark' | Record<string, string>;

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

export interface AvatarCustomizeClassNames {
  root?: string;
  preview?: string;
  sectionNav?: string;
  optionButton?: string;
  actionBar?: string;
}

export interface AvatarCustomizeComponents {
  SectionWrapper?: React.ElementType;
  SectionHeader?: React.ElementType;
  OptionButton?: React.ElementType;
  Footer?: React.ElementType;
  PreviewWrapper?: React.ElementType;
  Modal?: React.ElementType;
  Tabs?: React.ElementType;
  TabButton?: React.ElementType;
  Button?: React.ElementType;
}

export interface AvatarCustomizeSlotProps {
  root?: React.HTMLAttributes<HTMLDivElement>;
  previewWrapper?: React.HTMLAttributes<HTMLDivElement>;
  optionButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  colorButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  categoryTab?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  saveButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  randomizeButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  downloadButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  sectionHeader?: React.HTMLAttributes<HTMLDivElement>;
  sectionWrapper?: React.HTMLAttributes<HTMLDivElement>;
  footer?: React.HTMLAttributes<HTMLDivElement>;
}

export interface AvatarExportData {
  config: AvatarConfig;
  svg: string;
  base64: string;
  blob: Blob;
}

export interface AvatarCustomizeProps {
  value?: AvatarConfig;
  defaultValue?: AvatarConfig;
  onChange?: (config: AvatarConfig) => void;
  onSave?: (exportData: AvatarExportData) => void;
  onCancel?: () => void;
  hiddenSections?: string[];
  sectionOrder?: string[];
  sectionOptionOverrides?: Record<string, string[]>;
  labels?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
  theme?: AvatarStudioTheme;
  classes?: AvatarStudioClasses;
  classNames?: AvatarCustomizeClassNames;
  slots?: AvatarCustomizeComponents; // Alias for backwards compatibility internally
  components?: AvatarCustomizeComponents;
  slotProps?: AvatarCustomizeSlotProps;
  unstyled?: boolean;
  layout?: 'sidebar' | 'tabs' | 'accordion';
  previewPosition?: 'top' | 'left' | 'right' | 'bottom';
  columns?: number;
}

export interface AvatarCustomizeModalProps extends AvatarCustomizeProps {
  open: boolean;
  onClose: () => void;
  modalClassName?: string;
  overlayClassName?: string;
}

export interface AvatarPreviewProps {
  config?: AvatarConfig;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
