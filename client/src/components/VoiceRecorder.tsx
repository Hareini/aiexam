import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Play, Pause, Trash2, Upload } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, transcript?: string) => void;
  onTranscriptReady?: (transcript: string) => void;
}

export default function VoiceRecorder({ onRecordingComplete, onTranscriptReady }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
      setIsPlaying(true);
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setTranscript('');
    setRecordingDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;

    setIsTranscribing(true);
    
    // Simulate transcription process
    setTimeout(() => {
      //todo: remove mock functionality
      const mockTranscript = "This is a mock transcription of the recorded audio. In a real implementation, this would use a speech-to-text service like Whisper API.";
      setTranscript(mockTranscript);
      setIsTranscribing(false);
      if (onTranscriptReady) {
        onTranscriptReady(mockTranscript);
      }
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md" data-testid="card-voice-recorder">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Recorder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Recording Controls */}
        <div className="flex items-center justify-center">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className="rounded-full w-16 h-16"
            onClick={isRecording ? stopRecording : startRecording}
            data-testid={isRecording ? "button-stop-recording" : "button-start-recording"}
          >
            {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="text-center space-y-2">
            <Badge variant="destructive" className="animate-pulse">
              Recording
            </Badge>
            <p className="text-lg font-mono" data-testid="text-recording-duration">
              {formatDuration(recordingDuration)}
            </p>
          </div>
        )}

        {/* Playback Controls */}
        {audioBlob && !isRecording && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={playRecording}
                data-testid={isPlaying ? "button-pause-playback" : "button-play-recording"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                variant="outline"
                onClick={deleteRecording}
                data-testid="button-delete-recording"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Duration: {formatDuration(recordingDuration)}
              </p>
            </div>

            {/* Transcription */}
            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={transcribeAudio}
                disabled={isTranscribing}
                data-testid="button-transcribe"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
              </Button>

              {transcript && (
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Transcript:</h4>
                  <p className="text-sm" data-testid="text-transcript">{transcript}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!audioBlob && !isRecording && (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Click the microphone to start recording</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}