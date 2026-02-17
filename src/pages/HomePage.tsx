import { useState } from "react";
import { useFolderStore } from "../store/useFolderStore";
import { FOLDER_COLORS, FOLDER_ICONS } from "../types/folder.types";
import logo from "../assets/Logo_GrupoSoul.png";

export default function HomePage({ onOpenBuilder }: { onOpenBuilder: (folderId: string, formId: string) => void }) {
  const { folders, addFolder, deleteFolder, updateFolder, addForm, deleteForm, selectFolder, selectedFolderId } = useFolderStore();

  // Estados para modales
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);

  // Campos del formulario de carpeta
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("#00c2a8");
  const [folderIcon, setFolderIcon] = useState("📁");
  const [newFormName, setNewFormName] = useState("");

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;
    addFolder(folderName.trim(), folderColor, folderIcon);
    setFolderName("");
    setFolderColor("#00c2a8");
    setFolderIcon("📁");
    setShowNewFolder(false);
  };

  const handleSaveEditFolder = () => {
    if (!editingFolder || !folderName.trim()) return;
    updateFolder(editingFolder, { name: folderName, color: folderColor, icon: folderIcon });
    setShowEditFolder(false);
    setEditingFolder(null);
  };

  const handleOpenEdit = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    if (!folder) return;
    setFolderName(folder.name);
    setFolderColor(folder.color);
    setFolderIcon(folder.icon);
    setEditingFolder(folderId);
    setShowEditFolder(true);
  };

  const handleCreateForm = () => {
    if (!newFormName.trim() || !selectedFolderId) return;
    addForm(selectedFolderId, newFormName.trim());
    setNewFormName("");
    setShowNewForm(false);
  };

  const cardStyle = (color: string) => ({
    background: "#ffffff",
    borderRadius: 12,
    border: `2px solid ${color}22`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: 12,
  };

  const btnPrimary = {
    padding: "10px 20px",
    background: "#00c2a8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  const btnGhost = {
    padding: "10px 20px",
    background: "none",
    color: "#6b7280",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── Topbar ── */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src={logo} alt="Grupo Soul" style={{ height: 40, objectFit: "contain" }} />
        <span style={{ fontSize: 13, color: "#9ca3af" }}>Plataforma de Formularios</span>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

        {/* Vista: Lista de carpetas */}
        {!selectedFolderId && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Mis Carpetas</h1>
                <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>Organiza tus formularios en carpetas</p>
              </div>
              <button style={btnPrimary} onClick={() => setShowNewFolder(true)}>
                ➕ Nueva carpeta
              </button>
            </div>

            {folders.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 24px", border: "2px dashed #e2e8f0", borderRadius: 16, color: "#9ca3af" }}>
                <span style={{ fontSize: 48 }}>📁</span>
                <p style={{ fontSize: 16, marginTop: 16, marginBottom: 8, fontWeight: 600 }}>No hay carpetas todavía</p>
                <p style={{ fontSize: 14, marginBottom: 20 }}>Crea tu primera carpeta para organizar tus formularios</p>
                <button style={btnPrimary} onClick={() => setShowNewFolder(true)}>Crear carpeta</button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {folders.map((folder) => (
                <div key={folder.id} style={cardStyle(folder.color)}
                  onClick={() => selectFolder(folder.id)}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                >
                  {/* Color top bar */}
                  <div style={{ height: 6, background: folder.color }} />

                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 32 }}>{folder.icon}</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleOpenEdit(folder.id); }}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "4px", borderRadius: 4, color: "#9ca3af" }}
                          title="Editar carpeta"
                        >✏️</button>
                        <button
                          onClick={(e) => { e.stopPropagation(); if (confirm(`¿Eliminar la carpeta "${folder.name}"?`)) deleteFolder(folder.id); }}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "4px", borderRadius: 4, color: "#9ca3af" }}
                          title="Eliminar carpeta"
                        >🗑️</button>
                      </div>
                    </div>

                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{folder.name}</h3>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 12px" }}>
                      {folder.forms.length} formulario{folder.forms.length !== 1 ? "s" : ""}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>Creada: {folder.createdAt}</span>
                      <span style={{ fontSize: 12, color: folder.color, fontWeight: 600 }}>Ver →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Vista: Formularios dentro de una carpeta */}
        {selectedFolder && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <button onClick={() => selectFolder(null)} style={{ ...btnGhost, padding: "8px 14px", fontSize: 13 }}>
                ← Volver
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24 }}>{selectedFolder.icon}</span>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>{selectedFolder.name}</h1>
                </div>
                <p style={{ fontSize: 13, color: "#9ca3af", margin: "2px 0 0 32px" }}>
                  {selectedFolder.forms.length} formulario{selectedFolder.forms.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button style={btnPrimary} onClick={() => setShowNewForm(true)}>
                ➕ Nuevo formulario
              </button>
            </div>

            {selectedFolder.forms.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 24px", border: "2px dashed #e2e8f0", borderRadius: 16, color: "#9ca3af" }}>
                <span style={{ fontSize: 40 }}>📋</span>
                <p style={{ fontSize: 15, marginTop: 12, marginBottom: 8, fontWeight: 600 }}>No hay formularios en esta carpeta</p>
                <p style={{ fontSize: 13, marginBottom: 20 }}>Crea tu primer formulario</p>
                <button style={btnPrimary} onClick={() => setShowNewForm(true)}>Crear formulario</button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {selectedFolder.forms.map((form) => (
                <div key={form.id}
                  style={{ background: "#fff", borderRadius: 10, border: "1.5px solid #e2e8f0", padding: 16, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = selectedFolder.color; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
                  onClick={() => onOpenBuilder(selectedFolder.id, form.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>📋</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (confirm(`¿Eliminar "${form.name}"?`)) deleteForm(selectedFolder.id, form.id); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 14 }}
                    >🗑️</button>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{form.name}</h3>
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Editado: {form.updatedAt}</p>
                  <div style={{ marginTop: 12, padding: "6px 10px", background: selectedFolder.color + "18", borderRadius: 6, textAlign: "center", fontSize: 12, fontWeight: 600, color: selectedFolder.color }}>
                    Abrir editor →
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modal Nueva Carpeta ── */}
      {showNewFolder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Nueva Carpeta</h2>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Nombre</label>
            <input style={inputStyle} placeholder="Ej: Formularios de salud" value={folderName} onChange={(e) => setFolderName(e.target.value)} autoFocus />

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Color</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {FOLDER_COLORS.map((c) => (
                <button key={c.id} onClick={() => setFolderColor(c.value)} title={c.label}
                  style={{ width: 32, height: 32, borderRadius: "50%", background: c.value, border: folderColor === c.value ? "3px solid #111827" : "3px solid transparent", cursor: "pointer" }} />
              ))}
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Ícono</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {FOLDER_ICONS.map((ic) => (
                <button key={ic.id} onClick={() => setFolderIcon(ic.id)} title={ic.label}
                  style={{ width: 40, height: 40, borderRadius: 8, fontSize: 20, border: folderIcon === ic.id ? "2px solid #00c2a8" : "2px solid #e2e8f0", background: folderIcon === ic.id ? "#e6faf7" : "#fff", cursor: "pointer" }}>
                  {ic.id}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button style={btnGhost} onClick={() => setShowNewFolder(false)}>Cancelar</button>
              <button style={btnPrimary} onClick={handleCreateFolder}>Crear carpeta</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Editar Carpeta ── */}
      {showEditFolder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Editar Carpeta</h2>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Nombre</label>
            <input style={inputStyle} value={folderName} onChange={(e) => setFolderName(e.target.value)} autoFocus />

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Color</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {FOLDER_COLORS.map((c) => (
                <button key={c.id} onClick={() => setFolderColor(c.value)} title={c.label}
                  style={{ width: 32, height: 32, borderRadius: "50%", background: c.value, border: folderColor === c.value ? "3px solid #111827" : "3px solid transparent", cursor: "pointer" }} />
              ))}
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Ícono</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {FOLDER_ICONS.map((ic) => (
                <button key={ic.id} onClick={() => setFolderIcon(ic.id)} title={ic.label}
                  style={{ width: 40, height: 40, borderRadius: 8, fontSize: 20, border: folderIcon === ic.id ? "2px solid #00c2a8" : "2px solid #e2e8f0", background: folderIcon === ic.id ? "#e6faf7" : "#fff", cursor: "pointer" }}>
                  {ic.id}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button style={btnGhost} onClick={() => setShowEditFolder(false)}>Cancelar</button>
              <button style={btnPrimary} onClick={handleSaveEditFolder}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Nuevo Formulario ── */}
      {showNewForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Nuevo Formulario</h2>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Nombre del formulario</label>
            <input style={inputStyle} placeholder="Ej: Registro de pacientes" value={newFormName} onChange={(e) => setNewFormName(e.target.value)} autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateForm(); }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button style={btnGhost} onClick={() => setShowNewForm(false)}>Cancelar</button>
              <button style={btnPrimary} onClick={handleCreateForm}>Crear formulario</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}