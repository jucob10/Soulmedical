export type FormItem = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FolderItem = {
  id: string;
  name: string;
  color: string;
  icon: string;
  forms: FormItem[];
  createdAt: string;
};

export const FOLDER_COLORS = [
  { id: "teal",   value: "#00c2a8", label: "Verde"   },
  { id: "blue",   value: "#3b82f6", label: "Azul"    },
  { id: "purple", value: "#8b5cf6", label: "Morado"  },
  { id: "orange", value: "#f97316", label: "Naranja" },
  { id: "pink",   value: "#ec4899", label: "Rosa"    },
  { id: "gray",   value: "#6b7280", label: "Gris"    },
];

export const FOLDER_ICONS = [
  { id: "📁", label: "Carpeta"     },
  { id: "📋", label: "Formulario"  },
  { id: "👥", label: "Personas"    },
  { id: "🏥", label: "Salud"       },
  { id: "📊", label: "Reportes"    },
  { id: "⚙️", label: "Configuración"},
  { id: "🎯", label: "Objetivos"   },
  { id: "📝", label: "Notas"       },
];