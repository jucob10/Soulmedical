import { TextWidget } from './text/TextWidget';
import type { WidgetDefinition } from '@/types/widget.types';

// Solo text inicialmente para evitar errores
export const widgetRegistry: Record<string, WidgetDefinition> = {
  text: TextWidget,
};

export const widgetCategories = [
  {
    name: 'Básicos',
    widgets: ['text']
  },
  {
    name: 'Opciones',
    widgets: []
  },
  {
    name: 'Multimedia',
    widgets: []
  }
];

export type WidgetType = keyof typeof widgetRegistry;