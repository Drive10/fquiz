import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

function Home() {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <h1>Welcome to the Quiz App</h1>
            <StartButton onClick={() => navigate('/quiz')}>
                Start Quiz
            </StartButton>
        </HomeContainer>
    );
}

export default Home;