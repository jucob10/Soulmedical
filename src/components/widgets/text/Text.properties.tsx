// src/components/widgets/text/TextProperties.tsx
// O si está en: src/components/properties/TextProperties.tsx

import { useBuilderStore } from "../../../store/useBuilderStore";  // ← ../../../store/
import { TextConfig, WidgetInstance } from "../../../types/widget.types";

// Type guard para verificar si el widget es de tipo texto
function isTextWidget(widget: WidgetInstance): widget is WidgetInstance & { config: TextConfig } {
  return widget.type === 'text' || widget.type === 'textarea' || widget.type === 'email';
}

export default function TextProperties() {
  const { widgets, selectedWidgetId, updateWidget } = useBuilderStore();

  const widget = widgets.find((w) => w.id === selectedWidgetId);

  if (!widget) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontStyle: "italic" }}>
          Seleccione un campo para editar sus propiedades
        </p>
      </div>
    );
  }

  // Verificar si es un widget de texto
  if (!isTextWidget(widget)) {
    return (
      <div style={{ padding: "20px" }}>
        <p style={{ color: "#ef4444", fontWeight: "500" }}>
          ⚠️ Este widget no es de tipo texto
        </p>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>
          Las propiedades de texto solo están disponibles para campos de texto, email o textarea.
        </p>
      </div>
    );
  }

  // Ahora TypeScript sabe que config es TextConfig
  const textConfig = widget.config as TextConfig;
  const maxLength = textConfig.maxLength || 0;

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "20px",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "8px",
      }}>
        Propiedades de Texto
      </h3>

      {/* Campo: Longitud máxima */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "500",
          color: "#374151",
          fontSize: "14px",
        }}>
          Longitud máxima
        </label>
        <input
          type="number"
          value={maxLength}
          min="0"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onChange={(e) => {
            updateWidget(widget.id, {
              config: {
                ...textConfig,
                maxLength: e.target.value ? Number(e.target.value) : undefined,
              } as TextConfig,
            });
          }}
        />
        <p style={{
          marginTop: "4px",
          fontSize: "12px",
          color: "#6b7280",
        }}>
          Establece el número máximo de caracteres permitidos (0 = ilimitado)
        </p>
      </div>

      {/* Campo: Placeholder */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "500",
          color: "#374151",
          fontSize: "14px",
        }}>
          Texto de ejemplo (Placeholder)
        </label>
        <input
          type="text"
          value={textConfig.placeholder || ""}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onChange={(e) => {
            updateWidget(widget.id, {
              config: {
                ...textConfig,
                placeholder: e.target.value,
              } as TextConfig,
            });
          }}
        />
      </div>
    </div>
  );
}