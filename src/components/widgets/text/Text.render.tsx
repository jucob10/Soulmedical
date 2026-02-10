import type { WidgetRenderProps } from '@/types/widget.types';

export default function TextRender({ widget, value, onChange }: WidgetRenderProps) {
  const config = widget.config as {
    placeholder?: string;
    defaultValue?: string;
    maxLength?: number;
  };

  return (
    <input
      type="text"
      required={widget.required}
      placeholder={config.placeholder || ''}
      value={value as string || config.defaultValue || ''}
      onChange={(e) => onChange?.(e.target.value)}
      maxLength={config.maxLength}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}