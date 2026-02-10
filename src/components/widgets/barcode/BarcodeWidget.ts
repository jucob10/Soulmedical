import Preview from './Barcode.preview';
import Properties from './Barcode.properties';
import Render from './Barcode.render';

export const BarcodeWidget = {
  type: 'barcode',
  label: 'Código de Barras/Cédula',
  icon: '📷',
  category: 'Multimedia',
  defaultConfig: {
    scannerEnabled: true,
    cameraType: 'rear',
    format: 'code_128',
    autoSubmit: true,
    placeholder: 'Escanee o ingrese manualmente'
  },
  preview: Preview,
  properties: Properties,
  render: Render,
};