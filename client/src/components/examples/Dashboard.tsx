import Dashboard from '../Dashboard';

export default function DashboardExample() {
  //todo: remove mock functionality
  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    examsPrepared: 12,
    studyHours: 87,
    averageScore: 89,
    activeGroups: 3,
    recentExams: ["Calculus II", "Physics", "Chemistry", "Statistics"]
  };

  const handleAction = (action: string) => {
    console.log(`${action} triggered`);
  };

  return (
    <div className="p-6">
      <Dashboard
        user={mockUser}
        onNewExam={() => handleAction('New Exam')}
        onJoinGroup={() => handleAction('Join Group')}
        onAITutor={() => handleAction('AI Tutor')}
        onSchedule={() => handleAction('Upload Schedule')}
        onVoiceNote={() => handleAction('Voice Note')}
      />
    </div>
  );
}