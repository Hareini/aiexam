import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Brain, User, Copy, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface ExamWizardProps {
  onComplete: (examData: ExamData) => void;
  onCancel: () => void;
}

interface ExamData {
  name: string;
  description: string;
  totalHours: number;
  mode: 'single' | 'group';
  tutorType: 'ai' | 'human';
  groupCode?: string;
}

const steps = [
  { id: 1, title: 'Exam Details', icon: BookOpen },
  { id: 2, title: 'Study Mode', icon: Users },
  { id: 3, title: 'Tutor Type', icon: Brain },
  { id: 4, title: 'Review', icon: Check }
];

export default function ExamWizard({ onComplete, onCancel }: ExamWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [examData, setExamData] = useState<ExamData>({
    name: '',
    description: '',
    totalHours: 10,
    mode: 'single',
    tutorType: 'ai'
  });

  const generateGroupCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleNext = () => {
    if (currentStep === 2 && examData.mode === 'group' && !examData.groupCode) {
      setExamData(prev => ({ ...prev, groupCode: generateGroupCode() }));
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(examData);
  };

  const copyGroupCode = () => {
    if (examData.groupCode) {
      navigator.clipboard.writeText(examData.groupCode);
      console.log('Group code copied');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return examData.name.trim() && examData.totalHours > 0;
      case 2:
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="card-exam-wizard">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Create New Exam Preparation
        </CardTitle>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`rounded-full p-2 border-2 ${
                  currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Exam Details */}
        {currentStep === 1 && (
          <div className="space-y-4" data-testid="step-exam-details">
            <div>
              <Label htmlFor="exam-name">Exam Name</Label>
              <Input
                id="exam-name"
                placeholder="e.g., Calculus II Final Exam"
                value={examData.name}
                onChange={(e) => setExamData(prev => ({ ...prev, name: e.target.value }))}
                data-testid="input-exam-name"
              />
            </div>
            <div>
              <Label htmlFor="exam-description">Description (Optional)</Label>
              <Textarea
                id="exam-description"
                placeholder="Additional details about the exam..."
                value={examData.description}
                onChange={(e) => setExamData(prev => ({ ...prev, description: e.target.value }))}
                data-testid="input-exam-description"
              />
            </div>
            <div>
              <Label htmlFor="total-hours">Total Study Hours</Label>
              <Input
                id="total-hours"
                type="number"
                min="1"
                max="200"
                value={examData.totalHours}
                onChange={(e) => setExamData(prev => ({ ...prev, totalHours: parseInt(e.target.value) || 0 }))}
                data-testid="input-total-hours"
              />
            </div>
          </div>
        )}

        {/* Step 2: Study Mode */}
        {currentStep === 2 && (
          <div className="space-y-4" data-testid="step-study-mode">
            <Label>Study Mode</Label>
            <RadioGroup
              value={examData.mode}
              onValueChange={(value: 'single' | 'group') => setExamData(prev => ({ ...prev, mode: value }))}
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate">
                <RadioGroupItem value="single" id="single" data-testid="radio-single-mode" />
                <Label htmlFor="single" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Solo Study</p>
                      <p className="text-sm text-muted-foreground">Study independently with AI assistance</p>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate">
                <RadioGroupItem value="group" id="group" data-testid="radio-group-mode" />
                <Label htmlFor="group" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Group Study</p>
                      <p className="text-sm text-muted-foreground">Collaborate with others in real-time</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {examData.mode === 'group' && examData.groupCode && (
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium">Group Code</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-lg font-mono px-3 py-1" data-testid="text-group-code">
                    {examData.groupCode}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyGroupCode}
                    data-testid="button-copy-group-code"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Share this code with others to join your study group
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Tutor Type */}
        {currentStep === 3 && (
          <div className="space-y-4" data-testid="step-tutor-type">
            <Label>Tutor Preference</Label>
            <RadioGroup
              value={examData.tutorType}
              onValueChange={(value: 'ai' | 'human') => setExamData(prev => ({ ...prev, tutorType: value }))}
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate">
                <RadioGroupItem value="ai" id="ai-tutor" data-testid="radio-ai-tutor" />
                <Label htmlFor="ai-tutor" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5" />
                    <div>
                      <p className="font-medium">AI Tutor</p>
                      <p className="text-sm text-muted-foreground">24/7 available, instant responses, personalized learning</p>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate">
                <RadioGroupItem value="human" id="human-tutor" data-testid="radio-human-tutor" />
                <Label htmlFor="human-tutor" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Human Tutor</p>
                      <p className="text-sm text-muted-foreground">Expert guidance, scheduled sessions (requires credits)</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-4" data-testid="step-review">
            <h3 className="font-medium">Review Your Exam Preparation</h3>
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-sm font-medium">Exam Name</Label>
                <p className="text-sm" data-testid="review-exam-name">{examData.name}</p>
              </div>
              {examData.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm" data-testid="review-description">{examData.description}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Study Hours</Label>
                <p className="text-sm" data-testid="review-hours">{examData.totalHours} hours</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Mode</Label>
                <p className="text-sm" data-testid="review-mode">
                  {examData.mode === 'single' ? 'Solo Study' : 'Group Study'}
                  {examData.groupCode && ` (Code: ${examData.groupCode})`}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Tutor Type</Label>
                <p className="text-sm" data-testid="review-tutor">
                  {examData.tutorType === 'ai' ? 'AI Tutor' : 'Human Tutor'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button variant="outline" onClick={onCancel} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
          
          <div>
            {currentStep < steps.length ? (
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                data-testid="button-next"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleComplete} data-testid="button-complete">
                <Check className="h-4 w-4 mr-1" />
                Create Exam Prep
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}