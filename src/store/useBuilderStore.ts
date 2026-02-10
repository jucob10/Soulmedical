import { create } from "zustand";
import type { WidgetInstance, FormTemplate, WidgetConfig } from "../types/widget.types";

interface BuilderState {
  currentForm: FormTemplate | null;
  widgets: WidgetInstance[];
  selectedWidgetId: string | null;

  createNewForm: (name: string) => void;
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  selectWidget: (id: string) => void;
  updateWidget: (id: string, data: Partial<WidgetInstance>) => void;

  // 👇 EXISTENTES (NO SE TOCAN)
  moveWidgetUp: (id: string) => void;
  moveWidgetDown: (id: string) => void;

  // 👇 NUEVO (para drag & drop)
  moveWidget: (fromIndex: number, toIndex: number) => void;
}

const defaultConfigs: Record<string, WidgetConfig> = {
  text: {
    placeholder: "",
    defaultValue: "",
    maxLength: 100,
  },
};

const widgetLabels: Record<string, string> = {
  text: "Texto",
};

export const useBuilderStore = create<BuilderState>((set) => ({
  currentForm: null,
  widgets: [],
  selectedWidgetId: null,

  createNewForm: (name) => {
    const newForm: FormTemplate = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: "1.0",
      settings: {
        theme: "light",
        showProgress: true,
        allowSave: true,
        enableValidation: true,
      },
    };

    set({
      currentForm: newForm,
      widgets: [],
      selectedWidgetId: null,
    });
  },

  addWidget: (type) => {
    const newWidget: WidgetInstance = {
      id: crypto.randomUUID(),
      type,
      label: widgetLabels[type] ?? "Nuevo campo",
      required: false,
      config: defaultConfigs[type] ?? {},
    };

    set((state) => ({
      widgets: [...state.widgets, newWidget],
      selectedWidgetId: newWidget.id,
    }));
  },

  removeWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
      selectedWidgetId:
        state.selectedWidgetId === id ? null : state.selectedWidgetId,
    })),

  selectWidget: (id) => set({ selectedWidgetId: id }),

  updateWidget: (id, data) =>
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, ...data } : w
      ),
    })),

  // =========================
  // MOVIMIENTO CON FLECHAS
  // =========================
  moveWidgetUp: (id) =>
    set((state) => {
      const index = state.widgets.findIndex((w) => w.id === id);
      if (index <= 0) return state;

      const widgets = [...state.widgets];
      [widgets[index - 1], widgets[index]] = [
        widgets[index],
        widgets[index - 1],
      ];
      return { widgets };
    }),

  moveWidgetDown: (id) =>
    set((state) => {
      const index = state.widgets.findIndex((w) => w.id === id);
      if (index === -1 || index === state.widgets.length - 1) return state;

      const widgets = [...state.widgets];
      [widgets[index + 1], widgets[index]] = [
        widgets[index],
        widgets[index + 1],
      ];
      return { widgets };
    }),

  // =========================
  // MOVIMIENTO CON DRAG & DROP
  // =========================
  moveWidget: (fromIndex, toIndex) =>
    set((state) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex === toIndex
      ) {
        return state;
      }

      const widgets = [...state.widgets];
      const [moved] = widgets.splice(fromIndex, 1);
      widgets.splice(toIndex, 0, moved);

      return { widgets };
    }),
}));
