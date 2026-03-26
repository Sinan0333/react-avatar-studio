import { useState, useEffect, useCallback } from 'react';
import { AvatarConfig, genConfig } from 'react-nice-avatar';
import { REACT_NICE_AVATAR_SECTIONS } from '../constants/avatarSections';

export interface UseAvatarCustomizeProps {
  value?: AvatarConfig;
  defaultValue?: AvatarConfig;
  onChange?: (config: AvatarConfig) => void;
  hiddenSections?: string[];
  sectionOrder?: string[];
}

export function useAvatarCustomize({
  value,
  defaultValue,
  onChange,
  hiddenSections = [],
  sectionOrder = [],
}: UseAvatarCustomizeProps) {
  // Use controlled value if provided, else uncontrolled internal state
  const isControlled = value !== undefined;
  
  const [internalConfig, setInternalConfig] = useState<AvatarConfig>(
    () => value ?? defaultValue ?? genConfig()
  );

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const config = isControlled ? value : internalConfig;

  // Process sections from engine
  const rawSections = REACT_NICE_AVATAR_SECTIONS;
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
    (newConfigPartial: Partial<AvatarConfig>) => {
      const updated = { ...config, ...newConfigPartial } as AvatarConfig;
      if (!isControlled) {
        setInternalConfig(updated);
      }
      onChange?.(updated);
    },
    [config, isControlled, onChange]
  );

  const randomize = useCallback(() => {
    const random = genConfig({ isRandom: true } as any);
    if (!isControlled) {
      setInternalConfig(random);
    }
    onChange?.(random);
  }, [isControlled, onChange]);

  const reset = useCallback(() => {
    const defaultConf = defaultValue ?? genConfig();
    if (!isControlled) {
      setInternalConfig(defaultConf);
    }
    onChange?.(defaultConf);
  }, [defaultValue, isControlled, onChange]);
  
  const handleOptionChange = useCallback((sectionId: string, value: any) => {
    updateConfig({ [sectionId]: value } as Partial<AvatarConfig>);
  }, [updateConfig]);

  return {
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
