import ChatInterface from '../ChatInterface';

export default function ChatInterfaceExample() {
  //todo: remove mock functionality
  const handleSendMessage = (message: string, tier?: string) => {
    console.log('Sending message:', message, tier);
  };

  const handleStartQuiz = (messageId: string) => {
    console.log('Starting quiz for message:', messageId);
  };

  const handleRequestTier = (messageId: string, tier: string) => {
    console.log('Requesting tier:', tier, 'for message:', messageId);
  };

  return (
    <div className="p-6 h-96">
      <ChatInterface
        onSendMessage={handleSendMessage}
        onStartQuiz={handleStartQuiz}
        onRequestTier={handleRequestTier}
      />
    </div>
  );
}