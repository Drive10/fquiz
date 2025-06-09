import React, { useMemo, useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionCard = styled.div`
  background: ${props => props.theme.card};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: ${props => props.isSelected ? props.theme.primary : props.theme.background};
  color: ${props => props.isSelected ? 'white' : props.theme.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

// Sample questions (replace with your actual questions data or API call)
const sampleQuestions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correctAnswer: 1
    },
    // Add more questions as needed
];

export default function Quiz() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();
    const [questions] = useState(sampleQuestions);

    useEffect(() => {
        dispatch({
            type: 'SET_QUIZ_SETTINGS',
            payload: {
                totalQuestions: questions.length,
                category: state.category,
                difficulty: state.difficulty
            }
        });
    }, [questions, dispatch, state.category, state.difficulty]);

    const currentQuestion = useMemo(() => {
        return questions[state.currentQuestion];
    }, [state.currentQuestion, questions]);

    const handleAnswer = useCallback((selectedOption) => {
        const question = questions[state.currentQuestion];
        if (selectedOption === question.correctAnswer) {
            dispatch({ type: 'SET_SCORE', payload: state.score + 1 });
        }

        if (state.currentQuestion < questions.length - 1) {
            dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion + 1 });
        } else {
            navigate('/results');
        }
    }, [state.currentQuestion, state.score, dispatch, navigate, questions]);

    const handleBookmark = useCallback(() => {
        dispatch({
            type: 'TOGGLE_BOOKMARK',
            payload: currentQuestion.id
        });
    }, [currentQuestion?.id, dispatch]);

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <QuizContainer>
            <QuestionCard>
                <h2>{currentQuestion.question}</h2>
                {currentQuestion.options.map((option, index) => (
                    <OptionButton
                        key={index}
                        onClick={() => handleAnswer(index)}
                        isSelected={false}
                    >
                        {option}
                    </OptionButton>
                ))}
                <button onClick={handleBookmark}>
                    {state.bookmarks.includes(currentQuestion.id) ? 'Unbookmark' : 'Bookmark'}
                </button>
            </QuestionCard>
            <div>
                Question {state.currentQuestion + 1} of {questions.length}
            </div>
            <div>
                Score: {state.score}
            </div>
        </QuizContainer>
    );
}