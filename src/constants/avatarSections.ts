export interface AvatarOption {
  value: string | number;
  label: string;
  colorHex?: string; // Optional hex for color palettes
  imageUrl?: string; // Optional image preview
}

export interface AvatarSection {
  id: string; // Key in the config state
  label: string; // Display name
  type: 'select' | 'color' | 'slider';
  options: AvatarOption[];
  defaultValue: any;
  group?: string; // Category like 'Face', 'Hair', 'Clothing'
  description?: string;
  hidden?: boolean;
}

export const REACT_NICE_AVATAR_SECTIONS: AvatarSection[] = [
  {
    id: 'sex',
    label: 'Sex',
    type: 'select',
    group: 'Face & Body',
    options: [
      { value: 'man', label: 'Man' },
      { value: 'woman', label: 'Woman' },
    ],
    defaultValue: 'man',
  },
  {
    id: 'faceColor',
    label: 'Face Color',
    type: 'color',
    group: 'Face & Body',
    options: [
      { value: '#F9C9B6', label: 'Light', colorHex: '#F9C9B6' },
      { value: '#AC6651', label: 'Dark', colorHex: '#AC6651' },
    ],
    defaultValue: '#F9C9B6',
  },
  {
    id: 'earSize',
    label: 'Ear Size',
    type: 'select',
    group: 'Face & Body',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'big', label: 'Big' },
    ],
    defaultValue: 'small',
  },
  {
    id: 'hairColor',
    label: 'Hair Color',
    type: 'color',
    group: 'Hair',
    options: [
      { value: '#000', label: 'Black', colorHex: '#000' },
      { value: '#fff', label: 'White', colorHex: '#fff' },
      { value: '#77311D', label: 'Brown', colorHex: '#77311D' },
      { value: '#FC909F', label: 'Pink', colorHex: '#FC909F' },
      { value: '#D2EFF3', label: 'Light Blue', colorHex: '#D2EFF3' },
      { value: '#506AF4', label: 'Blue', colorHex: '#506AF4' },
      { value: '#F48150', label: 'Orange', colorHex: '#F48150' },
    ],
    defaultValue: '#000',
  },
  {
    id: 'hairStyle',
    label: 'Hair Style',
    type: 'select',
    group: 'Hair',
    options: [
      { value: 'normal', label: 'Normal' },
      { value: 'thick', label: 'Thick' },
      { value: 'mohawk', label: 'Mohawk' },
      { value: 'womanLong', label: 'Long' },
      { value: 'womanShort', label: 'Short' },
    ],
    defaultValue: 'normal',
  },
  {
    id: 'hatStyle',
    label: 'Hat Style',
    type: 'select',
    group: 'Accessories',
    options: [
      { value: 'none', label: 'None' },
      { value: 'beanie', label: 'Beanie' },
      { value: 'turban', label: 'Turban' },
    ],
    defaultValue: 'none',
  },
  {
    id: 'hatColor',
    label: 'Hat Color',
    type: 'color',
    group: 'Accessories',
    options: [
      { value: '#000', label: 'Black', colorHex: '#000' },
      { value: '#fff', label: 'White', colorHex: '#fff' },
      { value: '#77311D', label: 'Brown', colorHex: '#77311D' },
      { value: '#FC909F', label: 'Pink', colorHex: '#FC909F' },
      { value: '#D2EFF3', label: 'Light Blue', colorHex: '#D2EFF3' },
      { value: '#506AF4', label: 'Blue', colorHex: '#506AF4' },
      { value: '#F48150', label: 'Orange', colorHex: '#F48150' },
    ],
    defaultValue: '#000',
  },
  {
    id: 'eyeStyle',
    label: 'Eye Style',
    type: 'select',
    group: 'Face & Body',
    options: [
      { value: 'circle', label: 'Circle' },
      { value: 'oval', label: 'Oval' },
      { value: 'smile', label: 'Smile' },
    ],
    defaultValue: 'circle',
  },
  {
    id: 'glassesStyle',
    label: 'Glasses Style',
    type: 'select',
    group: 'Accessories',
    options: [
      { value: 'none', label: 'None' },
      { value: 'round', label: 'Round' },
      { value: 'square', label: 'Square' },
    ],
    defaultValue: 'none',
  },
  {
    id: 'noseStyle',
    label: 'Nose Style',
    type: 'select',
    group: 'Face & Body',
    options: [
      { value: 'short', label: 'Short' },
      { value: 'long', label: 'Long' },
      { value: 'round', label: 'Round' },
    ],
    defaultValue: 'short',
  },
  {
    id: 'mouthStyle',
    label: 'Mouth Style',
    type: 'select',
    group: 'Face & Body',
    options: [
      { value: 'laugh', label: 'Laugh' },
      { value: 'smile', label: 'Smile' },
      { value: 'peace', label: 'Peace' },
    ],
    defaultValue: 'smile',
  },
  {
    id: 'shirtStyle',
    label: 'Shirt Style',
    type: 'select',
    group: 'Clothing',
    options: [
      { value: 'hoody', label: 'Hoody' },
      { value: 'short', label: 'Short' },
      { value: 'polo', label: 'Polo' },
    ],
    defaultValue: 'short',
  },
  {
    id: 'shirtColor',
    label: 'Shirt Color',
    type: 'color',
    group: 'Clothing',
    options: [
      { value: '#9287FF', label: 'Purple', colorHex: '#9287FF' },
      { value: '#6BD9E9', label: 'Light Blue', colorHex: '#6BD9E9' },
      { value: '#FC909F', label: 'Pink', colorHex: '#FC909F' },
      { value: '#F4D150', label: 'Yellow', colorHex: '#F4D150' },
      { value: '#77311D', label: 'Brown', colorHex: '#77311D' },
    ],
    defaultValue: '#9287FF',
  },
  {
    id: 'bgColor',
    label: 'Background',
    type: 'color',
    group: 'Background',
    options: [
      { value: '#9287FF', label: 'Purple', colorHex: '#9287FF' },
      { value: '#6BD9E9', label: 'Light Blue', colorHex: '#6BD9E9' },
      { value: '#FC909F', label: 'Pink', colorHex: '#FC909F' },
      { value: '#F4D150', label: 'Yellow', colorHex: '#F4D150' },
      { value: '#E0DDFF', label: 'Light Purple', colorHex: '#E0DDFF' },
      { value: '#D2EFF3', label: 'Ice', colorHex: '#D2EFF3' },
      { value: '#FFEDEF', label: 'Light Pink', colorHex: '#FFEDEF' },
      { value: '#FFEBA4', label: 'Light Yellow', colorHex: '#FFEBA4' },
      { value: '#506AF4', label: 'Blue', colorHex: '#506AF4' },
      { value: '#F48150', label: 'Orange', colorHex: '#F48150' },
      { value: '#74D153', label: 'Green', colorHex: '#74D153' },
    ],
    defaultValue: '#E0DDFF',
  },
];
