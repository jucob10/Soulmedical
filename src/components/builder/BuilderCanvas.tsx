import { useBuilderStore } from "../../store/useBuilderStore";
import { widgetRegistry } from "../widgets/registry";
import type { WidgetInstance } from "../../types/widget.types";

import {
  DndContext,
  closestCenter,
  PointerSensor,
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

/* ======================================================
   ITEM ARRASTRABLE
====================================================== */
function SortableItem({ widget }: { widget: WidgetInstance }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 12,
    marginBottom: 12,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    cursor: "grab",
  };

  const { removeWidget, selectWidget } = useBuilderStore();
  const Preview = widgetRegistry[widget.type]?.preview;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => selectWidget(widget.id)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 12, color: "#6b7280" }}>
          ⠿ Arrastrar
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(widget.id);
          }}
        >
          ✕
        </button>
      </div>

      {Preview ? (
        <Preview widget={widget} />
      ) : (
        <div style={{ fontSize: 14, color: "#9ca3af" }}>
          Widget sin preview
        </div>
      )}
    </div>
  );
}

/* ======================================================
   BUILDER CANVAS
====================================================== */
export default function BuilderCanvas() {
  const { widgets, moveWidget } = useBuilderStore();

  /* 👉 SENSORES PARA DRAG CON MOUSE */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const fromIndex = widgets.findIndex(
      (w) => w.id === active.id
    );
    const toIndex = widgets.findIndex(
      (w) => w.id === over.id
    );

    moveWidget(fromIndex, toIndex);
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        Tu Formulario
      </h2>

      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        Arrastra los campos para cambiar el orden
      </p>

      {widgets.length === 0 && (
        <div
          style={{
            padding: 40,
            border: "2px dashed #d1d5db",
            borderRadius: 8,
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Arrastra widgets aquí o selecciónalos del panel derecho
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={verticalListSortingStrategy}
        >
          {widgets.map((widget) => (
            <SortableItem
              key={widget.id}
              widget={widget}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
