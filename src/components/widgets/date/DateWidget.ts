
import Preview from "./Date.preview.tsx";
import Properties from "./Date.properties.tsx";
import Render from "./Date.render.tsx";
import type { WidgetDefinition } from "../../../types/widget.types";

export const DateWidget: WidgetDefinition = {
  type: "date",
  label: "Fecha",
  icon: "date",
  defaultConfig: {
    min: "",
    max: "",
  },
  preview: Preview,
  properties: Properties,
  render: Render,
};