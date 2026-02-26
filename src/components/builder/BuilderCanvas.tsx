import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useBuilderStore } from "../../store/useBuilderStore";
import { widgetRegistry } from "../widgets/registry";
import type { WidgetInstance } from "../../types/widget.types";

function SortableItem({ widget }: { widget: WidgetInstance }) {
  const { removeWidget, selectWidget, selectedWidgetId } = useBuilderStore();
  const isSelected = widget.id === selectedWidgetId;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: "relative",
    background: "#ffffff",
    border: isSelected ? "2px solid #00c2a8" : "1.5px solid #e2e8f0",
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: isSelected
      ? "0 0 0 3px rgba(0,194,168,0.15)"
      : "0 1px 3px rgba(0,0,0,0.08)",
    cursor: "pointer",
    overflow: "hidden",
  };

  const Preview = widgetRegistry[widget.type]?.preview;

  return (
    <div ref={setNodeRef} style={style} onClick={() => selectWidget(widget.id)}>
      {/* Handle de arrastre */}
      <div
        {...attributes}
        {...listeners}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          cursor: "grab",
          fontSize: 11,
          color: "#9ca3af",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <span>⠿</span>
        <span>Arrastrar para reordenar</span>
      </div>

      {/* Preview del widget */}
      {Preview ? (
        <Preview widget={widget} />
      ) : (
        <p style={{ padding: 12, fontSize: 14, color: "#9ca3af" }}>Sin preview</p>
      )}

      {/* Botón eliminar */}
      <button
        onClick={(e) => { e.stopPropagation(); removeWidget(widget.id); }}
        style={{
          position: "absolute", top: 4, right: 8,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "#9ca3af", width: 24, height: 24,
          borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
        }}
        onMouseOver={(e) => { (e.target as HTMLElement).style.color = "#ef4444"; }}
        onMouseOut={(e) => { (e.target as HTMLElement).style.color = "#9ca3af"; }}
      >
        ✕
      </button>
    </div>
  );
}

export default function BuilderCanvas() {
  const { widgets, moveWidget, clearSelection } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = widgets.findIndex((w) => w.id === active.id);
    const to = widgets.findIndex((w) => w.id === over.id);
    if (from !== -1 && to !== -1) moveWidget(from, to);
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }} onClick={clearSelection}>
      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
          Tu Formulario
        </h2>
        <span style={{
          fontSize: 13, color: "#9ca3af", background: "#f1f5f9",
          padding: "2px 8px", borderRadius: 20, border: "1px solid #e2e8f0",
        }}>
          {widgets.length} campo{widgets.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Canvas vacío */}
      {widgets.length === 0 && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 10, padding: "60px 24px",
          border: "2px dashed #e2e8f0", borderRadius: 16,
          textAlign: "center", color: "#9ca3af",
        }}>
          <span style={{ fontSize: 40 }}>📋</span>
          <p style={{ fontSize: 14 }}>Agrega campos desde el panel de widgets</p>
          <span style={{ fontSize: 12 }}>En móvil usa el botón de abajo</span>
        </div>
      )}

      {/* Lista de widgets */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
          <div onClick={(e) => e.stopPropagation()}>
            {widgets.map((widget) => (
              <SortableItem key={widget.id} widget={widget} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}