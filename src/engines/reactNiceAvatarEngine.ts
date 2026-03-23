import React from 'react';
import Avatar, { genConfig, AvatarConfig } from 'react-nice-avatar';
import type { AvatarEngine, AvatarSection } from '../core/AvatarEngine';

// Define the sections based on react-nice-avatar capabilities
const REACT_NICE_AVATAR_SECTIONS: AvatarSection[] = [
  {
    id: 'sex',
    label: 'Sex',
    type: 'select',
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
    label: 'Background Color',
    type: 'color',
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

export const reactNiceAvatarEngine: AvatarEngine<AvatarConfig, any> = {
  id: 'react-nice-avatar',
  displayName: 'React Nice Avatar',
  render: (config: AvatarConfig, props?: any) => {
    return React.createElement(Avatar, { style: { width: '100%', height: '100%' }, ...props, ...config });
  },
  getDefaultConfig: () => {
    return genConfig({});
  },
  getSections: () => {
    return REACT_NICE_AVATAR_SECTIONS;
  },
  validateConfig: (config: any) => {
    // Simple validation: check if it's an object
    return typeof config === 'object' && config !== null;
  },
  normalizeConfig: (config: any) => {
    // Attempt to normalize
    return genConfig(config);
  },
  randomizeConfig: (partial?: Partial<AvatarConfig>) => {
    return genConfig({ isRandom: true, ...(partial as any) } as any);
  },
};

export default reactNiceAvatarEngine;
