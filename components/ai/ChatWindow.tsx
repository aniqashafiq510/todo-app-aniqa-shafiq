import MessageBubble from "./MessageBubble";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  isLoading?: boolean;
};

export default function ChatWindow({
  messages,
  isLoading,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
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

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}

      {isLoading && (
        <div className="text-sm text-zinc-500 px-2">
          AI is thinking...
        </div>
      )}
    </div>
  );
}