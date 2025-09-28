import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Brain, Calendar, Mic } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  onClick: () => void;
}

interface QuickActionsProps {
  onNewExam: () => void;
  onJoinGroup: () => void;
  onAITutor: () => void;
  onSchedule: () => void;
  onVoiceNote: () => void;
}

export default function QuickActions({
  onNewExam,
  onJoinGroup,
  onAITutor,
  onSchedule,
  onVoiceNote
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'new-exam',
      title: 'New Exam Prep',
      description: 'Create a new study plan',
      icon: <Plus className="h-5 w-5" />,
      variant: 'default',
      onClick: onNewExam
    },
    {
      id: 'join-group',
      title: 'Join Group',
      description: 'Study with others',
      icon: <Users className="h-5 w-5" />,
      variant: 'outline',
      onClick: onJoinGroup
    },
    {
      id: 'ai-tutor',
      title: 'AI Tutor',
      description: 'Get instant help',
      icon: <Brain className="h-5 w-5" />,
      variant: 'outline',
      onClick: onAITutor
    },
    {
      id: 'schedule',
      title: 'Upload Schedule',
      description: 'Import your timetable',
      icon: <Calendar className="h-5 w-5" />,
      variant: 'outline',
      onClick: onSchedule
    },
    {
      id: 'voice-note',
      title: 'Voice Note',
      description: 'Record study notes',
      icon: <Mic className="h-5 w-5" />,
      variant: 'outline',
      onClick: onVoiceNote
    }
  ];

  return (
    <Card data-testid="card-quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            className="w-full justify-start h-auto p-4"
            onClick={action.onClick}
            data-testid={`button-${action.id}`}
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}