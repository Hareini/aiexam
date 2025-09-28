import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Camera, Clock, Eye, EyeOff, Flag } from 'lucide-react';

interface ProctoredExamProps {
  examName: string;
  duration: number; // in minutes
  onComplete: () => void;
  onFlag: (reason: string) => void;
  onExitFullscreen: () => void;
}

export default function ProctoredExam({
  examName,
  duration,
  onComplete,
  onFlag,
  onExitFullscreen
}: ProctoredExamProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // in seconds
  const [isRecording, setIsRecording] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [violations, setViolations] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onFlag('Exited fullscreen mode');
        setViolations(prev => [...prev, 'Exited fullscreen']);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        onFlag('Tab switched or window minimized');
        setViolations(prev => [...prev, 'Tab switched']);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onFlag]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentRemaining = timeRemaining / (duration * 60);
    if (percentRemaining > 0.5) return 'text-green-600';
    if (percentRemaining > 0.25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const simulateViolation = (type: string) => {
    onFlag(`Simulated: ${type}`);
    setViolations(prev => [...prev, type]);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col" data-testid="proctored-exam-interface">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold" data-testid="text-exam-name">{examName}</h1>
          <Badge variant={violations.length > 0 ? "destructive" : "default"}>
            Proctored Session
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Camera Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
            <Camera className="h-4 w-4" />
            <span className="text-sm">{cameraEnabled ? 'Recording' : 'Offline'}</span>
          </div>
          
          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className={`text-lg font-mono font-bold ${getTimeColor()}`} data-testid="text-time-remaining">
              {formatTime(timeRemaining)}
            </span>
          </div>
          
          {/* Violations */}
          {violations.length > 0 && (
            <div className="flex items-center gap-2 text-destructive">
              <Flag className="h-4 w-4" />
              <span className="text-sm" data-testid="text-violations">{violations.length} flags</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Exam Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Exam Questions</h2>
              <div className="space-y-6">
                {/* Simulated exam content */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Question 1 of 10</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a sample question for the proctored exam interface. 
                    In a real implementation, this would be populated with actual exam content.
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="q1" value="a" />
                      <span className="text-sm">Option A</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="q1" value="b" />
                      <span className="text-sm">Option B</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="q1" value="c" />
                      <span className="text-sm">Option C</span>
                    </label>
                  </div>
                </div>
                
                {/* Demo violation buttons */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">Demo: Simulate Violations</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => simulateViolation('Multiple faces detected')}
                      data-testid="button-simulate-multiple-faces"
                    >
                      Multiple Faces
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => simulateViolation('No face detected')}
                      data-testid="button-simulate-no-face"
                    >
                      No Face
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => simulateViolation('Audio anomaly')}
                      data-testid="button-simulate-audio"
                    >
                      Audio Issue
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera Preview */}
        <div className="w-64 p-4 border-l bg-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Camera Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCameraEnabled(!cameraEnabled)}
                data-testid="button-toggle-camera"
              >
                {cameraEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              {cameraEnabled ? (
                <div className="text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Camera Active</p>
                </div>
              ) : (
                <div className="text-center">
                  <EyeOff className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Camera Disabled</p>
                </div>
              )}
            </div>

            {/* Recording Status */}
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-muted-foreground">
                {isRecording ? 'Recording session' : 'Not recording'}
              </span>
            </div>

            {/* Violation History */}
            {violations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-xs">Recent Flags</h4>
                <div className="space-y-1">
                  {violations.slice(-3).map((violation, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-destructive/10 rounded text-xs">
                      <AlertCircle className="h-3 w-3 text-destructive" />
                      <span className="text-destructive">{violation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t bg-card">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onExitFullscreen}
            data-testid="button-exit-exam"
          >
            Exit Exam
          </Button>
          <Button
            onClick={onComplete}
            data-testid="button-submit-exam"
          >
            Submit Exam
          </Button>
        </div>
      </div>
    </div>
  );
}