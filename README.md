# React Avatar Studio

A production-ready, engine-agnostic React + TypeScript NPM package for avatar customization, featuring `react-nice-avatar` as the default v1 rendering engine.

## Features

- 🚀 **Engine-Agnostic Architecture**: Designed to support multiple avatar rendering engines in the future.
- 🎨 **Modular & Reusable Components**: `AvatarPreview`, `AvatarCustomizeInline`, and `AvatarCustomizeModal` components, heavily decomposed under the hood into single-responsibility atomic components for maximum flexibility.
- 📦 **Lightweight & Tree-shakable**: ESM and CJS exports bundled with `tsup`.
- 🛠 **Highly Configurable API**: Control sections, orders, grids, labels, layouts, and positioning easily.
- 🧩 **Deep Customization (Slots & Overrides)**: Replace internal components entirely using `components` / `slots`, and apply specific HTML attributes via `slotProps`.
- 💅 **Minimal CSS**: Comes with a lightweight `.css` file using a slot-based `ras-` class approach for easy overriding without tying you into Tailwind, MUI, or Chakra.
- 🛡 **TypeScript First**: End-to-end typed for excellent Developer Experience.

## Installation

```bash
npm install react-avatar-studio react-nice-avatar
```

_(Requires `react-nice-avatar` as a peer dependency since it powers the defaults)._

## Usage

### 1. Simple Avatar Preview

```tsx
import { AvatarPreview } from "react-avatar-studio";
import "react-avatar-studio/dist/index.css";

function Profile() {
  return (
    <div style={{ width: "100px", height: "100px" }}>
      <AvatarPreview
        config={{ hairStyle: "mohawk" }}
        className="my-custom-preview"
      />
    </div>
  );
}
```

### 2. Inline Avatar Customizer

```tsx
import { useState } from "react";
import { AvatarCustomizeInline, AvatarConfig } from "react-avatar-studio";
import "react-avatar-studio/dist/index.css";

function AvatarCreator() {
  const [config, setConfig] = useState<AvatarConfig>();

  return (
    <AvatarCustomizeInline
      value={config}
      onChange={setConfig}
      onSave={(finalConfig, exportData) => {
        console.log("Saved!", finalConfig);
        console.log("SVG String: ", exportData.svg);
        console.log("PNG Data URL: ", exportData.pngDataUrl);
      }}
      onCancel={() => console.log("Cancelled!")}
    />
  );
}
```

### 3. Modal Avatar Customize

```tsx
import { useState } from "react";
import { AvatarCustomizeModal } from "react-avatar-studio";
import "react-avatar-studio/dist/index.css";

function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Edit Avatar</button>
      <AvatarCustomizeModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newConfig, exportData) => {
          // save to DB
          console.log(newConfig, exportData);
          setOpen(false);
        }}
      />
    </>
  );
}
```

## Advanced API Configuration & Customization

The library exposes a highly configurable API. You can drastically alter the appearance and behavior without modifying the core code by passing props:

### 1. Theming and Styling Variations

- **`theme`**: Accepts `'light'`, `'dark'`, or a custom object with CSS variables to instantly match your app's branding.
- **`classes` / `classNames`**: Map standard elements to your own utility classes (like Tailwind!). Provide classes to internal slots such as `container`, `categoryNav`, `optionBtn`, `actionBtn`, `tabs`, etc.
- **`unstyled`**: Set to `true` to completely strip default library styles, giving you 100% control over the CSS.

### 2. Layout & Positioning

- **`layout`**: Choose between `'sidebar'` (default), `'tabs'`, or `'accordion'` layouts for the option settings.
- **`previewPosition`**: Position the avatar preview to the `'top'`, `'left'`, `'right'`, or `'bottom'` relative to the settings panel.
- **`columns`**: Control the grid column count for customization options (e.g. `columns={3}`).

### 3. Deep Component Overrides (Slots API)

Take absolute control of the component behaviors by bypassing our default render tree:

- **`components` (or `slots`)**: Swap out functional visual blocks with your custom components: `SectionWrapper`, `SectionHeader`, `OptionButton`, `Footer`, `PreviewWrapper`, `Tabs`, `TabButton`, `Button`, or `Modal`.
- **`slotProps`**: Forward `HTMLAttributes` (like aria tags, custom event handlers, `data-testid` properties) onto intrinsic DOM components (e.g. `saveButton`, `colorButton`, `categoryTab`).

### 4. API & Data Control

- **`hiddenSections`**: An array of strings describing which avatar sections to hide from the user (e.g., `['glassesStyle', 'hatStyle']`).
- **`sectionOrder`**: An array to manually dictate the top-to-bottom rendering order of customization sections.
- **`sectionOptionOverrides`**: Restrict or dictate the available selectable options per section.
- **`labels`**: A dictionary to rename default section labels (e.g., `{ hairStyle: 'Cool Hair' }`).
- **`value` / `defaultValue`**: Configure initial avatar state or fully control the component state.

**Example of an advanced configuration:**

```tsx
<AvatarCustomizeInline
  theme="dark"
  layout="tabs"
  previewPosition="right"
  columns={4}
  hiddenSections={["glassesStyle", "hatStyle"]}
  sectionOrder={["faceColor", "hairStyle", "hairColor"]}
  labels={{
    hairStyle: "Cool Hair",
  }}
  classes={{
    actionBtn: "my-custom-button-class",
    categoryTab: "font-semibold text-lg",
  }}
  slotProps={{
    saveButton: { "data-testid": "avatar-save" },
  }}
/>
```

## Styling Overrides

If you prefer not to use the `classes` prop or CSS-in-JS, you can override the default styles by targeting `.ras-*` classes. Standard classes include:

- `.ras-container`
- `.ras-layout`
- `.ras-preview-column`
- `.ras-settings-column`
- `.ras-category-nav`
- `.ras-options-grid`
- `.ras-modal-overlay`
- _and many more..._

## Future Roadmap (Extensibility)

The architecture is deliberately built with an `AvatarEngine` interface in mind. We currently implement a robust mapping for the `react-nice-avatar` library to our generic UI controls.

If you want to plug in a custom renderer (like DiceBear or your own SVG strings), you have ultimate flexibility leveraging the internal atomic subcomponents and hooks!
