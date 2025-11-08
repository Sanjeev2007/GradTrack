"use client";

import { useState, useCallback } from 'react';
import { Message } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { generateResponse } from '@/lib/responseGenerator';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate typing delay for more realistic feel
      const typingDelay = 800 + Math.random() * 400; // 800-1200ms
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      // Generate intelligent response based on user input (now async with API calls)
      const responseContent = await generateResponse(content.trim());

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Handle any errors during response generation
      console.error('[useChat] Error generating response:', error);

      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: "I'm having trouble fetching your data right now. Please make sure the backend server is running and try again.",
          },
        ],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
