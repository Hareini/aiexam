import QuickActions from '../QuickActions';

export default function QuickActionsExample() {
  //todo: remove mock functionality
  const handleAction = (action: string) => {
    console.log(`${action} triggered`);
  };

  return (
    <div className="p-6 max-w-md">
      <QuickActions
        onNewExam={() => handleAction('New Exam')}
        onJoinGroup={() => handleAction('Join Group')}
        onAITutor={() => handleAction('AI Tutor')}
        onSchedule={() => handleAction('Upload Schedule')}
        onVoiceNote={() => handleAction('Voice Note')}
      />
    </div>
  );
}