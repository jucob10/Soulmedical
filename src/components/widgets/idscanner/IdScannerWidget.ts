import Preview from "./IdScanner.preview.tsx";
import Properties from "./IdScanner.properties.tsx";
import Render from "./IdScanner.render.tsx";
import type { WidgetDefinition } from "../../../types/widget.types";

export const IdScannerWidget: WidgetDefinition = {
  type: "id_scanner",
  label: "Cédula",
  icon: "id",
  defaultConfig: {
    fields: ["nombre", "numero", "fechaNacimiento"],
    allowManual: true,
  },
  preview: Preview,
  properties: Properties,
  render: Render,
};