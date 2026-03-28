import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import './ChatBot.css'

const botResponses = [
  "I'd be happy to help you find your dream property! What's your budget range and preferred location?",
  "Great choice! That area has seen 12% appreciation in the last year. Would you like me to show you some listings?",
  "I can schedule a virtual tour for you. Our agents are available Monday through Saturday. What time works best?",
  "Based on your preferences, I recommend checking out our Oceanfront Villa Serenity in Malibu — it matches all your criteria!",
  "The EMI calculator on our platform can help you estimate monthly payments. Would you like me to guide you there?",
  "Our trust score system rates agents based on client reviews, transaction history, and response time. All our agents score above 85!",
  "I can help you compare up to 3 properties side by side. Just save your favorites and use the compare feature!",
  "That property has a projected ROI of 12.5% over 5 years based on market trends. Want to see the detailed analysis?",
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm PropBot, your AI real estate assistant. 🏠 How can I help you today?", time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)]
      setMessages(prev => [...prev, { role: 'bot', text: response, time: new Date() }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <button
        className={`chatbot-trigger ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        id="chatbot-trigger-btn"
      >
        <div className="chatbot-trigger-icon">
          <Sparkles size={24} />
        </div>
        <div className="chatbot-trigger-pulse" />
        <div className="chatbot-trigger-pulse delay" />
      </button>

      {isOpen && (
        <div className="chatbot-window animate-scale-in" id="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>PropBot AI</h4>
                <span className="chatbot-status">
                  <span className="status-dot" /> Always online
                </span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} id="chatbot-close-btn">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                <div className="chatbot-msg-avatar">
                  {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="chatbot-msg-content">
                  <p>{msg.text}</p>
                  <span className="chatbot-msg-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-msg bot">
                <div className="chatbot-msg-avatar"><Bot size={14} /></div>
                <div className="chatbot-msg-content">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything about properties..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              id="chatbot-input-field"
            />
            <button onClick={handleSend} className="chatbot-send" id="chatbot-send-btn">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
