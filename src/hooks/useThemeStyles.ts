import { useMemo } from 'react';
import type { AvatarStudioTheme } from '../types';

export function useThemeStyles(theme: AvatarStudioTheme | undefined): Record<string, string> {
  return useMemo(() => {
    if (!theme || typeof theme === 'string') return {};
    const t = theme as any;
    const s: any = { ...t };
    if (t.primary) s['--avatar-customize-primary'] = t.primary;
    if (t.bg) s['--avatar-customize-bg'] = t.bg;
    if (t.surface) s['--avatar-customize-option-bg'] = t.surface;
    if (t.border) s['--avatar-customize-border'] = t.border;
    if (t.textMain) s['--avatar-customize-text'] = t.textMain;
    if (t.textMuted) s['--avatar-customize-muted'] = t.textMuted;
    return s;
  }, [theme]);
}
