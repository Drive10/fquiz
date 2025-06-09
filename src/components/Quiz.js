import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Option = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: ${props => props.selected ? '#4CAF50' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.selected ? '#45a049' : '#f0f0f0'};
  }
`;

const questions = [
    {
        question: "What is React?",
        options: [
            "A JavaScript library for building user interfaces",
            "A programming language",
            "A database management system",
            "An operating system"
        ],
        correctAnswer: 0
    },
    {
        question: "What is JSX?",
        options: [
            "A JavaScript engine",
            "A syntax extension for JavaScript",
            "A plugin for React",
            "A web browser"
        ],
        correctAnswer: 1
    },
    // Add more questions as needed
];

function Quiz() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (optionIndex) => {
        setSelectedAnswer(optionIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer(null);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <QuizContainer>
                <QuestionCard>
                    <h2>Quiz Complete!</h2>
                    <p>Your score: {score} out of {questions.length}</p>
                    <Option onClick={handleRestart}>Restart Quiz</Option>
                    <Option onClick={() => navigate('/')}>Back to Home</Option>
                </QuestionCard>
            </QuizContainer>
        );
    }

    return (
        <QuizContainer>
            <QuestionCard>
                <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                <h3>{questions[currentQuestion].question}</h3>
                {questions[currentQuestion].options.map((option, index) => (
                    <Option
                        key={index}
                        selected={selectedAnswer === index}
                        onClick={() => handleAnswerSelect(index)}
                    >
                        {option}
                    </Option>
                ))}
                <Option
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </Option>
            </QuestionCard>
        </QuizContainer>
    );
}

export default Quiz;