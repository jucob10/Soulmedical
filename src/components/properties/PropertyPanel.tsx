import { useBuilderStore } from '@/store/useBuilderStore';
import { widgetRegistry } from '../widgets/registry';

export default function PropertyPanel() {
  const { widgets, selectedWidgetId, updateWidget } = useBuilderStore();
  
  const widget = widgets.find((w) => w.id === selectedWidgetId);
  
  if (!widget) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="text-4xl mb-4 opacity-30">⚙️</div>
        <p>Selecciona un widget para editar sus propiedades</p>
      </div>
    );
  }

  const widgetDef = widgetRegistry[widget.type];
  const PropertiesComponent = widgetDef?.properties;

  return (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <h3 className="font-semibold text-gray-800 mb-4">Propiedades</h3>

      {/* Propiedades básicas para todos los widgets */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etiqueta
          </label>
          <input
            type="text"
            value={widget.label}
            onChange={(e) => updateWidget(widget.id, { label: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={widget.required}
            onChange={(e) => updateWidget(widget.id, { required: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Campo obligatorio
          </span>
        </div>
      </div>

      {/* Propiedades específicas del widget */}
      {PropertiesComponent ? (
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Configuración específica</h4>
          <PropertiesComponent
            widget={widget}
            updateWidget={updateWidget}
          />
        </div>
      ) : (
        <div className="text-gray-500 text-sm">
          <p>No hay propiedades específicas para este widget</p>
        </div>
      )}
    </div>
  );
}