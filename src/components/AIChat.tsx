
import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AIChat = ({ document, credits, onDeductCredits }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm here to help you with "${document.title}". Ask me anything about the document content and I'll provide contextual answers based on what I've learned from it.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleResponses = [
    "Based on the document content, this concept is explained in Chapter 2. The key principle here is that...",
    "According to the material, there are several important factors to consider. Let me break them down for you...",
    "The document covers this topic in detail. Here's what you need to know...",
    "Great question! The document explains this concept through examples and practical applications...",
    "This is addressed in multiple sections of the document. The main takeaway is...",
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || credits < 2) {
      if (credits < 2) {
        alert("Not enough credits! You need 2 credits per question.");
      }
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    onDeductCredits(2);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)] + ` This directly relates to your question about "${inputMessage}".`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-2 max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                ) : (
                  <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                )}
              </div>
              <div className={`rounded-lg p-2 sm:p-3 min-w-0 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-xs sm:text-sm leading-relaxed break-words">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-2 max-w-[90%] sm:max-w-[85%] lg:max-w-[80%]">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-2 sm:p-3 lg:p-4 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about the document..."
            disabled={isTyping || credits < 2}
            className="flex-1 text-xs sm:text-sm min-w-0"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping || credits < 2}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-2 sm:px-3 lg:px-4 flex-shrink-0"
            size="sm"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-1 sm:mt-2 text-xs text-gray-500">
          <span className="truncate">2 credits per question</span>
          {credits < 2 && <span className="text-red-600 ml-2 flex-shrink-0">Not enough credits</span>}
        </div>
      </div>
    </div>
  );
};

export default AIChat;
