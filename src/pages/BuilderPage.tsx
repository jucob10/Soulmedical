import { useEffect } from "react";
import BuilderLayout from "../components/builder/BuilderLayout";
import { useBuilderStore } from "../store/useBuilderStore";
import { useFolderStore } from "../store/useFolderStore";

type BuilderPageProps = {
  folderId?: string;
  formId?: string;
  onBack?: () => void;
};

export default function BuilderPage({ folderId, formId, onBack }: BuilderPageProps) {
  const { setWidgets, clearWidgets } = useBuilderStore();
  const { folders } = useFolderStore();

  // Cargar widgets guardados cuando se abre el formulario
  useEffect(() => {
    if (!folderId || !formId) return;

    const folder = folders.find((f) => f.id === folderId);
    const form = folder?.forms.find((fm) => fm.id === formId);

    if (form?.widgets) {
      setWidgets(form.widgets);
    } else {
      clearWidgets();
    }
  }, [folderId, formId, folders, setWidgets, clearWidgets]);

  return <BuilderLayout folderId={folderId} formId={formId} onBack={onBack} />;
}