import { useState } from "react";
import { Bot, Send, User, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI assistant for resume analysis. I can help you understand candidate qualifications, compare resumes, or answer questions about the matching results. How can I help you today?",
    timestamp: new Date(),
  },
];

export function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query) => {
    const responses = [
      "Based on my analysis, the top candidate shows strong alignment with the technical requirements, particularly in React and TypeScript.",
      "I've identified several key strengths in the resume pool. Would you like me to break down the skill distribution?",
      "The matching algorithm considers factors like skills overlap, experience level, and keyword relevance from the job description.",
      "I can help you compare specific candidates. Which profiles would you like me to analyze in detail?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] animate-scale-in">
      <div className="glass-card rounded-2xl shadow-2xl border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Resume Analysis</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-primary to-accent"
                    : "bg-secondary"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-[75%] text-sm",
                  message.role === "assistant"
                    ? "bg-secondary text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about candidates..."
              className="flex-1 bg-secondary/50 border-border/50"
            />
            <Button type="submit" size="icon" variant="gradient" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
