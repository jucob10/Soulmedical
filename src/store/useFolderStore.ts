import { create } from "zustand";
import type { FolderItem } from "../types/folder.types";

interface FolderState {
  folders: FolderItem[];
  selectedFolderId: string | null;

  addFolder: (name: string, color: string, icon: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  updateFolder: (id: string, changes: Partial<FolderItem>) => void;
  selectFolder: (id: string | null) => void;
  addForm: (folderId: string, name: string) => void;
  deleteForm: (folderId: string, formId: string) => void;
  renameForm: (folderId: string, formId: string, name: string) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  selectedFolderId: null,

  addFolder: (name, color, icon) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          id: crypto.randomUUID(),
          name,
          color,
          icon,
          forms: [],
          createdAt: new Date().toLocaleDateString("es-CO"),
        },
      ],
    })),

  renameFolder: (id, name) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === id ? { ...f, name } : f
      ),
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
      selectedFolderId:
        state.selectedFolderId === id ? null : state.selectedFolderId,
    })),

  updateFolder: (id, changes) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === id ? { ...f, ...changes } : f
      ),
    })),

  selectFolder: (id) => set({ selectedFolderId: id }),

  addForm: (folderId, name) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === folderId
          ? {
              ...f,
              forms: [
                ...f.forms,
                {
                  id: crypto.randomUUID(),
                  name,
                  createdAt: new Date().toLocaleDateString("es-CO"),
                  updatedAt: new Date().toLocaleDateString("es-CO"),
                },
              ],
            }
          : f
      ),
    })),

  deleteForm: (folderId, formId) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === folderId
          ? { ...f, forms: f.forms.filter((fm) => fm.id !== formId) }
          : f
      ),
    })),

  renameForm: (folderId, formId, name) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === folderId
          ? {
              ...f,
              forms: f.forms.map((fm) =>
                fm.id === formId
                  ? {
                      ...fm,
                      name,
                      updatedAt: new Date().toLocaleDateString("es-CO"),
                    }
                  : fm
              ),
            }
          : f
      ),
    })),
}));