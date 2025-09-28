import ExamWizard from '../ExamWizard';

export default function ExamWizardExample() {
  //todo: remove mock functionality
  const handleComplete = (examData: any) => {
    console.log('Exam created:', examData);
  };

  const handleCancel = () => {
    console.log('Wizard cancelled');
  };

  return (
    <div className="p-6">
      <ExamWizard onComplete={handleComplete} onCancel={handleCancel} />
    </div>
  );
}