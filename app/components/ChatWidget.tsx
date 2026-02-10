'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    const userMessage = question;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { type: 'ai', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { type: 'ai', text: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { type: 'ai', text: 'Failed to get response. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 text-black flex flex-col items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <X className="w-8 h-8 stroke-[3]" />
            </motion.div>
          ) : (
            <>
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="text-5xl font-bold"
              >
                ?
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs font-medium text-black"
              >
                ask me anything
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed bottom-28 right-8 z-50 w-[380px] max-w-[calc(100vw-4rem)] rounded-3xl overflow-hidden bg-[#FFE5CC] shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#1a2332]/10">
              <h3 className="text-3xl font-bold text-[#1a2332] text-center" style={{ fontFamily: 'var(--font-kalam)' }}>
                Ask Me Anything
              </h3>
            </div>

            {/* Messages */}
            <div className="h-[380px] overflow-y-auto p-5 space-y-5">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 py-8"
                >
                  <p className="text-gray-600 leading-relaxed">
                    Hi! I'm an AI assistant trained on Ayush's background. Feel free to ask me anything about his experience, skills, or projects.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 font-medium">Try asking:</p>
                    <button
                      onClick={() => setQuestion("What's Ayush's experience with AI?")}
                      className="block w-full text-left text-sm text-gray-600 hover:text-[#1a2332] transition-colors py-2 px-3 rounded-lg hover:bg-[#1a2332]/5"
                    >
                      → What's his experience with AI?
                    </button>
                    <button
                      onClick={() => setQuestion("Tell me about STILED")}
                      className="block w-full text-left text-sm text-gray-600 hover:text-[#1a2332] transition-colors py-2 px-3 rounded-lg hover:bg-[#1a2332]/5"
                    >
                      → Tell me about STILED
                    </button>
                    <button
                      onClick={() => setQuestion("What are his technical skills?")}
                      className="block w-full text-left text-sm text-gray-600 hover:text-[#1a2332] transition-colors py-2 px-3 rounded-lg hover:bg-[#1a2332]/5"
                    >
                      → What are his technical skills?
                    </button>
                  </div>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  <p className={`text-xs font-bold tracking-wider uppercase ${msg.type === 'user' ? 'text-[#1a2332]' : 'text-gray-500'}`}>
                    {msg.type === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.type === 'user' ? 'text-[#1a2332] font-medium' : 'text-gray-700'}`}>
                    {msg.text}
                  </p>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  <p className="text-xs font-bold tracking-wider uppercase text-gray-500">
                    AI Assistant
                  </p>
                  <div className="flex gap-1.5 py-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#1a2332] rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-[#1a2332]/10 bg-[#FFE5CC]">
              <div className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full bg-transparent border-none focus:outline-none text-[#1a2332] placeholder:text-gray-400 text-base pb-2"
                  disabled={isLoading}
                />

                {/* Curved lines below input */}
                <svg
                  width="100%"
                  height="20"
                  viewBox="0 0 400 20"
                  preserveAspectRatio="none"
                  className="w-full"
                >
                  <path
                    d="M 0 10 Q 100 6, 200 10 Q 300 14, 400 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 0 16 Q 100 12, 200 16 Q 300 20, 400 16"
                    stroke="#000000"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Arrow submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="absolute right-0 top-0 text-[#1a2332] disabled:opacity-30 disabled:cursor-not-allowed text-2xl"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
