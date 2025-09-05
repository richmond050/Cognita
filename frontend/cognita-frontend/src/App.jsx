import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, SparklesIcon } from '@heroicons/react/24/outline';
import './App.css';
import './index.css';
import sendButtonIcon from "@/assets/send_button.svg"; 
import Logo from '@/assets/logo_2.png';

// ... rest of your code stays the same

// Main App component
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isSubmitDisabled = !input.trim() || isLoading;

  return (
    <div className="flex flex-col h-screen w-full bg-[#161618] text-white overflow-hidden items-center" style={{ 
      maxWidth: '100vw', 
      overflowX: 'hidden',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {/* Header */}
      <header>
        <div className="flex items-center">      
            <div className="flex items-center space-x-2 gap-1" style={{ paddingTop: '2rem' }}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto fl" style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        WebkitScrollbar: { display: 'none' }
      }}>
        <div className="max-w-4xl mx-auto px-2 sm:px-6 py-6 sm:py-8" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
          {/* Messages Area */}
          <div className="space-y-4 sm:space-y-6">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center max-w-2xl"style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                  <img
                  src={Logo} alt="logo" style={{ paddingLeft: '5rem'}} className="h-25 md:h-36 lg:h-40 flex items-center justify-center"
                  >
                  </img>
                  <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-6">
                    Ask me anything and I'll help you with your questions, tasks, and creative projects.
                  </p>
                </div>
              </motion.div>
            )}
            
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} py-2`}
                >
                  <div className={`max-w-4xl sm:max-w-4xl max-w-[90vw] px-2 sm:px-4 md:px-6 ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`} style={{ 
                    marginTop: '0.75rem', 
                    marginBottom: '0.75rem'
                  }}>
                    {/* Message Content */}
                    <div className={`${
                      message.role === 'user' 
                        ? 'rounded-full bg-[#242628] text-white'  
                        : 'text-white'
                    }`} style={message.role === 'user' ? { 
                      paddingLeft: '1rem', 
                      paddingRight: '1rem', 
                      paddingTop: '0.75rem', 
                      paddingBottom: '0.75rem',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    } : { 
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      lineHeight: '1.6',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start py-2"
              >
                <div className="max-w-3xl sm:max-w-3xl max-w-[90vw] px-2 sm:px-4 md:px-6 mr-auto" style={{ 
                  marginTop: '0.75rem', 
                  marginBottom: '0.75rem'
                }}>
                  <div className="text-gray-200" style={{ 
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    lineHeight: '1.6'
                  }}>
                    <div className="flex items-center space-x-2 gap-2">
                      <div className="flex space-x-1 gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-gray-200 text-sm"> Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl px-4 sm:px-6 flex justify-center" style={{ paddingBottom: '1rem' }}>
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="flex items-center border border-gray-500/30 rounded-full bg-[#242628] h-12 px-12" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you want to know?"
              disabled={isLoading}
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:shadow-none border-none outline-none"
              style={{ outline: 'none', boxShadow: 'none' }}
              maxLength={2000}
            />
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="ml-3 p-1"
            >
              <img src={sendButtonIcon} alt="Send" className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;