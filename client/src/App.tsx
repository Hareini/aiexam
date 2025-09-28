import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppSidebar from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import ChatInterface from "@/components/ChatInterface";
import ExamWizard from "@/components/ExamWizard";
import ProctoredExam from "@/components/ProctoredExam";
import VoiceRecorder from "@/components/VoiceRecorder";
import AuthForms from "@/components/AuthForms";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Users, Camera, Mic, Settings } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar?: string;
  examsPrepared: number;
  studyHours: number;
  averageScore: number;
  activeGroups: number;
  recentExams: string[];
}

function Router({ user, onNewExam, onShowExam }: { 
  user: User; 
  onNewExam: () => void;
  onShowExam: () => void;
}) {
  const handleAction = (action: string) => {
    console.log(`${action} triggered`);
  };

  const handleSendMessage = (message: string, tier?: string) => {
    console.log('Sending message:', message, tier);
  };

  const handleStartQuiz = (messageId: string) => {
    console.log('Starting quiz for message:', messageId);
  };

  const handleRequestTier = (messageId: string, tier: string) => {
    console.log('Requesting tier:', tier, 'for message:', messageId);
  };

  const handleRecordingComplete = (audioBlob: Blob, transcript?: string) => {
    console.log('Recording completed:', audioBlob, transcript);
  };

  const handleTranscriptReady = (transcript: string) => {
    console.log('Transcript ready:', transcript);
  };

  return (
    <Switch>
      <Route path="/">
        <Dashboard
          user={user}
          onNewExam={onNewExam}
          onJoinGroup={() => handleAction('Join Group')}
          onAITutor={() => handleAction('AI Tutor')}
          onSchedule={() => handleAction('Upload Schedule')}
          onVoiceNote={() => handleAction('Voice Note')}
        />
      </Route>
      
      <Route path="/exams">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" data-testid="text-exams-title">My Exam Preparations</h1>
            <Button onClick={onNewExam} data-testid="button-new-exam-header">
              <BookOpen className="h-4 w-4 mr-2" />
              New Exam Prep
            </Button>
          </div>
          <EmptyState
            icon={BookOpen}
            title="No exam preparations yet"
            description="Create your first exam preparation plan to get started with AI-powered studying and group collaboration."
            actionLabel="Create Exam Prep"
            onAction={onNewExam}
          />
        </div>
      </Route>
      
      <Route path="/tutor">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" data-testid="text-tutor-title">AI Tutor</h1>
          <div className="max-w-4xl">
            <ChatInterface
              onSendMessage={handleSendMessage}
              onStartQuiz={handleStartQuiz}
              onRequestTier={handleRequestTier}
            />
          </div>
        </div>
      </Route>
      
      <Route path="/groups">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" data-testid="text-groups-title">Study Groups</h1>
            <Button onClick={() => handleAction('Create Group')} data-testid="button-create-group">
              <Users className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>
          <EmptyState
            icon={Users}
            title="No study groups"
            description="Join existing groups or create your own to collaborate with other students in real-time video sessions."
            actionLabel="Create Study Group"
            onAction={() => handleAction('Create Group')}
          />
        </div>
      </Route>
      
      <Route path="/voice">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" data-testid="text-voice-title">Voice Notes</h1>
          <div className="max-w-md mx-auto">
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              onTranscriptReady={handleTranscriptReady}
            />
          </div>
        </div>
      </Route>
      
      <Route path="/proctored">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" data-testid="text-proctored-title">Proctored Exams</h1>
            <Button onClick={onShowExam} data-testid="button-start-proctored">
              <Camera className="h-4 w-4 mr-2" />
              Start Practice Exam
            </Button>
          </div>
          <EmptyState
            icon={Camera}
            title="No proctored exams scheduled"
            description="Schedule or start a proctored exam session with AI monitoring and real-time violation detection."
            actionLabel="Start Practice Exam"
            onAction={onShowExam}
          />
        </div>
      </Route>
      
      <Route path="/analytics">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" data-testid="text-analytics-title">Analytics</h1>
          <EmptyState
            icon={BookOpen}
            title="Analytics Dashboard"
            description="Detailed insights into your study patterns, performance metrics, and progress tracking will be displayed here."
          />
        </div>
      </Route>
      
      <Route path="/moderation">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" data-testid="text-moderation-title">Moderation Center</h1>
          <EmptyState
            icon={Camera}
            title="No flagged sessions"
            description="Review proctoring violations, manage user reports, and oversee platform security from this dashboard."
          />
        </div>
      </Route>
      
      <Route path="/settings">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" data-testid="text-settings-title">Settings</h1>
          <EmptyState
            icon={Settings}
            title="Account Settings"
            description="Manage your profile, notification preferences, privacy settings, and subscription details."
          />
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo
  const [showWizard, setShowWizard] = useState(false);
  const [showProctoredExam, setShowProctoredExam] = useState(false);

  //todo: remove mock functionality
  const mockUser: User = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    examsPrepared: 12,
    studyHours: 87,
    averageScore: 89,
    activeGroups: 3,
    recentExams: ["Calculus II", "Physics", "Chemistry", "Statistics"]
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
    setIsAuthenticated(true);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup:', { name, email, password });
    setIsAuthenticated(true);
  };

  const handleGoogleAuth = () => {
    console.log('Google auth triggered');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logout triggered');
    setIsAuthenticated(false);
  };

  const handleNewExam = () => {
    setShowWizard(true);
  };

  const handleExamComplete = (examData: any) => {
    console.log('Exam created:', examData);
    setShowWizard(false);
  };

  const handleExamCancel = () => {
    setShowWizard(false);
  };

  const handleShowProctoredExam = () => {
    setShowProctoredExam(true);
  };

  const handleProctoredExamComplete = () => {
    console.log('Proctored exam completed');
    setShowProctoredExam(false);
  };

  const handleProctoredExamExit = () => {
    console.log('Proctored exam exited');
    setShowProctoredExam(false);
  };

  const handleFlag = (reason: string) => {
    console.log('Violation flagged:', reason);
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  // Show proctored exam in fullscreen mode
  if (showProctoredExam) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <ProctoredExam
              examName="Sample Practice Exam"
              duration={30}
              onComplete={handleProctoredExamComplete}
              onFlag={handleFlag}
              onExitFullscreen={handleProctoredExamExit}
            />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // Show exam wizard as overlay
  if (showWizard) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <ExamWizard onComplete={handleExamComplete} onCancel={handleExamCancel} />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen flex items-center justify-center p-4 bg-background">
              <AuthForms
                onLogin={handleLogin}
                onSignup={handleSignup}
                onGoogleAuth={handleGoogleAuth}
              />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // Main authenticated app
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar user={mockUser} onLogout={handleLogout} />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">AI Exam Preparation Platform</span>
                  </div>
                </header>
                <main className="flex-1 overflow-hidden p-6">
                  <Router 
                    user={mockUser} 
                    onNewExam={handleNewExam}
                    onShowExam={handleShowProctoredExam}
                  />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}