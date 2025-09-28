import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Video, MessageCircle, MoreHorizontal } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

interface Group {
  id: string;
  name: string;
  code: string;
  subject: string;
  memberCount: number;
  members: GroupMember[];
  lastActivity: string;
  isActive: boolean;
}

interface ActiveGroupsProps {
  groups: Group[];
  onJoinVideo: (groupId: string) => void;
  onOpenChat: (groupId: string) => void;
  onGroupDetails: (groupId: string) => void;
}

export default function ActiveGroups({
  groups,
  onJoinVideo,
  onOpenChat,
  onGroupDetails
}: ActiveGroupsProps) {
  if (groups.length === 0) {
    return (
      <Card data-testid="card-active-groups-empty">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Groups
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No active groups</p>
            <p className="text-xs mt-1">Join or create a group to start studying together</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-active-groups">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Active Groups ({groups.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="border rounded-lg p-4 hover-elevate" data-testid={`group-${group.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium" data-testid={`text-group-name-${group.id}`}>{group.name}</h4>
                  {group.isActive && (
                    <Badge variant="default" className="text-xs">Live</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-group-subject-${group.id}`}>{group.subject}</p>
                <p className="text-xs text-muted-foreground">Code: {group.code}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onGroupDetails(group.id)}
                data-testid={`button-group-details-${group.id}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.memberCount > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium">+{group.memberCount - 3}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{group.memberCount} members</span>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChat(group.id)}
                  data-testid={`button-chat-${group.id}`}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Chat
                </Button>
                <Button
                  variant={group.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onJoinVideo(group.id)}
                  data-testid={`button-video-${group.id}`}
                >
                  <Video className="h-3 w-3 mr-1" />
                  {group.isActive ? "Join" : "Start"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}