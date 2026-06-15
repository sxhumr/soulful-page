'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
    <div className="w-full sm:max-w-[520px] mx-auto flex flex-col h-[85dvh] sm:h-[600px] border-0 sm:border border-gray-200 rounded-none sm:rounded-xl bg-white shadow-none sm:shadow-sm transition-all duration-200">
      
      {/* Scrollable Conversation Arena */}
      {/* overscroll-contain blocks the bounce effect from shifting the parent page layout on iOS/Android */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 pb-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <p className="text-gray-400 text-sm italic max-w-[280px]">
              Welcome to Soulful Healing. How may I assist your journey today?
            </p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3.5 rounded-2xl max-w-[88%] sm:max-w-[80%] text-[15px] leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white ml-auto rounded-tr-none'
                : 'bg-gray-100 text-gray-800 mr-auto rounded-tl-none'
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400 text-xs italic pl-1 animate-pulse">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            <span className="pl-1">Soulful Assistant is channeling...</span>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-xs p-3.5 bg-red-50 rounded-xl border border-red-100 animate-fadeIn">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Subsystem */}
      {/* Border-t separates the tray cleanly on flat edge-to-edge mobile screens */}
      <form 
        onSubmit={handleSendMessage} 
        className="p-3 sm:p-4 bg-white border-t border-gray-100 flex gap-2 items-center safe-bottom"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask us a question..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white transition-all shadow-inner"
          style={{ fontSize: '16px' }} // Excellent insurance against iOS zoom safari bugs
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white h-[46px] px-5 rounded-xl text-sm font-semibold hover:bg-indigo-700 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:scale-100 transition-all flex items-center justify-center shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}