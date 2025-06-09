import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.card};
  color: ${props => props.theme.text};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

function DarkModeToggle() {
    const { state, dispatch } = useQuiz();

    return (
        <ToggleButton onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>
            {state.darkMode ? '☀️' : '🌙'}
        </ToggleButton>
    );
}

export default DarkModeToggle;