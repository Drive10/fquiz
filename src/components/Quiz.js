import React, {useMemo, useCallback, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {useNavigate} from 'react-router-dom';
import {useQuiz} from '../context/QuizContext';

// Styled components definitions
const QuizContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const LoadingSpinner = styled.div`
    text-align: center;
    padding: 20px;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    padding: 20px;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const Progress = styled.div`
    width: ${props => (props.value / props.max) * 100}%;
    height: 100%;
    background-color: #4CAF50;
    border-radius: 10px;
    transition: width 0.3s ease;
`;

const QuestionCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const QuestionText = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

const OptionButton = styled.button`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 2px solid ${props => props.isSelected ? '#4CAF50' : '#ddd'};
    border-radius: 5px;
    background-color: ${props => props.isSelected ? '#e8f5e9' : 'white'};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.isSelected ? '#e8f5e9' : '#f5f5f5'};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const BookmarkButton = styled.button`
    margin-top: 10px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    color: ${props => props.isBookmarked ? '#FFB100' : '#666'};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StatItem = styled.div`
    text-align: center;

    span {
        display: block;

        &:first-of-type {
            font-size: 1.2rem;
            font-weight: bold;
        }

        &:last-of-type {
            font-size: 0.9rem;
            color: #666;
        }
    }
`;


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export default function Quiz() {
    const navigate = useNavigate();
    const {state, dispatch} = useQuiz();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState(null);

    // Fetch questions from backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Build query parameters
                const params = new URLSearchParams();
                if (state.difficulty) params.append('difficulty', state.difficulty);
                if (state.category) params.append('category', state.category);

                const response = await fetch(`${API_URL}/questions?${params}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }

                const data = await response.json();

                // Format questions from backend to match our frontend structure
                const formattedQuestions = data.map(q => ({
                    id: q.id,
                    question: q.questionText, // or q.question depending on your backend field name
                    options: [q.option1, q.option2, q.option3, q.option4],
                    correctAnswer: q.correctAnswer
                }));

                setQuestions(formattedQuestions);

                // Update quiz settings
                dispatch({
                    type: 'SET_QUIZ_SETTINGS',
                    payload: {
                        totalQuestions: formattedQuestions.length,
                        category: state.category,
                        difficulty: state.difficulty
                    }
                });
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Failed to load questions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [dispatch, state.category, state.difficulty]);

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
                    dispatch({type: 'SET_SCORE', payload: state.score + 1});
                }

                if (state.currentQuestion < questions.length - 1) {
                    dispatch({type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion + 1});
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

    // Loading state
    if (isLoading) {
        return (
            <QuizContainer>
                <LoadingSpinner>Loading questions...</LoadingSpinner>
            </QuizContainer>
        );
    }

    // Error state
    if (error) {
        return (
            <QuizContainer>
                <ErrorMessage>{error}</ErrorMessage>
            </QuizContainer>
        );
    }

    // No questions available
    if (!questions.length) {
        return (
            <QuizContainer>
                <ErrorMessage>No questions available for this category.</ErrorMessage>
            </QuizContainer>
        );
    }

    // No current question
    if (!currentQuestion) {
        return (
            <QuizContainer>
                <ErrorMessage>No question found.</ErrorMessage>
            </QuizContainer>
        );
    }

    return (
        <QuizContainer>
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