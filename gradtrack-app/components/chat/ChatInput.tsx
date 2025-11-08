"use client";

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your studies, goals, or schedule..."
              disabled={disabled}
              rows={1}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '50px', maxHeight: '200px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
