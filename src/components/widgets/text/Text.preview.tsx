import type { WidgetPreviewProps } from '@/types/widget.types';

export default function TextPreview({ widget }: WidgetPreviewProps) {
  const config = widget.config as {
    placeholder?: string;
    defaultValue?: string;
    maxLength?: number;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {widget.label}
          {widget.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <span className="text-gray-400 text-xs">Texto</span>
      </div>
      <input
        type="text"
        disabled
        placeholder={config.placeholder || 'Ingrese texto...'}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
      />
      {config.maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          Máx. {config.maxLength} caracteres
        </p>
      )}
    </div>
  );
}