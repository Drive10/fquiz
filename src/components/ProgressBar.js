import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const progressAnimation = keyframes`
  from {
    width: 0;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 20px 0;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
  width: ${props => props.progress}%;
  animation: ${progressAnimation} 0.5s ease-out;
  transition: width 0.3s ease;
`;

function ProgressBar({ current, total }) {
    const progress = (current / total) * 100;
    return (
        <ProgressBarContainer>
            <Progress progress={progress} />
        </ProgressBarContainer>
    );
}

export default ProgressBar;