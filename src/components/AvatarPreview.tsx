import React from 'react';
import type { AvatarPreviewProps } from '../types';
import { reactNiceAvatarEngine } from '../engines/reactNiceAvatarEngine';

export function AvatarPreview<TConfig = any>({
  engine = reactNiceAvatarEngine as any,
  config,
  className,
  style,
  id
}: AvatarPreviewProps<TConfig>) {
  const finalConfig = config || engine.getDefaultConfig();

  return (
    <div id={id} className={`ras-preview ${className || ''}`} style={style}>
      {engine.render(finalConfig)}
    </div>
  );
}

export default AvatarPreview;
