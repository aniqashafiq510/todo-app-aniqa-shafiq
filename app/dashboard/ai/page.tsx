"use client";

import { useState } from "react";

import ChatInput from "@/components/ai/ChatInput";
import ChatWindow from "@/components/ai/ChatWindow";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

    /*
      TEMPORARY MOCK AI RESPONSE
      Replace later with your Server Action
    */

    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "This is a temporary AI response. Your Gemini integration will appear here.",
      };

      setMessages((prev) => [...prev, aiMessage]);

      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-white">
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">
          AI Assistant
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Your smart productivity assistant
        </p>
      </div>

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        disabled={isLoading}
      />


      <Link href="/dashboard" className="fixed bottom-6 right-6 z-50 flex items-center gap-2
      rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition
      hover:scale-105 hover:opacity-90 ">

        Back to Dashboard
      </Link>
    </div>
  );
}