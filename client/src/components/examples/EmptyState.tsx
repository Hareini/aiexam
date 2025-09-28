import EmptyState from '../EmptyState';
import { BookOpen } from 'lucide-react';
import emptyQuizIcon from '@assets/generated_images/Empty_quiz_state_icon_648c3e82.png';

export default function EmptyStateExample() {
  //todo: remove mock functionality
  const handleAction = () => {
    console.log('Empty state action triggered');
  };

  return (
    <div className="p-6 space-y-8">
      <div className="border rounded-lg">
        <EmptyState
          icon={BookOpen}
          title="No exams yet"
          description="Create your first exam preparation plan to get started with AI-powered studying."
          actionLabel="Create Exam"
          onAction={handleAction}
        />
      </div>
      
      <div className="border rounded-lg">
        <EmptyState
          imageSrc={emptyQuizIcon}
          title="No quizzes available"
          description="Complete some AI tutor sessions to unlock practice quizzes for your subjects."
        />
      </div>
    </div>
  );
}