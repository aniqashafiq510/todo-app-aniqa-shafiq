"use client";

import { useEffect, useState } from "react";
import { getChatHistory } from "@/serverActions/ai/history";

import type { ChatHistory, RawMessage } from "@/types/types";

export function useChatHistory() {

  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  // ✅ normalizer
  const normalizeMessage = (msg : RawMessage ): ChatHistory => ({
    id: msg.id,
    userId: msg.userId,
    role: msg.role as "user" | "assistant",
    content: msg.content,
    createdAt:
      msg.createdAt instanceof Date
        ? msg.createdAt
        : new Date(msg.createdAt),
  });

// Initial load
useEffect(() => {
  // 1. Move the async function inside the effect
  async function loadInitial() {
    setLoading(true);

    try {
      const res = await getChatHistory(20);

      setHistory(
        res.messages.map(normalizeMessage)
      );

      setCursor(res.nextCursor);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  // 2. Execute the function safely
  loadInitial();
  
  // 3. Keep dependency array relevant (omit loadInitial since it is local now)
}, []); 


  

  // pagination
  async function loadMore() {
    if (!cursor) return;

    const res = await getChatHistory(20, cursor);

    setHistory((prev) => [
      ...res.messages.map(normalizeMessage),
      ...prev,
    ]);

    setCursor(res.nextCursor);
  }

  return {
    history,
    loading,
    loadMore,
    hasMore: !!cursor,
    setHistory,
  };
}