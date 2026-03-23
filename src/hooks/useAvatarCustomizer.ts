import { useState, useEffect, useCallback } from 'react';
import type { AvatarEngine, AvatarSection } from '../types';
import { reactNiceAvatarEngine } from '../engines/reactNiceAvatarEngine';

export interface UseAvatarCustomizerProps<TConfig> {
  engine?: AvatarEngine<TConfig, any>;
  value?: TConfig;
  defaultValue?: TConfig;
  onChange?: (config: TConfig) => void;
  hiddenSections?: string[];
  sectionOrder?: string[];
}

export function useAvatarCustomizer<TConfig>({
  engine = reactNiceAvatarEngine as any,
  value,
  defaultValue,
  onChange,
  hiddenSections = [],
  sectionOrder = [],
}: UseAvatarCustomizerProps<TConfig>) {
  // Use controlled value if provided, else uncontrolled internal state
  const isControlled = value !== undefined;
  
  const [internalConfig, setInternalConfig] = useState<TConfig>(
    () => value ?? defaultValue ?? engine.getDefaultConfig()
  );

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const config = isControlled ? value : internalConfig;

  // Process sections from engine
  const rawSections = engine.getSections();
  const visibleSections = rawSections.filter(s => !s.hidden && !hiddenSections.includes(s.id));
  
  // Sort sections if order is provided
  const sections = [...visibleSections].sort((a, b) => {
    if (sectionOrder.length === 0) return 0;
    const indexA = sectionOrder.indexOf(a.id);
    const indexB = sectionOrder.indexOf(b.id);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Set initial active section
  useEffect(() => {
    if (!activeSectionId && sections.length > 0) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

  const updateConfig = useCallback(
    (newConfigPartial: Partial<TConfig>) => {
      const updated = { ...config, ...newConfigPartial } as TConfig;
      if (!isControlled) {
        setInternalConfig(updated);
      }
      onChange?.(updated);
    },
    [config, isControlled, onChange]
  );

  const randomize = useCallback(() => {
    const random = engine.randomizeConfig();
    if (!isControlled) {
      setInternalConfig(random);
    }
    onChange?.(random);
  }, [engine, isControlled, onChange]);

  const reset = useCallback(() => {
    const defaultConf = defaultValue ?? engine.getDefaultConfig();
    if (!isControlled) {
      setInternalConfig(defaultConf);
    }
    onChange?.(defaultConf);
  }, [engine, defaultValue, isControlled, onChange]);
  
  const handleOptionChange = useCallback((sectionId: string, value: any) => {
    updateConfig({ [sectionId]: value } as Partial<TConfig>);
  }, [updateConfig]);

  return {
    engine,
    config,
    sections,
    activeSectionId,
    setActiveSectionId,
    updateConfig,
    handleOptionChange,
    randomize,
    reset,
  };
}
