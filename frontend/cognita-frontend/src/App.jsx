import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import './App.css';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800/50 backdrop-blur-md bg-black/20">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Cognita
              </h1>
              <p className="text-gray-400 text-sm mt-1">AI-Powered Chat Assistant</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 pb-32">
        {/* Messages Area */}
        <div className="space-y-8 mb-8">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Welcome to Cognita</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Your AI-powered assistant is ready to help. Ask me anything and I'll do my best to assist you.
                </p>
              </div>
            </motion.div>
          )}
          
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-4xl px-6 py-5 rounded-2xl shadow-lg ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 ml-12' 
                  : 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 mr-12'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {message.role === 'user' ? 'U' : 'AI'}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-100 leading-relaxed text-base">{message.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-5 mr-12 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full px-6 py-4 pr-16 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-lg"
                />
                
                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <ArrowUpIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg text-sm font-medium text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 hover:scale-105">
                Deep Search
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg text-sm font-medium text-green-300 hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-200 hover:scale-105">
                Create Images
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg text-sm font-medium text-orange-300 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-200 hover:scale-105">
                Latest News
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg text-sm font-medium text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 hover:scale-105">
                Personas
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;