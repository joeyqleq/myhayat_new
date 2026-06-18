"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Send, RotateCcw, MessageCircle } from "lucide-react";
import Link from "next/link";

function ChatBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isBot = role === "assistant";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`
          max-w-[80%] px-5 py-3 rounded-[1.5rem] text-[15px] leading-relaxed whitespace-pre-line
          ${isBot
            ? "bg-white dark:bg-[#251320] text-gray-800 dark:text-gray-200 rounded-bl-md border-2 border-myhayat-pink/20 shadow-sm"
            : "bg-myhayat-pink text-white rounded-br-md shadow-md"
          }
        `}
      >
        {isBot && <span className="text-xs font-bold text-myhayat-pink block mb-1">My Hayat 💛</span>}
        {text}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { t } = useTranslation();
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: [],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const icebreakers = [
    "مرحبا... عم حس بقلق كتير اليوم", // I'm feeling very anxious today
    "الساعة ٣ بالليل وما عم اقدر نام", // It's 3 AM and I can't sleep
    "بس بدي حدا يحكي معي", // I just need someone to talk to
    "Hi, I just feel completely overwhelmed today."
  ];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Planet — represents the AI brain */}
          <img src="/decor_planet_1.svg" alt="" className="absolute -top-10 -right-20 w-48 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block animate-drift" />

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-titan leading-tight">
              {t("chatDemo.title")}{" "}
              <span className="text-myhayat-pink">{t("chatDemo.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A private, culturally aware space to explore your feelings and find grounding.
            </p>
            <div className="inline-block px-5 py-2 bg-myhayat-yellow/20 dark:bg-myhayat-yellow/10 rounded-full text-sm font-bold text-myhayat-salmon dark:text-myhayat-yellow border border-myhayat-yellow/30">
              ⚠️ Not a substitute for professional clinical help. In emergencies, please contact Embrace Lifeline at 1564.
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Chat Window */}
            <div className="rounded-[2rem] border-4 border-myhayat-salmon dark:border-myhayat-pink/50 bg-gradient-to-b from-myhayat-offwhite to-white dark:from-[#1a0a14] dark:to-[#251320] shadow-[var(--shadow-curved)] overflow-hidden flex flex-col h-[600px]">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 bg-white/50 dark:bg-[#251320]/50 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-myhayat-pink flex items-center justify-center text-white font-bold text-sm">MH</div>
                  <div>
                    <div className="font-bold text-sm">My Hayat</div>
                    <div className="text-xs text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                {messages.length > 0 && (
                  <button 
                    onClick={() => setMessages([])} 
                    className="p-2 rounded-full hover:bg-myhayat-pink/10 text-myhayat-salmon dark:text-myhayat-pink transition-colors flex items-center gap-2 text-sm font-bold"
                    title="Clear Chat"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-myhayat-pink/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <img src="/decor_melting_smiley.svg" alt="" className="w-20 h-20 opacity-40 animate-float" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">How are you feeling today?</p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-md">
                      {icebreakers.map((text, i) => (
                        <button
                          key={i}
                          onClick={() => append({ role: "user", content: text })}
                          className="px-4 py-2 rounded-full border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 text-sm font-medium hover:bg-myhayat-pink/10 hover:border-myhayat-pink/50 transition-all text-gray-700 dark:text-gray-300 text-left flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 text-myhayat-pink" />
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((m) => (
                      <ChatBubble key={m.id} role={m.role as "user" | "assistant"} text={m.content} />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start mb-3">
                        <div className="px-5 py-3 rounded-[1.5rem] rounded-bl-md bg-white dark:bg-[#251320] border-2 border-myhayat-pink/20 shadow-sm">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-myhayat-pink/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-myhayat-pink/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-myhayat-pink/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="px-6 py-4 border-t-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 bg-white/50 dark:bg-[#251320]/50 shrink-0">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className="flex-1 h-12 px-5 rounded-full bg-white dark:bg-[#1a0a14] border-2 border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-myhayat-pink transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || !input || !input.trim()} 
                    className="w-12 h-12 rounded-full bg-myhayat-pink text-white flex items-center justify-center disabled:opacity-50 hover:bg-pink-500 transition-colors shrink-0 shadow-md"
                  >
                    <Send className="w-5 h-5 -ml-1 mt-0.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 md:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Want more clinical tools and insights?</p>
          <Link href="/education-hub">
            <MyHayatButton size="lg">Explore Education Hub</MyHayatButton>
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
}
