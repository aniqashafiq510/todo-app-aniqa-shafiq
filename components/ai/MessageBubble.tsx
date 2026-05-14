type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-wrap ${
          isUser
            ? "bg-black text-white"
            : "bg-zinc-100 text-zinc-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}