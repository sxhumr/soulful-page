'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Anchor to manage scroll positioning
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input.trim();
    const updatedMessages = [...messages, { role: 'user', content: currentInput }];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server returned unhealthy status: ${response.status}`);
      }

      // Safe JSON parsing barrier to neutralize infinite loading loops
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error('Response format invalid. Could not parse payload.');
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      if (responseData?.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: responseData.content }]);
      } else {
        throw new Error('Received an empty response from the healing assistant.');
      }

    } catch (err) {
      console.error('Chat interface failure:', err);
      setError(err.message || 'An error occurred. Please try your request again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] mx-auto p-4 flex flex-col h-[500px] border border-gray-200 rounded-xl bg-white shadow-sm">
      {/* Scrollable Conversation Arena */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-1">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-6 italic">
            Welcome to Soulful Healing. How may I assist your journey today?
          </p>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[85%] text-sm whitespace-pre-wrap break-words ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white ml-auto'
                : 'bg-gray-100 text-gray-800 mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-400 text-xs italic animate-pulse pl-1">
            Soulful Assistant is typing...
          </div>
        )}

        {error && (
          <div className="text-red-600 text-xs p-3 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Subsystem: Strict 16px font alignment to block iOS zoom */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask us a question..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          style={{ fontSize: '16px' }} 
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
          style={{ fontSize: '16px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}