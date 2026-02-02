import React from 'react';
import './Lessons.css';

function Lessons() {
  const units = [
    {
      id: 1,
      title: 'Dia duit — Meeting People',
      lessons: [
        { id: 1, title: 'Greetings + "Conas atá tú?"', completed: false },
        { id: 2, title: 'Names: "Is mise…" / "Cad is ainm duit?"', completed: false },
        { id: 3, title: 'Where from: "Is as … mé"', completed: false }
      ],
      checkpoint: '8-question quiz + 30s intro recording'
    },
    {
      id: 2,
      title: 'Tá & Níl — States and Location',
      lessons: [
        { id: 4, title: 'Tá/Níl + feelings', completed: false },
        { id: 5, title: '"Cá bhfuil…?" locations', completed: false },
        { id: 6, title: 'Short dialogue: meeting + how you are', completed: false }
      ],
      checkpoint: 'Role-play (audio prompts)'
    },
    {
      id: 3,
      title: 'Agam — Possession',
      lessons: [
        { id: 7, title: '"Tá … agam" (I have)', completed: false },
        { id: 8, title: 'Family basics', completed: false },
        { id: 9, title: '"An bhfuil … agat?" Q&A', completed: false }
      ],
      checkpoint: '"Tell me 5 things you have" recording'
    }
  ];

  return (
    <div className="lessons-container">
      <header className="page-header">
        <h1>Aiseanna</h1>
        <p className="page-subtitle">Structured learning paths and resources</p>
      </header>

      <div className="learning-path">
        {units.map((unit) => (
          <div key={unit.id} className="unit-card">
            <div className="unit-header">
              <span className="unit-number">Unit {unit.id}</span>
              <h2 className="unit-title">{unit.title}</h2>
            </div>

            <div className="lessons-list">
              {unit.lessons.map((lesson) => (
                <div key={lesson.id} className="lesson-item">
                  <div className="lesson-info">
                    <span className="lesson-number">L{lesson.id % 3 || 3}</span>
                    <span className="lesson-title">{lesson.title}</span>
                  </div>
                  <button className="lesson-button">
                    {lesson.completed ? 'Review' : 'Start'}
                  </button>
                </div>
              ))}
            </div>

            <div className="checkpoint">
              <span className="checkpoint-icon">🎯</span>
              <span className="checkpoint-text">Checkpoint: {unit.checkpoint}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="course-info">
        <h3>Course Level: A0 → A1</h3>
        <p>Complete beginner to elementary Irish</p>
      </div>
    </div>
  );
}

export default Lessons;
