import type { WidgetPreviewProps } from '@/types/widget.types';

export default function BarcodePreview({ widget }: WidgetPreviewProps) {
  const config = widget.config as {
    scannerEnabled: boolean;
    cameraType: string;
    format: string;
    autoSubmit: boolean;
    placeholder: string;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {widget.label}
          {widget.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <span className="text-gray-400 text-xs">📷 Escáner</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            disabled
            placeholder={config.placeholder || 'Escanee o ingrese manualmente'}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
          />
        </div>
        <button
          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
          disabled
        >
          Escanear
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Escanee el código de barras de la cédula
      </p>
    </div>
  );
}