"use client";

import { useState } from "react";
import { chatWithAI } from "@/serverActions/ai/chat";
import type { AIChat } from "@/types/types";

export function useAIChat() {
  const [messages, setMessages] = useState<AIChat[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const  handleSend = async() => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    setIsLoading(true);

    const userMessage: AIChat = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };

    const aiMessageId = crypto.randomUUID();

    const assistantMessage: AIChat = {
      id: aiMessageId,
      role: "assistant",
      content: "",
    };

    const updatedMessages = [
      ...messages,
      userMessage,
      assistantMessage,
    ];

    setMessages(updatedMessages);
    setInput("");

    try {
      const textStream = await chatWithAI(updatedMessages);

      let aiText = "";

      for await (const chunk of textStream) {
        aiText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: aiText }
              : msg
          )
        );
      }
    } 
    catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content:
                  error instanceof Error
                    ? error.message
                    : "Something went wrong",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    isLoading,
  };
}