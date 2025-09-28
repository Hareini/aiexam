import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Trophy, Users } from 'lucide-react';

interface StudentProfileProps {
  name: string;
  email: string;
  avatar?: string;
  examsPrepared: number;
  studyHours: number;
  averageScore: number;
  activeGroups: number;
  recentExams: string[];
}

export default function StudentProfile({
  name,
  email,
  avatar,
  examsPrepared,
  studyHours,
  averageScore,
  activeGroups,
  recentExams
}: StudentProfileProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="hover-elevate" data-testid="card-student-profile">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl" data-testid="text-student-name">{name}</CardTitle>
          <p className="text-muted-foreground" data-testid="text-student-email">{email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium" data-testid="text-exams-prepared">{examsPrepared}</p>
              <p className="text-xs text-muted-foreground">Exams Prepared</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium" data-testid="text-study-hours">{studyHours}h</p>
              <p className="text-xs text-muted-foreground">Study Hours</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium" data-testid="text-average-score">{averageScore}%</p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium" data-testid="text-active-groups">{activeGroups}</p>
              <p className="text-xs text-muted-foreground">Active Groups</p>
            </div>
          </div>
        </div>
        
        {recentExams.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Exams</h4>
            <div className="flex flex-wrap gap-1">
              {recentExams.map((exam, index) => (
                <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-exam-${index}`}>
                  {exam}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}