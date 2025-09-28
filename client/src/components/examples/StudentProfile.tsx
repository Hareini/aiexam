import StudentProfile from '../StudentProfile';

export default function StudentProfileExample() {
  //todo: remove mock functionality
  const mockData = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    examsPrepared: 12,
    studyHours: 87,
    averageScore: 89,
    activeGroups: 3,
    recentExams: ["Calculus II", "Physics", "Chemistry", "Statistics"]
  };

  return (
    <div className="p-6 max-w-md">
      <StudentProfile {...mockData} />
    </div>
  );
}