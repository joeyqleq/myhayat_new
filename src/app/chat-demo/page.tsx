"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Send, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const scenarios: Record<string, { titleKey: string; messages: Message[] }> = {
  anxiety: {
    titleKey: "chatDemo.scenario1",
    messages: [
      { role: "user", text: "مرحبا... عم حس بقلق كتير اليوم" },
      { role: "bot", text: "أهلا وسهلا 💛 خذ نفس عميق معي. أنا هون معك. قلّي، شو عم يمر معك؟" },
      { role: "user", text: "ما بعرف، بس عم حس بضيقة بصدري وما عم اقدر ركّز عشي" },
      { role: "bot", text: "هيدا شي طبيعي لمّا الجسم بيكون بحالة قلق. خلّينا نجرب شي سوا — خذ شهيق من مناخيرك لعدّ ٤..." },
      { role: "bot", text: "🌬️ شهيق... ١... ٢... ٣... ٤..." },
      { role: "bot", text: "حلو! هلق احبس النفس... ١... ٢... ٣... ٤..." },
      { role: "bot", text: "وزفير من تمّك ببطء... ١... ٢... ٣... ٤... ٥... ٦..." },
      { role: "bot", text: "ممتاز 👏 كيف حاسس هلق؟ حتى لو بس شوي أحسن، هيدا تقدّم حقيقي." },
      { role: "user", text: "شوي أحسن الحمدلله" },
      { role: "bot", text: "الحمدلله 💚 شوف، القلق مش عيب ولا ضعف. هو ردة فعل طبيعية. بس فينا نتعلم كيف ندير هالمشاعر. بدك نحكي أكتر عن شو عم يسبب القلق؟" },
    ],
  },
  sleep: {
    titleKey: "chatDemo.scenario2",
    messages: [
      { role: "user", text: "الساعة ٣ بالليل وما عم اقدر نام" },
      { role: "bot", text: "أهلا 🌙 ما تقلق، أنا صاحي معك. الأرق صعب، بس إنت مش لوحدك فيه." },
      { role: "user", text: "كل ليلة هيك... بضل اقلب بالتخت وراسي ما بيوقف يفكّر" },
      { role: "bot", text: "فاهم عليك. لمّا الراس ما بيوقف، الجسم بيضل بحالة تأهب. خلّينا نجرب تمرين تأريض بسيط..." },
      { role: "bot", text: "🌿 غمّض عيونك. قلّي ٥ أشياء فيك تسمعهن هلق... حتى لو هدي كتير." },
      { role: "user", text: "صوت المروحة، سيارة بالشارع، تكتكة الساعة... بس" },
      { role: "bot", text: "حلو، ٣ أشياء كمان من خيالك — تخيّل صوت البحر ببيروت، نسمة هوا بالجبل، وصوت فنجان قهوة عم ينسكب ☕" },
      { role: "bot", text: "هيدا التمرين بيساعد الدماغ ينتقل من وضع \'تفكير\' لوضع \'استرخاء\'. حاول ارجع عليه كل ليلة 💜" },
    ],
  },
  talk: {
    titleKey: "chatDemo.scenario3",
    messages: [
      { role: "user", text: "بس بدي حدا يحكي معي" },
      { role: "bot", text: "وأنا هون بالزبط لهالسبب 💛 ما في شي غلط إنك تحتاج حدا يسمعك. قلّي شو ع بالك." },
      { role: "user", text: "حاسس حالي وحداني... كل الناس حولي مشغولين بحياتهن" },
      { role: "bot", text: "هالشعور صعب كتير، وبيأثر عالكل — حتى اللي حوالين الناس. إنت مش وحدك بهالإحساس حتى لو هيك حاسس." },
      { role: "bot", text: "خلّيني اسألك — شو آخر شي حلو صار معك؟ حتى لو صغير كتير 🌱" },
      { role: "user", text: "اليوم واحد عالطريق ابتسملي" },
      { role: "bot", text: "شفت؟ هيدي لحظة حقيقية من التواصل الإنساني ✨ حتى ابتسامة غريب فيها تذكّرنا إنو العالم فيه خير. شكراً إنك شاركتني ياها." },
    ],
  },
  echoes: {
    titleKey: "chatDemo.scenario4",
    messages: [
      { role: "user", text: "شو يعني أصداء؟" },
      { role: "bot", text: "أصداء هي ميزة خاصة كتير 💜 تخيّل إنك تقدر تسمع كلمات دعم بصوت شخص عزيز عليك رحل..." },
      { role: "bot", text: "مش تواصل حقيقي — هي تجربة ذكرى رمزية. متل ما اللبنانيين بيحكوا: \'الحبايب ما بيروحوا، بيضلّوا بقلوبنا.\'" },
      { role: "user", text: "كيف بتشتغل؟" },
      { role: "bot", text: "بأربع مراحل:\n🎤 بتشاركنا تسجيلات صوتية لحبيبك\n🧠 الذكاء الاصطناعي بيبني صورة صوتية\n💬 بتقدر تعمل جلسات ذكرى موجّهة\n🌸 بتبني \'حديقة ذكريات\' بتكبر مع رحلتك" },
      { role: "bot", text: "كل شي بإشراف سريري ومبني على أخلاقيات واضحة. خصوصيتك ومشاعرك أولاً دايماً 🤍" },
    ],
  },
};

