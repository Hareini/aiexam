import ProctoredExam from '../ProctoredExam';

export default function ProctoredExamExample() {
  //todo: remove mock functionality
  const handleComplete = () => {
    console.log('Exam completed');
  };

  const handleFlag = (reason: string) => {
    console.log('Violation flagged:', reason);
  };

  const handleExitFullscreen = () => {
    console.log('Exit fullscreen');
  };

  return (
    <ProctoredExam
      examName="Calculus II Final Exam"
      duration={90}
      onComplete={handleComplete}
      onFlag={handleFlag}
      onExitFullscreen={handleExitFullscreen}
    />
  );
}