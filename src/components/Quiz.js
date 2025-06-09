import { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import ProgressBar from './ProgressBar';
import { useQuiz } from '../context/QuizContext';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const QuestionCard = styled.div`
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const Option = styled.button`
  width: 100%;
  padding: 15px;
  margin: 8px 0;
  background-color: ${props => {
    if (props.showAnswer) {
        return props.isCorrect ? '#4CAF50' : '#ff4444';
    }
    return props.selected ? props.theme.primary : props.theme.card;
}};
  color: ${props => props.selected ? '#fff' : props.theme.text};
  border: 2px solid ${props => props.selected ? props.theme.primary : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${props => props.shake ? shake : 'none'} 0.5s;

  &:hover {
    background-color: ${props => props.theme.primary}22;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const DifficultySelector = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
`;

const DifficultyButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.active ? props.theme.primary : props.theme.card};
  color: ${props => props.active ? '#fff' : props.theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
`;

function Quiz() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [shake, setShake] = useState(false);

    // Add more questions based on category and difficulty...
    const questions = []; // Your questions array

    const handleAnswerSelect = useCallback((optionIndex) => {
        setSelectedAnswer(optionIndex);
        setShowAnswer(true);

        if (optionIndex !== questions[currentQuestion].correctAnswer) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }

        setTimeout(() => {
            handleNext();
        }, 1000);
    }, [currentQuestion]);

    const handleNext = useCallback(() => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score => score + 1);
        }

        setSelectedAnswer(null);
        setShowAnswer(false);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            const finalScore = {
                score,
                category: state.selectedCategory,
                difficulty: state.difficulty,
                date: new Date().toISOString(),
            };
            dispatch({ type: 'ADD_SCORE', payload: finalScore });
            setShowResults(true);
        }
    }, [currentQuestion, selectedAnswer, score, state.selectedCategory, state.difficulty, dispatch]);

    return (
        <QuizContainer>
            {!showResults && (
                <>
                    <ProgressBar current={currentQuestion + 1} total={questions.length} />
                    <DifficultySelector>
                        {['easy', 'medium', 'hard'].map(diff => (
                            <DifficultyButton
                                key={diff}
                                active={state.difficulty === diff}
                                onClick={() => dispatch({ type: 'SET_DIFFICULTY', payload: diff })}
                            >
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </DifficultyButton>
                        ))}
                    </DifficultySelector>
                    <QuestionCard>
                        {/* Question content */}
                    </QuestionCard>
                </>
            )}
            {/* Results section */}
        </QuizContainer>
    );
}

export default memo(Quiz);