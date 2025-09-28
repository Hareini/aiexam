import VoiceRecorder from '../VoiceRecorder';

export default function VoiceRecorderExample() {
  //todo: remove mock functionality
  const handleRecordingComplete = (audioBlob: Blob, transcript?: string) => {
    console.log('Recording completed:', audioBlob, transcript);
  };

  const handleTranscriptReady = (transcript: string) => {
    console.log('Transcript ready:', transcript);
  };

  return (
    <div className="p-6 flex justify-center">
      <VoiceRecorder
        onRecordingComplete={handleRecordingComplete}
        onTranscriptReady={handleTranscriptReady}
      />
    </div>
  );
}