import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topics.css';

function Topics() {
  const navigate = useNavigate();
  
  const topicSets = [
    {
      title: 'Bunús (Foundations)',
      topics: [
        { id: 1, name: 'Fuaimeanna & Litriú', desc: 'Sounds & Spelling' },
        { id: 2, name: 'Beannachtaí & Béasaíocht', desc: 'Greetings & Manners' },
        { id: 3, name: 'Mise & tusa', desc: 'Me & You' },
        { id: 4, name: 'Uimhreacha & Am', desc: 'Numbers & Time' }
      ]
    },
    {
      title: 'Croí-abairtí (Core Patterns)',
      topics: [
        { id: 5, name: 'Tá / Níl / An bhfuil?', desc: 'States & Location' },
        { id: 6, name: 'Is / Ní / An?', desc: 'Identity & Classification' },
        { id: 7, name: 'Agam/Agat/Aige…', desc: 'Possession' },
        { id: 8, name: 'Ba mhaith liom…', desc: 'Wants & Requests' },
        { id: 9, name: 'Is maith liom…', desc: 'Likes & Dislikes' }
      ]
    },
    {
      title: 'Gníomhartha (High-frequency verbs)',
      topics: [
        { id: 10, name: 'Briathra láithreacha', desc: 'Present tense' },
        { id: 11, name: 'Briathra neamhrialta', desc: 'Irregular verbs' },
        { id: 12, name: 'Ceisteanna', desc: 'Question words' }
      ]
    },
    {
      title: 'Saol laethúil (Daily Life)',
      topics: [
        { id: 13, name: 'Sa bhaile', desc: 'At Home' },
        { id: 14, name: 'Bia & deoch', desc: 'Food & Drink' },
        { id: 15, name: 'Ag siopadóireacht', desc: 'Shopping' },
        { id: 16, name: 'Aimsir', desc: 'Weather' },
        { id: 17, name: 'Taisteal simplí', desc: 'Simple Travel' }
      ]
    },
    {
      title: 'Time & Narrative Basics',
      topics: [
        { id: 18, name: 'Aimsir chaite', desc: 'Past Tense' },
        { id: 19, name: 'Aimsir fháistineach', desc: 'Future Tense' },
        { id: 20, name: 'Nascfhocail', desc: 'Connecting Words' }
      ]
    }
  ];

  const handleTopicClick = (topicId) => {
    navigate(`/topici/${topicId}`);
  };

  return (
    <div className="topics-container">
      <header className="page-header">
        <h1>Topicí</h1>
        <p className="page-subtitle">Browse topics and practice by theme</p>
      </header>

      <div className="topics-grid">
        {topicSets.map((set, index) => (
          <div key={index} className="topic-set">
            <h2 className="set-title">{set.title}</h2>
            <div className="topic-cards">
              {set.topics.map(topic => (
                <div key={topic.id} className="topic-card">
                  <h3 className="topic-name">{topic.name}</h3>
                  <p className="topic-desc">{topic.desc}</p>
                  <button 
                    className="topic-button"
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    Tosaigh (Start)
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
