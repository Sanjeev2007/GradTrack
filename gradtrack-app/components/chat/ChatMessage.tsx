"use client";

import { Message, MessageContent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Render message content based on type
  const renderContent = () => {
    // If content is a string (user messages or simple text)
    if (typeof message.content === 'string') {
      return (
        <div className="text-slate-700 whitespace-pre-wrap">
          {message.content}
        </div>
      );
    }

    // If content is an array of MessageContent objects (assistant messages with components)
    return (
      <div className="space-y-3">
        {message.content.map((item: MessageContent, index: number) => (
          <div key={index}>
            {item.text && (
              <div className="text-slate-700 whitespace-pre-wrap mb-2">
                {item.text}
              </div>
            )}
            {item.component && <div>{item.component}</div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-lg",
        isUser ? "bg-slate-50" : "bg-white"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-purple-600"
            : "bg-gradient-to-br from-emerald-500 to-teal-600"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">
            {isUser ? "You" : "GradTrack AI"}
          </span>
          <span className="text-xs text-slate-400">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
