import { TextWidget } from "./text/TextWidget.ts";
import { DateWidget } from "./date/DateWidget.ts";
import { IdScannerWidget } from "./idscanner/IdScannerWidget.ts";
import type { WidgetDefinition } from "../../types/widget.types";

export const widgetRegistry: Record<string, WidgetDefinition> = {
  text: TextWidget,
  date: DateWidget,
  id_scanner: IdScannerWidget,
};