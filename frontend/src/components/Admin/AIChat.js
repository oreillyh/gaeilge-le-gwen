import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import './AIChat.css';

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant for creating Irish language content. I can help you:\n\n• Generate complete topics\n• Create phrases and vocabulary\n• Write grammar explanations\n• Suggest improvements\n\nWhat would you like to create today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedTopic, setGeneratedTopic] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Check if this is a topic generation request
      const isTopicRequest = input.toLowerCase().includes('generate') || 
                            input.toLowerCase().includes('create') ||
                            input.toLowerCase().includes('topic');

      if (isTopicRequest) {
        const response = await ApiService.aiGenerateTopic(input);
        
        if (response.success) {
          setGeneratedTopic(response.topic);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `I've generated a topic based on your request! Here's a preview:\n\n**${response.topic.topic_name}** (${response.topic.topic_desc})\n\n• ${response.topic.core_phrases?.length || 0} core phrases\n• ${response.topic.vocabulary?.length || 0} vocabulary items\n• Grammar rule: ${response.topic.grammar_rule?.title || 'N/A'}\n\nWould you like to save this topic or make changes?`,
            topicData: response.topic
          }]);
        }
      } else {
        // Regular chat
        const context = messages.map(m => m.content).join('\n\n');
        const response = await ApiService.aiChat(input, context);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.response
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTopic = async (topicData) => {
    try {
      const response = await ApiService.createTopic(topicData);
      if (response.success) {
        alert('Topic saved successfully!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      alert('Error saving topic');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat">
      <header className="chat-header">
        <div>
          <h1>🤖 AI Assistant</h1>
          <p>Generate and manage content with AI</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </header>

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {msg.topicData && (
                <div className="topic-preview">
                  <button 
                    onClick={() => handleSaveTopic(msg.topicData)}
                    className="save-topic-btn"
                  >
                    💾 Save Topic
                  </button>
                  <button 
                    onClick={() => navigate('/admin/create', { state: { topicData: msg.topicData }})}
                    className="edit-topic-btn"
                  >
                    ✏️ Edit First
                  </button>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to generate content... (e.g., 'Create a topic about food and drink')"
            rows="3"
          />
          <button onClick={handleSend} disabled={loading || !input.trim()}>
            {loading ? 'Generating...' : 'Send'}
          </button>
        </div>
      </div>

      <div className="chat-suggestions">
        <p>Try these:</p>
        <button onClick={() => setInput('Generate a topic about Irish weather')}>
          Weather Topic
        </button>
        <button onClick={() => setInput('Create phrases for ordering food')}>
          Food Phrases
        </button>
        <button onClick={() => setInput('Generate vocabulary for family members')}>
          Family Vocabulary
        </button>
      </div>
    </div>
  );
}

export default AIChat;
