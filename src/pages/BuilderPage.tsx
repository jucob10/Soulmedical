import BuilderLayout from "../components/builder/BuilderLayout";

type BuilderPageProps = {
  folderId: string;
  formId: string;
  onBack: () => void;
};

export default function BuilderPage({ folderId, formId, onBack }: BuilderPageProps) {
  return <BuilderLayout onBack={onBack} />;
}