"use client";

import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Loader2 } from 'lucide-react';

export function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-800">GradTrack AI Assistant</h1>
        <p className="text-sm text-slate-500">Your personal productivity companion</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                Welcome to GradTrack!
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                I&apos;m your AI-powered productivity assistant. Ask me to help you plan your week,
                track your study hours, or manage your goals.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => sendMessage("Show my study progress")}
                  className="text-left p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">
                    📚 Study Progress
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    View your study hours and trends
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("How's my gym consistency?")}
                  className="text-left p-4 rounded-lg border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">
                    💪 Gym Consistency
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Check your fitness attendance
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("Show me my goals")}
                  className="text-left p-4 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">
                    🎯 My Goals
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Track your goal progress
                  </p>
                </button>
                <button
                  onClick={() => sendMessage("Plan my week")}
                  className="text-left p-4 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">
                    📅 Weekly Overview
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    See your complete week summary
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 p-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">GradTrack is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
