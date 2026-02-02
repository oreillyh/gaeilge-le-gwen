import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TopicViewer.css';

function TopicViewer() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('phrases');

  useEffect(() => {
    const loadTopicData = async () => {
      try {
        setLoading(true);
        // Import all topics
        const allTopics = await import('../../data/all_topics.json');
        const topic = allTopics.topics.find(t => t.topic_id === parseInt(topicId));
        
        if (topic) {
          setTopicData(topic);
        } else {
          console.error('Topic not found');
        }
      } catch (error) {
        console.error('Error loading topic:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopicData();
  }, [topicId]);

  if (loading) {
    return (
      <div className="topic-viewer">
        <div className="loading">Loading topic...</div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="topic-viewer">
        <div className="error">Topic not found</div>
        <button onClick={() => navigate('/topici')} className="back-button">
          ← Back to Topics
        </button>
      </div>
    );
  }

  return (
    <div className="topic-viewer">
      {/* Header */}
      <div className="topic-header">
        <button onClick={() => navigate('/topici')} className="back-button">
          ← Back to Topics
        </button>
        <h1>{topicData.topic_name}</h1>
        <p className="topic-subtitle">{topicData.topic_desc}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="topic-nav">
        <button 
          className={activeSection === 'phrases' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveSection('phrases')}
        >
          📝 Core Phrases
        </button>
        <button 
          className={activeSection === 'vocabulary' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveSection('vocabulary')}
        >
          📚 Vocabulary
        </button>
        <button 
          className={activeSection === 'grammar' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveSection('grammar')}
        >
          ⚙️ Grammar
        </button>
        <button 
          className={activeSection === 'task' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveSection('task')}
        >
          ✍️ Practice
        </button>
      </div>

      {/* Content Sections */}
      <div className="topic-content">
        {/* Core Phrases Section */}
        {activeSection === 'phrases' && (
          <div className="section">
            <h2>Core Phrases</h2>
            <p className="section-intro">Learn these essential phrases by heart:</p>
            <div className="phrases-list">
              {topicData.core_phrases.map((phrase, index) => (
                <div key={index} className="phrase-card">
                  <div className="phrase-irish">{phrase.irish}</div>
                  <div className="phrase-english">{phrase.english}</div>
                  <div className="phrase-pronunciation">
                    🔊 {phrase.pronunciation_tip}
                  </div>
                </div>
              ))}
            </div>
            
            {topicData.pronunciation_notes && (
              <div className="pronunciation-tips">
                <h3>Pronunciation Tips</h3>
                <ul>
                  {topicData.pronunciation_notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Vocabulary Section */}
        {activeSection === 'vocabulary' && (
          <div className="section">
            <h2>Vocabulary</h2>
            <p className="section-intro">Key words to learn:</p>
            <div className="vocabulary-grid">
              {topicData.vocabulary.map((word, index) => (
                <div key={index} className="vocab-card">
                  <div className="vocab-irish">{word.irish}</div>
                  <div className="vocab-english">{word.english}</div>
                  <div className="vocab-pronunciation">
                    {word.pronunciation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Section */}
        {activeSection === 'grammar' && (
          <div className="section">
            <h2>Grammar Rule</h2>
            <div className="grammar-box">
              <h3>{topicData.grammar_rule.title}</h3>
              <p className="grammar-explanation">
                {topicData.grammar_rule.explanation}
              </p>
              <div className="grammar-examples">
                <h4>Examples:</h4>
                <ul>
                  {topicData.grammar_rule.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Practice Task Section */}
        {activeSection === 'task' && (
          <div className="section">
            <h2>Practice Task</h2>
            <div className="task-box">
              <p className="task-instruction">{topicData.mini_task.instruction}</p>
              <div className="task-prompts">
                {topicData.mini_task.prompts.map((prompt, index) => (
                  <div key={index} className="task-prompt">
                    <span className="prompt-number">{index + 1}.</span>
                    <span className="prompt-text">{prompt}</span>
                  </div>
                ))}
              </div>
              <div className="task-actions">
                <button className="task-button">🎤 Record Response</button>
                <button className="task-button">✍️ Write Response</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="topic-footer">
        {parseInt(topicId) > 1 && (
          <button 
            onClick={() => navigate(`/topici/${parseInt(topicId) - 1}`)}
            className="footer-nav-button"
          >
            ← Previous Topic
          </button>
        )}
        <button 
          onClick={() => navigate('/topici')}
          className="footer-nav-button outline"
        >
          All Topics
        </button>
        {parseInt(topicId) < 20 && (
          <button 
            onClick={() => navigate(`/topici/${parseInt(topicId) + 1}`)}
            className="footer-nav-button"
          >
            Next Topic →
          </button>
        )}
      </div>
    </div>
  );
}

export default TopicViewer;
