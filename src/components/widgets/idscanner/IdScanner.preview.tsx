import type { WidgetPreviewProps } from "../../../types/widget.types";

const FIELD_LABELS: Record<string, string> = {
  nombre: "Nombre completo",
  numero: "Número de documento",
  fechaNacimiento: "Fecha de nacimiento",
  sexo: "Sexo",
  fechaExpedicion: "Fecha de expedición",
  lugarExpedicion: "Lugar de expedición",
};

export default function IdScannerPreview({ widget }: WidgetPreviewProps) {
  const fields = (widget.config.fields as string[]) || ["nombre", "numero", "fechaNacimiento"];

  return (
    <div style={{ padding: "12px" }}>
      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 24 }}>🪪</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>
            {widget.label}
            {widget.required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Escáner de documento</p>
        </div>
      </div>

      {/* Campos que va a extraer */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {fields.map((f) => (
          <span key={f} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#e6faf7", color: "#00a690",
            padding: "3px 8px", borderRadius: 20,
            fontSize: 11.5, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c2a8", display: "inline-block" }} />
            {FIELD_LABELS[f] ?? f}
          </span>
        ))}
      </div>

      {/* Botón deshabilitado */}
      <button disabled style={{
        padding: "8px 14px", background: "#f9fafb",
        border: "1.5px solid #e2e8f0", borderRadius: 6,
        fontSize: 13, color: "#9ca3af", cursor: "not-allowed",
      }}>
        📷 Escanear cédula
      </button>
    </div>
  );
}