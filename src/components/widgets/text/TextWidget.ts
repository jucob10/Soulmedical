import Preview from './Text.preview';
import Properties from './Text.properties';
import Render from './Text.render';
import type { WidgetDefinition } from '@/types/widget.types';

export const TextWidget: WidgetDefinition = {
  type: 'text',
  label: 'Texto',
  icon: '📝',
  category: 'Básicos',
  defaultConfig: {
    placeholder: '',
    defaultValue: '',
    maxLength: 100,
    minLength: 0,
    pattern: '',
    validationMessage: '',
  },
  preview: Preview,
  properties: Properties,
  render: Render,
};