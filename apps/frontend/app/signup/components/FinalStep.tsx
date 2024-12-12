export const FinalStep = ({ onBack }: { onBack: () => void }) => {
  return (
    <div>
      <h2>Final Step</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
}; 