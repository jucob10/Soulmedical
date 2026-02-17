import type React from "react";

// ─── Tipos base ────────────────────────────────────────────────
export type WidgetInstance = {
  id: string;
  type: string;
  label: string;
  required: boolean;
  config: Record<string, unknown>;
};

// ─── Props compartidas ─────────────────────────────────────────
export type WidgetPreviewProps = {
  widget: WidgetInstance;
};

export type WidgetPropertiesProps = {
  widget: WidgetInstance;
  updateWidget: (id: string, changes: Partial<WidgetInstance>) => void;
};

export type WidgetRenderProps = {
  widget: WidgetInstance;
  onValue?: (fields: Record<string, string>) => void;
};

// ─── Definición de un widget en el registry ───────────────────
export type WidgetDefinition = {
  type: string;
  label: string;
  icon: string;
  defaultConfig: Record<string, unknown>;
  preview: React.ComponentType<WidgetPreviewProps>;
  properties: React.ComponentType<WidgetPropertiesProps>;
  render: React.ComponentType<WidgetRenderProps>;
};