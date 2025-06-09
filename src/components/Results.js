import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';

const ResultsContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.card};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadow};
  text-align: center;
`;

const ScoreDisplay = styled.div`
  font-size: 2.5rem;
  margin: 2rem 0;
  color: ${props => props.theme.primary};
  font-weight: bold;
`;

const ResultMessage = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: ${props => props.theme.text};
`;

const Button = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.theme.secondary};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: ${props => props.theme.background};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default function Results() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();

    const getResultMessage = useCallback((score) => {
        const percentage = (score / state.totalQuestions) * 100;
        if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
        if (percentage >= 70) return "Great job! You did really well! 🌟";
        if (percentage >= 50) return "Good effort! Keep practicing! 👍";
        return "Keep learning! You'll do better next time! 💪";
    }, [state.totalQuestions]);

    const handleRetry = useCallback(() => {
        dispatch({ type: 'RESET_QUIZ' });
        navigate('/quiz');
    }, [dispatch, navigate]);

    const handleHome = useCallback(() => {
        dispatch({ type: 'RESET_QUIZ' });
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <ResultsContainer>
            <h1>Quiz Results</h1>

            <ScoreDisplay>
                {state.score} / {state.totalQuestions}
            </ScoreDisplay>

            <ResultMessage>
                {getResultMessage(state.score)}
            </ResultMessage>

            <StatsContainer>
                <StatCard>
                    <h3>Score Percentage</h3>
                    <p>{((state.score / state.totalQuestions) * 100).toFixed(1)}%</p>
                </StatCard>
                <StatCard>
                    <h3>Category</h3>
                    <p>{state.category || 'General'}</p>
                </StatCard>
            </StatsContainer>

            <div>
                <Button onClick={handleRetry}>
                    Try Again
                </Button>
                <Button onClick={handleHome}>
                    Back to Home
                </Button>
            </div>
        </ResultsContainer>
    );
}