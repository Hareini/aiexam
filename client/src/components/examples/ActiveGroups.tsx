import ActiveGroups from '../ActiveGroups';

export default function ActiveGroupsExample() {
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

  const handleAction = (action: string, groupId: string) => {
    console.log(`${action} triggered for group ${groupId}`);
  };

  return (
    <div className="p-6 max-w-lg">
      <ActiveGroups
        groups={mockGroups}
        onJoinVideo={(id) => handleAction('Join Video', id)}
        onOpenChat={(id) => handleAction('Open Chat', id)}
        onGroupDetails={(id) => handleAction('Group Details', id)}
      />
    </div>
  );
}