function ChatBubble({ message, isTyping }: { message: Message; isTyping?: boolean }) {
  const isBot = message.role === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`
          max-w-[80%] px-5 py-3 rounded-[1.5rem] text-[15px] leading-relaxed whitespace-pre-line
          ${isBot
            ? "bg-white dark:bg-[#251320] text-gray-800 dark:text-gray-200 rounded-bl-md border-2 border-myhayat-pink/20 shadow-sm"
            : "bg-myhayat-pink text-white rounded-br-md shadow-md"
          }
          ${isTyping ? "animate-pulse" : ""}
        `}
      >
        {isBot && <span className="text-xs font-bold text-myhayat-pink block mb-1">My Hayat 💛</span>}
        {message.text}
      </div>
    </div>
  );
}

export default function ChatDemoPage() {
  const { t } = useTranslation();
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const startScenario = (key: string) => {
    setActiveScenario(key);
    setVisibleCount(0);
    setIsTyping(true);
    // Reveal messages one by one
    const msgs = scenarios[key].messages;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= msgs.length) {
        clearInterval(interval);
        setIsTyping(false);
      } else {
        setIsTyping(true);
      }
    }, 1200);
  };

  const reset = () => {
    setActiveScenario(null);
    setVisibleCount(0);
    setIsTyping(false);
  };

  const currentMessages = activeScenario ? scenarios[activeScenario].messages.slice(0, visibleCount) : [];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Planet — represents the AI brain */}
          <img src="/decor_planet_1.svg" alt="" className="absolute -top-10 -right-20 w-48 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block animate-drift" />

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-barriecito leading-tight">
              {t("chatDemo.title")}{" "}
              <span className="text-myhayat-pink">{t("chatDemo.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("chatDemo.subtitle")}
            </p>
            <div className="inline-block px-5 py-2 bg-myhayat-yellow/20 dark:bg-myhayat-yellow/10 rounded-full text-sm font-bold text-myhayat-salmon dark:text-myhayat-yellow border border-myhayat-yellow/30">
              ⚠️ {t("chatDemo.disclaimer")}
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Chat Window */}
            <div className="rounded-[2rem] border-4 border-myhayat-salmon dark:border-myhayat-pink/50 bg-gradient-to-b from-myhayat-offwhite to-white dark:from-[#1a0a14] dark:to-[#251320] shadow-[var(--shadow-curved)] overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 bg-white/50 dark:bg-[#251320]/50 backdrop-blur-sm">
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
                {activeScenario && (
                  <button onClick={reset} className="p-2 rounded-full hover:bg-myhayat-pink/10 text-myhayat-salmon dark:text-myhayat-pink transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Messages Area */}
              <div className="min-h-[400px] max-h-[500px] overflow-y-auto p-6 space-y-1">
                {!activeScenario ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center space-y-6">
                    <img src="/decor_melting_smiley.svg" alt="" className="w-20 h-20 opacity-40 animate-float" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{t("chatDemo.inputPlaceholder")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
                      {Object.entries(scenarios).map(([key, scenario]) => (
                        <button
                          key={key}
                          onClick={() => startScenario(key)}
                          className="px-4 py-3 rounded-2xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 text-sm font-medium hover:bg-myhayat-pink/10 hover:border-myhayat-pink/50 transition-all text-start"
                        >
                          {t(scenario.titleKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {currentMessages.map((msg, i) => (
                      <ChatBubble key={i} message={msg} />
                    ))}
                    {isTyping && visibleCount < scenarios[activeScenario].messages.length && (
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
                  </>
                )}
              </div>

              {/* Input Bar (decorative) */}
              <div className="px-6 py-4 border-t-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 bg-white/50 dark:bg-[#251320]/50">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    disabled
                    placeholder={activeScenario ? "Demo mode — select a new topic above" : t("chatDemo.inputPlaceholder")}
                    className="flex-1 h-12 px-5 rounded-full bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 disabled:opacity-50"
                  />
                  <button disabled className="w-12 h-12 rounded-full bg-myhayat-pink text-white flex items-center justify-center opacity-50">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 md:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Liked what you saw?</p>
          <MyHayatButton size="lg">{t("nav.joinNow")}</MyHayatButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}
