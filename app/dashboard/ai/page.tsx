"use client";

import { useState } from "react";

import ChatInput from "@/components/ai/ChatInput";
import ChatWindow from "@/components/ai/ChatWindow";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAIChat } from "@/hooks/useAI";






export default function AIPage() {

  const {messages,input,setInput,handleSend, isLoading} = useAIChat()

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


      <Link href="/dashboard" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition
      hover:scale-105 hover:opacity-90 ">

        <Button>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}