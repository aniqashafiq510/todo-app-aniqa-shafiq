"use client";

import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import type { ChatWindowProps } from "@/types/types";


export default function ChatWindow({messages,isLoading,onLoadMore,hasMore,}: ChatWindowProps) {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">

      {/* EMPTY STATE */}
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-2">
              AI Productivity Assistant
            </h2>

            <p className="text-sm text-zinc-500">
              Ask AI to organize tasks, prioritize work,
              plan your day, or improve productivity.
            </p>
          </div>
        </div>
      )}

      {/* PAGINATION BUTTON */}
      {hasMore && (
        <div className="flex justify-center mb-4">
          <button
            onClick={onLoadMore}
            className="text-xs px-3 py-1 border rounded-md text-zinc-600 hover:bg-zinc-100 transition"
          >
            Load older messages
          </button>
        </div>
      )}

      {/* MESSAGES */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}

      {/* STREAMING INDICATOR */}
      {isLoading && (
        <div className="text-sm text-zinc-500 px-2 mt-2">
          AI is thinking...
        </div>
      )}

      {/* AUTO SCROLL TARGET */}
      <div ref={bottomRef} />
    </div>
  );
}