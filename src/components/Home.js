import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import DarkModeToggle from './DarkModeToggle';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  margin-bottom: 30px;
`;

const Button = styled.button`
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 15px 30px;
    margin: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        background-color: ${props => props.theme.secondary};
    }
`;

const ButtonContainer = styled.div`
    display: grid;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

function Home() {
    const navigate = useNavigate();
    const { state } = useQuiz();

    return (
        <HomeContainer>
            <DarkModeToggle />
            <Title>Welcome to Quiz App!</Title>
            <ButtonContainer>
                <Button onClick={() => navigate('/categories')}>
                    Start Quiz
                </Button>
                <Button onClick={() => navigate('/leaderboard')}>
                    Leaderboard
                </Button>
                <Button onClick={() => navigate('/bookmarks')}>
                    Bookmarked Questions ({state.bookmarks.length})
                </Button>
            </ButtonContainer>
        </HomeContainer>
    );
}

export default Home;