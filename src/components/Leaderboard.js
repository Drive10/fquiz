import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';

const LeaderboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ScoreCard = styled.div`
  background-color: ${props => props.theme.card};
  color: ${props => props.theme.text};
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Leaderboard() {
    const { state } = useQuiz();
    const sortedScores = [...state.scores].sort((a, b) => b.score - a.score);

    return (
        <LeaderboardContainer>
            <h1>Leaderboard</h1>
            {sortedScores.map((score, index) => (
                <ScoreCard key={index}>
                    <div>
                        <h3>#{index + 1}</h3>
                        <p>Category: {score.category}</p>
                        <p>Difficulty: {score.difficulty}</p>
                    </div>
                    <div>
                        <h2>{score.score} points</h2>
                        <p>{new Date(score.date).toLocaleDateString()}</p>
                    </div>
                </ScoreCard>
            ))}
        </LeaderboardContainer>
    );
}

export default Leaderboard;