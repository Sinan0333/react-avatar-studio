/**
 * Utility to extract fully rendered SVG and high-resolution PNG data URLs from the avatar DOM node.
 */
export async function getAvatarData(elementId: string): Promise<{ svg: string; pngDataUrl: string } | null> {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Avatar node with id "${elementId}" not found.`);
    return null;
  }
  
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const rawHtml = node.innerHTML;
  
  const data = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;">
          <style>
            * { box-sizing: content-box !important; }
            svg { display: inline !important; max-width: none !important; max-height: none !important; margin: 0; padding: 0; transform-origin: center center; }
          </style>
          ${rawHtml}
        </div>
      </foreignObject>
    </svg>
  `;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data.trim());
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2; // 2x resolution
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        const pngDataUrl = canvas.toDataURL('image/png');
        resolve({ svg: rawHtml, pngDataUrl });
      } else {
        resolve(null);
      }
    };
    
    img.onerror = (e) => {
      console.error('Failed to generate PNG from Avatar HTML:', e);
      resolve(null);
    };
  });
}

/**
 * Utility to download the avatar DOM node directly as a PNG.
 */
export async function downloadAvatarAsPng(elementId: string, filename = 'avatar.png') {
  const data = await getAvatarData(elementId);
  if (data) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = data.pngDataUrl;
    a.click();
  }
}
