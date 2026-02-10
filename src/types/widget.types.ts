// Tipos específicos para valores de widgets
export type WidgetValue = string | number | boolean | Date | File | null | undefined;

// Tipos de configuración comunes
export interface TextConfig {
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  validationMessage?: string;
}

export interface NumberConfig {
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface DateConfig {
  placeholder?: string;
  defaultValue?: string;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export interface SelectConfig {
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
  defaultValue?: string | string[];
}

export interface BarcodeConfig {
  scannerEnabled: boolean;
  cameraType: 'rear' | 'front' | 'auto';
  format: 'code_128' | 'code_39' | 'ean_13' | 'qr_code';
  autoSubmit: boolean;
  placeholder: string;
}

export interface PhotoConfig {
  multiple: boolean;
  maxSize: number; // en MB
  allowedFormats: string[];
  maxFiles?: number;
}

// Tipo para configuración de cualquier widget
export type WidgetConfig = 
  | TextConfig 
  | NumberConfig 
  | DateConfig 
  | SelectConfig 
  | BarcodeConfig 
  | PhotoConfig 
  | Record<string, unknown>;

// Definición base para todas las props de widgets
export type WidgetPreviewProps = {
  widget: WidgetInstance;
};

export type WidgetPropertiesProps = {
  widget: WidgetInstance;
  updateWidget: (id: string, changes: Partial<WidgetInstance>) => void;
};

export type WidgetRenderProps = {
  widget: WidgetInstance;
  value?: WidgetValue;
  onChange?: (value: WidgetValue) => void;
};

// Instancia de widget en el formulario
export type WidgetInstance = {
  id: string;
  type: string;
  label: string;
  required: boolean;
  config: WidgetConfig;
  style?: Record<string, string | number>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    customMessage?: string;
  };
  visibility?: {
    condition: string;
    dependsOn: string;
  };
};

// Definición de widget para el registro
export type WidgetDefinition = {
  type: string;
  label: string;
  icon: string;
  category: string;
  defaultConfig: WidgetConfig;
  preview: React.ComponentType<WidgetPreviewProps>;
  properties: React.ComponentType<WidgetPropertiesProps>;
  render: React.ComponentType<WidgetRenderProps>;
};

// Plantilla de formulario
export type FormTemplate = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  settings: {
    theme: 'light' | 'dark';
    showProgress: boolean;
    allowSave: boolean;
    enableValidation: boolean;
    submitText?: string;
    successMessage?: string;
  };
};

// Tipo para el estado del formulario
export type FormState = {
  [widgetId: string]: WidgetValue;
};

// Tipo para el resultado del formulario
export type FormResult = {
  formId: string;
  submittedAt: string;
  data: FormState;
  metadata?: Record<string, unknown>;
};

// Helpers para tipos
export type WidgetType = 
  | 'text' 
  | 'number' 
  | 'date' 
  | 'email' 
  | 'phone' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'barcode' 
  | 'photo' 
  | 'file' 
  | 'textarea' 
  | 'rating' 
  | 'signature';

// Mapeo de tipo a configuración
export type ConfigByType<T extends WidgetType> = 
  T extends 'text' ? TextConfig :
  T extends 'number' ? NumberConfig :
  T extends 'date' ? DateConfig :
  T extends 'select' ? SelectConfig :
  T extends 'barcode' ? BarcodeConfig :
  T extends 'photo' ? PhotoConfig :
  WidgetConfig;

// Mapeo de tipo a valor
export type ValueByType<T extends WidgetType> = 
  T extends 'text' ? string :
  T extends 'number' ? number :
  T extends 'date' ? Date :
  T extends 'select' ? string | string[] :
  T extends 'checkbox' ? boolean :
  T extends 'photo' ? File | File[] :
  WidgetValue;