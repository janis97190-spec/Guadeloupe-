import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot, Loader2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AIConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis Lola, votre conciergerie IA. Je peux vous aider à trouver une villa ou vous conseiller sur la Guadeloupe. Comment puis-je vous aider aujourd\'hui ? 🌴', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);

    try {
      const responseGenerator = await sendMessageToGemini(userText);
      let fullResponse = "";
      
      // Temporary message for streaming
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: new Date() }]);

      for await (const chunk of responseGenerator) {
          fullResponse += chunk;
          // Update the last message with new chunk
          setMessages(prev => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1].text = fullResponse;
              return newMsgs;
          });
      }
    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, { role: 'model', text: "Désolée, une erreur est survenue.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={onClose} // Acts as toggle here
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40 group"
      >
        <MessageSquare size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Parler à Lola
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold">Lola Concierge</h3>
            <p className="text-xs text-teal-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              En ligne
            </p>
          </div>
        </div>
        <div className="flex gap-1">
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Minimize2 size={18} />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].role === 'user' && (
             <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex items-center gap-2">
               <Loader2 size={16} className="animate-spin text-teal-600" />
               <span className="text-xs text-slate-400">Lola réfléchit...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none placeholder:text-slate-400"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
