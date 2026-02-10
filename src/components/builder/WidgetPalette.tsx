import { useState } from 'react';
import { widgetRegistry } from '../widgets/registry';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function WidgetPalette() {
  const addWidget = useBuilderStore((state) => state.addWidget);
  const [searchTerm, setSearchTerm] = useState('');

  // Widgets filtrados por búsqueda
  const availableWidgets = Object.values(widgetRegistry).filter(
    (widget) =>
      widget.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <h3 className="font-semibold text-gray-800 mb-4">Widgets disponibles</h3>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar widget..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-2">
        {availableWidgets.map((widgetDef) => (
          <button
            key={widgetDef.type}
            onClick={() => addWidget(widgetDef.type)}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center gap-3"
          >
            <span className="text-xl">{widgetDef.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-800">
                {widgetDef.label}
              </div>
              <div className="text-xs text-gray-500">
                {widgetDef.category}
              </div>
            </div>
            <span className="text-blue-600">+</span>
          </button>
        ))}
      </div>

      {availableWidgets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay widgets disponibles</p>
          <p className="text-sm mt-2">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
