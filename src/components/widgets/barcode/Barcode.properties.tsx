import type { WidgetPropertiesProps } from '@/types/widget.types';

export default function BarcodeProperties({ widget, updateWidget }: WidgetPropertiesProps) {
  const config = widget.config as {
    scannerEnabled: boolean;
    cameraType: string;
    format: string;
    autoSubmit: boolean;
    placeholder: string;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Habilitar escáner
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={config.scannerEnabled}
            onChange={(e) =>
              updateWidget(widget.id, {
                config: {
                  ...config,
                  scannerEnabled: e.target.checked,
                },
              })
            }
            className="h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Permitir escanear códigos de barras
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Placeholder
        </label>
        <input
          type="text"
          value={config.placeholder}
          onChange={(e) =>
            updateWidget(widget.id, {
              config: {
                ...config,
                placeholder: e.target.value,
              },
            })
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="Texto de ayuda..."
        />
      </div>
    </div>
  );
}