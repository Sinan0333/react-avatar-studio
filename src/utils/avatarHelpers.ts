import type { AvatarEngine } from '../core/AvatarEngine';

export function randomAvatarConfig<TConfig>(engine: AvatarEngine<TConfig, any>, partial?: Partial<TConfig>): TConfig {
  return engine.randomizeConfig(partial);
}

export function validateAvatarConfig<TConfig>(engine: AvatarEngine<TConfig, any>, config: any): boolean {
  return engine.validateConfig(config);
}

export function normalizeAvatarConfig<TConfig>(engine: AvatarEngine<TConfig, any>, config: any): TConfig {
  return engine.normalizeConfig(config);
}

export function mergeAvatarConfig<TConfig>(base: TConfig, partial: Partial<TConfig>): TConfig {
  return { ...base, ...partial };
}

export function getAvailableOptions(engine: AvatarEngine<any, any>) {
  return engine.getSections();
}
