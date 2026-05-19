"use client";

import type { ChatInputProps } from "@/types/types";


export default function ChatInput({input,setInput,onSend,disabled}: ChatInputProps) {

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="border-t bg-white px-4 py-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI about your tasks..."
          rows={1}
          className="max-h-40 min-h-13 flex-1 resize-none 
          rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-black"
        />

        <button
          onClick={onSend}
          disabled={disabled || !input.trim()}
          className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white 
          transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}