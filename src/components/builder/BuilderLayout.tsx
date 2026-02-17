import { useState } from "react";
import BuilderCanvas from "./BuilderCanvas";
import WidgetPalette from "./WidgetPalette";
import PropertyPanel from "../properties/PropertyPanel";
import { useBuilderStore } from "../../store/useBuilderStore";

export default function BuilderLayout({ onBack }: { onBack?: () => void }) {
  const [mobilePanel, setMobilePanel] = useState<"palette" | "props" | null>(null);
  const selectedWidgetId = useBuilderStore((s) => s.selectedWidgetId);

  const closePanel = () => setMobilePanel(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* ── Topbar ── */}
            <header style={{
        height: 56, background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px", flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: "none", border: "1.5px solid #e2e8f0",
              borderRadius: 8, padding: "6px 12px",
              cursor: "pointer", fontSize: 13,
              color: "#6b7280", fontFamily: "inherit", fontWeight: 600,
            }}>
              ← Volver
            </button>
          )}
          <span style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
            📋 Editor de Formulario
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            padding: "6px 14px", borderRadius: 6,
            border: "1.5px solid #e2e8f0", background: "none",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            color: "#6b7280", fontFamily: "inherit",
          }}>
            Vista previa
          </button>
          <button style={{
            padding: "6px 14px", borderRadius: 6, border: "none",
            background: "#00c2a8", color: "#fff",
            cursor: "pointer", fontSize: 13,
            fontWeight: 600, fontFamily: "inherit",
          }}>
            Publicar
          </button>
        </div>
      </header>

      {/* ── Cuerpo ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Panel izquierdo — solo desktop */}
        <div style={{
          width: 256, flexShrink: 0,
          borderRight: "1px solid #e2e8f0",
          overflowY: "auto", background: "#ffffff",
          display: "flex", flexDirection: "column",
        }}
          className="sf-hide-mobile"
        >
          <WidgetPalette />
        </div>

        {/* Canvas central */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24, background: "#f0f4f8" }}>
          <BuilderCanvas />
        </main>

        {/* Panel derecho — solo desktop */}
        <div style={{
          width: 288, flexShrink: 0,
          borderLeft: "1px solid #e2e8f0",
          overflowY: "auto", background: "#ffffff",
        }}
          className="sf-hide-mobile"
        >
          <PropertyPanel />
        </div>
      </div>

      {/* ── Botones flotantes móvil ── */}
      <div style={{
        position: "fixed", bottom: 20, right: 16,
        display: "flex", flexDirection: "column", gap: 10,
        zIndex: 50,
      }}
        className="sf-show-mobile"
      >
        {selectedWidgetId && (
          <button
            onClick={() => setMobilePanel("props")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 18px", borderRadius: 50, border: "none",
              background: "#00c2a8", color: "#fff",
              fontSize: 13.5, fontWeight: 600, fontFamily: "inherit",
              cursor: "pointer", boxShadow: "0 4px 16px rgba(0,194,168,0.4)",
            }}
          >
            ⚙️ Editar campo
          </button>
        )}
        <button
          onClick={() => setMobilePanel("palette")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 18px", borderRadius: 50, border: "none",
            background: "#ffffff", color: "#111827",
            fontSize: 13.5, fontWeight: 600, fontFamily: "inherit",
            cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          ➕ Agregar campo
        </button>
      </div>

      {/* ── Drawer móvil ── */}
      {mobilePanel && (
        <>
          {/* Fondo oscuro */}
          <div
            onClick={closePanel}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.4)", zIndex: 60,
            }}
          />
          {/* Panel que sube desde abajo */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            maxHeight: "80vh", background: "#ffffff",
            borderRadius: "16px 16px 0 0",
            zIndex: 70, overflowY: "auto",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
          }}>
            {mobilePanel === "palette" ? (
              <WidgetPalette onClose={closePanel} />
            ) : (
              <PropertyPanel onClose={closePanel} />
            )}
          </div>
        </>
      )}

      {/* CSS para mostrar/ocultar en móvil */}
      <style>{`
        @media (max-width: 768px) {
          .sf-hide-mobile { display: none !important; }
          main { padding: 16px 12px 100px !important; }
        }
        @media (min-width: 769px) {
          .sf-show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}