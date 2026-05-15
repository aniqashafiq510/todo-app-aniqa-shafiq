"use client";

import { useState } from "react";
import { chatWithAI } from "@/serverActions/ai/chat";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    // 1. APPEND USER MESSAGE
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // 2. CREATE A PLACEHOLDER FOR THE ASSISTANT'S STREAMING RESPONSE
    const aiMessageId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    try {
      // 3. EXECUTE SERVER ACTION (Returns a direct AsyncIterable stream)
      const textStream = await chatWithAI(currentInput);
      let aiText = "";

      // 4. READ THE TEXT STREAM DIRECTLY NATIVELY
      // No response.body, no getReader(), no TextDecoder required
      for await (const chunk of textStream) {
        aiText += chunk;

        // 5. UPDATE STATE LIVE CHUNK BY CHUNK
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: aiText }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      // Optional: Update the placeholder message with an error state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: "Error: Failed to generate response." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    messages,
    input,
    setInput,
    handleSend,
    isLoading,
  };
}
