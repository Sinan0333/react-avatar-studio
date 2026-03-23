export type AvatarOptionType = 'select' | 'color' | 'toggle';

export interface AvatarOption<TOptionValue = string> {
  value: TOptionValue;
  label: string;
  colorHex?: string; // Optional hex for color pickers
}

export interface AvatarSection<TOptionValue = string> {
  id: string;
  label: string;
  type: AvatarOptionType;
  options: AvatarOption<TOptionValue>[];
  defaultValue: TOptionValue;
  allowMultiple?: boolean;
  hidden?: boolean;
  description?: string;
}

export interface AvatarEngine<TConfig = Record<string, any>, TOptions = any> {
  id: string;
  displayName: string;
  render: (config: TConfig, props?: any) => React.ReactNode;
  getDefaultConfig: () => TConfig;
  getSections: () => AvatarSection[];
  validateConfig: (config: any) => boolean;
  normalizeConfig: (config: any) => TConfig;
  randomizeConfig: (partial?: Partial<TConfig>) => TConfig;
}
