import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StudentProfile from './StudentProfile';
import QuickActions from './QuickActions';
import ActiveGroups from './ActiveGroups';
import EmptyState from './EmptyState';
import { Search, BookOpen, TrendingUp, Clock, Users } from 'lucide-react';
import bannerImage from '@assets/generated_images/Students_studying_together_banner_362fb0e5.png';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    examsPrepared: number;
    studyHours: number;
    averageScore: number;
    activeGroups: number;
    recentExams: string[];
  };
  onNewExam: () => void;
  onJoinGroup: () => void;
  onAITutor: () => void;
  onSchedule: () => void;
  onVoiceNote: () => void;
}

export default function Dashboard({
  user,
  onNewExam,
  onJoinGroup,
  onAITutor,
  onSchedule,
  onVoiceNote
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  //todo: remove mock functionality
  const mockGroups = [
    {
      id: "1",
      name: "Calculus Study Group",
      code: "CALC123",
      subject: "Mathematics",
      memberCount: 5,
      members: [
        { id: "1", name: "Sarah Chen", isOnline: true },
        { id: "2", name: "Mike Rodriguez", isOnline: true },
        { id: "3", name: "Emma Davis", isOnline: false },
      ],
      lastActivity: "5 minutes ago",
      isActive: true
    },
    {
      id: "2",
      name: "Physics Prep",
      code: "PHYS456",
      subject: "Physics",
      memberCount: 3,
      members: [
        { id: "4", name: "John Smith", isOnline: false },
        { id: "5", name: "Lisa Wang", isOnline: true },
      ],
      lastActivity: "2 hours ago",
      isActive: false
    }
  ];

  const recentActivity = [
    { id: "1", type: "quiz", subject: "Calculus", score: 92, time: "2 hours ago" },
    { id: "2", type: "study", subject: "Physics", duration: 45, time: "1 day ago" },
    { id: "3", type: "group", subject: "Chemistry", participants: 4, time: "2 days ago" },
  ];

  const handleGroupAction = (action: string, groupId: string) => {
    console.log(`${action} triggered for group ${groupId}`);
  };

  return (
    <div className="space-y-6" data-testid="dashboard">
      {/* Hero Banner */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Students studying together"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <CardContent className="relative z-10 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Ready to excel in your exams with AI-powered studying?
          </p>
          <Button
            size="lg"
            onClick={onNewExam}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-hero-new-exam"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Start New Exam Prep
          </Button>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card data-testid="card-search">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics, exams, or groups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <StudentProfile {...user} />
          <QuickActions
            onNewExam={onNewExam}
            onJoinGroup={onJoinGroup}
            onAITutor={onAITutor}
            onSchedule={onSchedule}
            onVoiceNote={onVoiceNote}
          />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Study Stats */}
          <Card data-testid="card-study-stats">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Study Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold" data-testid="text-this-week-hours">24h</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold" data-testid="text-exams-progress">3</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card data-testid="card-recent-activity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {activity.type === 'quiz' && <BookOpen className="h-4 w-4 text-primary" />}
                      {activity.type === 'study' && <Clock className="h-4 w-4 text-primary" />}
                      {activity.type === 'group' && <Users className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" data-testid={`text-activity-${activity.id}`}>
                        {activity.type === 'quiz' && `Quiz completed - ${activity.subject} (${activity.score}%)`}
                        {activity.type === 'study' && `Studied ${activity.subject} for ${activity.duration} minutes`}
                        {activity.type === 'group' && `Group study session - ${activity.subject} with ${activity.participants} people`}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={Clock}
                  title="No recent activity"
                  description="Start studying to see your activity here"
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ActiveGroups
            groups={mockGroups}
            onJoinVideo={(id) => handleGroupAction('Join Video', id)}
            onOpenChat={(id) => handleGroupAction('Open Chat', id)}
            onGroupDetails={(id) => handleGroupAction('Group Details', id)}
          />

          {/* Upcoming Deadlines */}
          <Card data-testid="card-deadlines">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={BookOpen}
                title="No deadlines"
                description="Your schedule is clear! Add exams to track important dates."
                actionLabel="Add Exam Date"
                onAction={() => console.log('Add deadline')}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}