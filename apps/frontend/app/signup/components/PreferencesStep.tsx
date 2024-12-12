export const PreferencesStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  return (
    <div>
      <h2>Preferences</h2>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}; 