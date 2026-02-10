import BuilderCanvas from "./BuilderCanvas";
import WidgetPalette from "./WidgetPalette";

export default function BuilderLayout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* ===================== */}
      {/* LADO IZQUIERDO */}
      {/* ===================== */}
      <div
        style={{
          flex: 1,
          padding: 24,
          borderRight: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          overflowY: "auto",
        }}
      >
        <BuilderCanvas />
      </div>

      {/* ===================== */}
      {/* LADO DERECHO */}
      {/* ===================== */}
      <div
        style={{
          width: 320,
          padding: 16,
          backgroundColor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        <WidgetPalette />
      </div>
    </div>
  );
}
