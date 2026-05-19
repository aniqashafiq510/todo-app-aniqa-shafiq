"use client";

import ChatInput from "@/components/ai/ChatInput";
import ChatWindow from "@/components/ai/ChatWindow";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useAIChat } from "@/hooks/useAI";
import { useChatHistory } from "@/hooks/useChatHistory";

export default function AIPage() {

  const {history,loadMore, hasMore} =useChatHistory();
  
  const { messages,input,setInput,handleSend,isLoading,} = useAIChat();

  const allMessages = [
    ...history,
    ...messages,
  ];

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
        messages={allMessages}
        isLoading={isLoading}
        onLoadMore={loadMore}
        hasMore={hasMore}

      />

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        disabled={isLoading}
      />

      <Link href="/dashboard" className="fixed bottom-6 right-6 z-50">
        <Button>Back to Dashboard</Button>
      </Link>

    </div>
  );
}