
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const QuizContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: ${props => props.theme.background};
    min-height: 100vh;
`;

const QuestionCard = styled.div`
    background: ${props => props.theme.card};
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

const QuestionText = styled.h2`
    color: ${props => props.theme.text};
    font-size: 1.5rem;
    margin-bottom: 25px;
    line-height: 1.4;
`;

const OptionButton = styled.button`
    width: 100%;
    padding: 16px 20px;
    margin: 10px 0;
    border: 2px solid ${props => props.isSelected ? props.theme.primary : 'transparent'};
    border-radius: 12px;
    background: ${props => props.isSelected ? props.theme.primary : props.theme.background};
    color: ${props => props.isSelected ? 'white' : props.theme.text};
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;

    &:hover {
        background: ${props => props.theme.primary};
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        &:hover {
            transform: none;
            background: ${props => props.isSelected ? props.theme.primary : props.theme.background};
            color: ${props => props.isSelected ? 'white' : props.theme.text};
        }
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 5px;
    margin: 20px 0;
    overflow: hidden;
`;

const Progress = styled.div`
    width: ${props => (props.value / props.max) * 100}%;
    height: 100%;
    background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.secondary || props.theme.primary});
    transition: width 0.3s ease;
`;

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 15px 20px;
    background: ${props => props.theme.card};
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    span:first-of-type {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${props => props.theme.primary};
    }

    span:last-of-type {
        font-size: 0.9rem;
        color: ${props => props.theme.text};
        opacity: 0.8;
    }
`;

const BookmarkButton = styled.button`
    padding: 12px 24px;
    background: transparent;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 8px;
    color: ${props => props.isBookmarked ? 'white' : props.theme.primary};
    background: ${props => props.isBookmarked ? props.theme.primary : 'transparent'};
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: ${props => props.theme.primary};
        color: white;
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    svg {
        font-size: 1.2rem;
    }
`;

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
`;

const ErrorMessage = styled.div`
    padding: 20px;
    background: #fee;
    border-radius: 8px;
    color: #e33;
    margin: 20px 0;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Sample questions data - replace with your actual questions or API call
const sampleQuestions = [
    {
        id: 1,
        question: "What is React's virtual DOM?",
        options: [
            "A direct copy of the actual DOM",
            "A lightweight copy of the actual DOM",
            "A programming language",
            "A browser feature"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "What hook is used for side effects in React?",
        options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "Which is NOT a built-in React hook?",
        options: [
            "useRef",
            "useCallback",
            "useFetch",
            "useMemo"
        ],
        correctAnswer: 2
    }
];

export default function Quiz() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();
    const [questions] = useState(sampleQuestions);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            dispatch({
                type: 'SET_QUIZ_SETTINGS',
                payload: {
                    totalQuestions: questions.length,
                    category: state.category,
                    difficulty: state.difficulty
                }
            });
        } catch (err) {
            setError('Failed to initialize quiz settings');
        }
    }, [questions, dispatch, state.category, state.difficulty]);

    const currentQuestion = useMemo(() => {
        return questions[state.currentQuestion];
    }, [state.currentQuestion, questions]);

    const handleAnswer = useCallback((selectedOption) => {
        try {
            setIsLoading(true);
            setSelectedOption(selectedOption);
            setError(null);

            setTimeout(() => {
                const question = questions[state.currentQuestion];
                if (selectedOption === question.correctAnswer) {
                    dispatch({ type: 'SET_SCORE', payload: state.score + 1 });
                }

                if (state.currentQuestion < questions.length - 1) {
                    dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion + 1 });
                } else {
                    navigate('/results');
                }

                setSelectedOption(null);
                setIsLoading(false);
            }, 800);
        } catch (err) {
            setError('Failed to process your answer. Please try again.');
            setIsLoading(false);
        }
    }, [state.currentQuestion, state.score, dispatch, navigate, questions]);

    const handleBookmark = useCallback(() => {
        try {
            dispatch({
                type: 'TOGGLE_BOOKMARK',
                payload: currentQuestion.id
            });
        } catch (err) {
            setError('Failed to bookmark question');
        }
    }, [currentQuestion?.id, dispatch]);

    if (!currentQuestion) {
        return (
            <QuizContainer>
                <LoadingSpinner>Loading questions...</LoadingSpinner>
            </QuizContainer>
        );
    }

    return (
        <QuizContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ProgressBar>
                <Progress
                    value={state.currentQuestion + 1}
                    max={questions.length}
                />
            </ProgressBar>

            <QuestionCard>
                <QuestionText>{currentQuestion.question}</QuestionText>
                {currentQuestion.options.map((option, index) => (
                    <OptionButton
                        key={index}
                        onClick={() => !isLoading && handleAnswer(index)}
                        isSelected={selectedOption === index}
                        disabled={isLoading}
                    >
                        {option}
                    </OptionButton>
                ))}
                <BookmarkButton
                    onClick={handleBookmark}
                    isBookmarked={state.bookmarks.includes(currentQuestion.id)}
                    disabled={isLoading}
                >
                    {state.bookmarks.includes(currentQuestion.id) ? '★ Bookmarked' : '☆ Bookmark'}
                </BookmarkButton>
            </QuestionCard>

            <StatsContainer>
                <StatItem>
                    <span>{state.currentQuestion + 1}</span>
                    <span>of {questions.length}</span>
                </StatItem>
                <StatItem>
                    <span>{state.score}</span>
                    <span>Score</span>
                </StatItem>
                <StatItem>
                    <span>{Math.round((state.score / (state.currentQuestion + 1)) * 100)}%</span>
                    <span>Accuracy</span>
                </StatItem>
            </StatsContainer>
        </QuizContainer>
    );
}