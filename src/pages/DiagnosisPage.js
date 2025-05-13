import React, { useState } from 'react';
import './Diagnosis.css';
import { useNavigate } from 'react-router-dom';
import animalIcon from '../assets/animal.png';
import magicIcon from '../assets/magic.png';
import adventureIcon from '../assets/adventure.png';

export default function DiagnosisPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ topic: '', style: '', age: '' });

  const handleAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    const answeredCount = Object.values({ ...answers, [field]: value }).filter(Boolean).length;
    setStep(answeredCount);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('handleSubmit 실행됨'); // ✅ 이거 찍히는지 확인
  if (step === 3) {
    console.log('navigate 실행됨');
    navigate('/create');
  }
};

  const imageMap = {
    동물: animalIcon,
    마법: magicIcon,
    모험: adventureIcon
  };

  return (
    <div className="diagnosis-page">
      <div className="header">
        <div className="logo">OWLEARN</div>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <span className="progress-text">{step} / 3</span>
      </div>

      <div className="question-section">
        <p className="question-title">좋아하는 주제는 무엇인가요?</p>
        <div className="choice-buttons">
          {['동물', '마법', '모험'].map(choice => (
            <div key={choice} className="choice-wrapper">
              <button
                className={`choice-box ${answers.topic === choice ? 'selected' : ''}`}
                onClick={() => handleAnswer('topic', choice)}
              >
                <img
                  src={imageMap[choice]}
                  alt={choice}
                  className="choice-icon"
                />
              </button>
              <span className="choice-label">{choice}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="question-section">
        <p className="question-title">선호하는 그림체는 어떤 것인가요?</p>
        <div className="radio-buttons">
          {['귀여운', '단순한', '세밀한'].map(style => (
            <label key={style} className="radio-box">
              <input
                type="radio"
                name="style"
                value={style}
                checked={answers.style === style}
                onChange={() => handleAnswer('style', style)}
                style={{ display: 'none' }}
              />
              <span className="custom-radio" />
              <span className="radio-label-text">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-section">
        <p className="question-title">연령대를 선택해 주세요.</p>
        <select
          className="age-select"
          value={answers.age}
          onChange={e => handleAnswer('age', e.target.value)}
        >
          <option value="">연령대 선택</option>
          {['5세', '6세', '7세', '8세', '9세', '10세 이상'].map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>

      <button className="submit-button" disabled={step < 3} onClick={handleSubmit}>
        완료
      </button>

    </div>
  );
}

