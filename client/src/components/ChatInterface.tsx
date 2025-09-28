import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Brain, User, Lightbulb, BookOpen, Target } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  tier?: 'summary' | 'core' | 'deep';
  hasQuiz?: boolean;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string, tier?: string) => void;
  onStartQuiz: (messageId: string) => void;
  onRequestTier: (messageId: string, tier: 'summary' | 'core' | 'deep') => void;
}

export default function ChatInterface({ onSendMessage, onStartQuiz, onRequestTier }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    //todo: remove mock functionality
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI tutor. I can explain topics in three levels of detail: Summary (quick overview), Core (essential concepts), or Deep Dive (comprehensive analysis). What would you like to learn about today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'d be happy to help you with that topic! Let me explain it in different levels of detail. Which depth would you prefer?',
        timestamp: new Date(),
        hasQuiz: true,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);

    onSendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'summary': return <Lightbulb className="h-3 w-3" />;
      case 'core': return <BookOpen className="h-3 w-3" />;
      case 'deep': return <Target className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'summary': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'core': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'deep': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card className="h-full flex flex-col" data-testid="card-chat-interface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Tutor Chat
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 mb-4" data-testid="scroll-chat-messages">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${message.id}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.tier && (
                      <Badge className={`mb-2 text-xs ${getTierColor(message.tier)}`}>
                        {getTierIcon(message.tier)}
                        <span className="ml-1 capitalize">{message.tier}</span>
                      </Badge>
                    )}
                    
                    <p className="text-sm whitespace-pre-wrap" data-testid={`text-message-${message.id}`}>
                      {message.content}
                    </p>
                    
                    {message.type === 'ai' && message.hasQuiz && (
                      <div className="mt-3 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRequestTier(message.id, 'summary')}
                            data-testid={`button-tier-summary-${message.id}`}
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Summary
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRequestTier(message.id, 'core')}
                            data-testid={`button-tier-core-${message.id}`}
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            Core
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRequestTier(message.id, 'deep')}
                            data-testid={`button-tier-deep-${message.id}`}
                          >
                            <Target className="h-3 w-3 mr-1" />
                            Deep Dive
                          </Button>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onStartQuiz(message.id)}
                          data-testid={`button-quiz-${message.id}`}
                        >
                          Start Quiz
                        </Button>
                      </div>
                    )}
                    
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your subject..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            data-testid="input-chat-message"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}