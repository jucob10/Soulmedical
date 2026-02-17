import { useState } from "react";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";

type View = "home" | "builder";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [currentFolder, setCurrentFolder] = useState("");
  const [currentForm, setCurrentForm] = useState("");

  const handleOpenBuilder = (folderId: string, formId: string) => {
    setCurrentFolder(folderId);
    setCurrentForm(formId);
    setView("builder");
  };

  if (view === "builder") {
    return (
      <BuilderPage
        folderId={currentFolder}
        formId={currentForm}
        onBack={() => setView("home")}
      />
    );
  }

  return <HomePage onOpenBuilder={handleOpenBuilder} />;
}