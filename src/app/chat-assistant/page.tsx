'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaPaperPlane, FaUser, FaRobot, FaSpinner, FaTrash } from 'react-icons/fa';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Chat Assistant. I can help you with questions about government regulations, legal matters, or any general topics. I can also tell you about the project's co-founder and CEO. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your AI Chat Assistant. I can help you with questions about government regulations, legal matters, or any general topics. I can also tell you about the project's co-founder and CEO. How can I assist you today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Chat Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ask me anything! I can help with legal questions, government regulations, 
            general topics, or tell you about our team.
          </p>
        </section>

        <div className="max-w-4xl mx-auto">
          {/* Chat Container */}
          <div className="card h-96 flex flex-col">
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Chat with AI Assistant</h2>
              <button
                onClick={clearChat}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Clear chat"
              >
                <FaTrash className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <FaRobot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <FaRobot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <FaSpinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <FaPaperPlane className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setInputMessage("What are the latest government regulations for small businesses?")}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <h4 className="font-medium mb-1">Government Regulations</h4>
                <p className="text-sm text-gray-600">Ask about new business regulations</p>
              </button>
              <button
                onClick={() => setInputMessage("Tell me about the project's co-founder and CEO")}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <h4 className="font-medium mb-1">About the Team</h4>
                <p className="text-sm text-gray-600">Learn about our leadership</p>
              </button>
              <button
                onClick={() => setInputMessage("What is SmartDocGen and how does it work?")}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <h4 className="font-medium mb-1">About SmartDocGen</h4>
                <p className="text-sm text-gray-600">Learn about our platform</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
