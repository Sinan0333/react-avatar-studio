# react-avatar-studio

A production-ready, engine-agnostic React + TypeScript NPM package for avatar customization, featuring `react-nice-avatar` as the default v1 rendering engine.

## Features
- 🚀 **Engine-Agnostic Architecture**: Designed to support multiple avatar rendering engines in the future (e.g., DiceBear, custom SVG renderers).
- 🎨 **Reusable Components**: `AvatarPreview`, `AvatarCustomizerInline`, and `AvatarCustomizerModal`.
- 📦 **Lightweight & Tree-shakable**: ESM and CJS exports bundled with `tsup`.
- 🛠 **Highly Configurable API**: Control sections, orders, hiding, overrides, and labels easily.
- 💅 **Minimal CSS**: Comes with a lightweight `.css` file using a slot-based `ras-` class approach for easy overriding without tying you into Tailwind, MUI, or Chakra.
- 🛡 **TypeScript First**: End-to-end typed for excellent Developer Experience.

## Installation

```bash
npm install react-avatar-studio react-nice-avatar
```
*(Requires `react-nice-avatar` as a peer/regular dependency since it powers the v1 default engine).*

## Usage

### 1. Simple Avatar Preview
```tsx
import { AvatarPreview } from 'react-avatar-studio';

function Profile() {
  return <AvatarPreview config={{ hairStyle: 'mohawk' }} className="my-custom-preview" />;
}
```

### 2. Inline Avatar Customizer
```tsx
import { useState } from 'react';
import { AvatarCustomizerInline } from 'react-avatar-studio';
import 'react-avatar-studio/dist/index.css'; // Import minimal styles

function AvatarCreator() {
  const [config, setConfig] = useState();

  return (
    <AvatarCustomizerInline 
      value={config} 
      onChange={setConfig} 
      onSave={(finalConfig) => console.log('Saved!', finalConfig)}
    />
  );
}
```

### 3. Modal Avatar Customizer
```tsx
import { useState } from 'react';
import { AvatarCustomizerModal } from 'react-avatar-studio';
import 'react-avatar-studio/dist/index.css';

function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Edit Avatar</button>
      <AvatarCustomizerModal 
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newConfig) => {
          // save to DB
          console.log(newConfig);
        }}
      />
    </>
  );
}
```

## Advanced API Configuration

You can fully control what the user sees:

```tsx
<AvatarCustomizerInline 
  hiddenSections={['glassesStyle', 'hatStyle']} 
  sectionOrder={['faceColor', 'hairStyle', 'hairColor']}
  labels={{
    hairStyle: 'Cool Hair',
  }}
/>
```

## Future Roadmap (Extensibility)
The architecture is deliberately built with an `AvatarEngine` interface. Currently, we expose `reactNiceAvatarEngine` which maps the `react-nice-avatar` library to our generic UI controls. 

If you want to create a custom renderer using DiceBear or your own SVG strings, simply implement the `AvatarEngine` interface in your app and pass it into the components:

```tsx
const customDicebearEngine: AvatarEngine<DicebearConfig, any> = {
  id: 'dicebear-adventurer',
  displayName: 'DiceBear Adventurer',
  render: (config) => <img src={...} />,
  getSections: () => [ ...metadata ],
  // ...
};

// Usage
<AvatarCustomizerInline engine={customDicebearEngine} />
```

## Styling overrides
Feel free to override the default styles by targeting `.ras-*` classes:
- `.ras-container`
- `.ras-preview-area`
- `.ras-sections-nav`
- `.ras-options-grid`
- `.ras-color-btn`
- `.ras-modal-overlay`
