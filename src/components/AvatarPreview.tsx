import React from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import type { AvatarPreviewProps } from '../types';

export function AvatarPreview({
  config,
  className,
  style,
  id
}: AvatarPreviewProps) {
  const finalConfig = config || genConfig();

  return (
    <div id={id} className={`ras-preview ${className || ''}`} style={style}>
      <Avatar style={{ width: '100%', height: '100%' }} {...finalConfig} />
    </div>
  );
}

export default AvatarPreview;
