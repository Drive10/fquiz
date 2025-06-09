import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const BookmarksContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const BookmarkCard = styled.div`
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 40px;
    color: ${props => props.theme.text};
`;

const Button = styled.button`
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.theme.secondary};
    }
`;

function Bookmarks() {
    const { state, dispatch } = useQuiz();
    const navigate = useNavigate();

    // This should be replaced with your actual questions data structure
    const allQuestions = [
        {
            id: 1,
            question: "What is React?",
            category: "tech",
            difficulty: "easy",
            options: [
                "A JavaScript library for building user interfaces",
                "A programming language",
                "A database management system",
                "An operating system"
            ],
            correctAnswer: 0
        },
        // Add more questions here
    ];

    const bookmarkedQuestions = allQuestions.filter(question =>
        state.bookmarks.includes(question.id)
    );

    const handleRemoveBookmark = (questionId) => {
        dispatch({ type: 'TOGGLE_BOOKMARK', payload: questionId });
    };

    const handlePracticeBookmarked = () => {
        // You could implement a special quiz mode for bookmarked questions
        navigate('/quiz', { state: { bookmarkedOnly: true } });
    };

    return (
        <BookmarksContainer>
            <h1>Bookmarked Questions</h1>

            {bookmarkedQuestions.length > 0 ? (
                <>
                    <Button onClick={handlePracticeBookmarked}>
                        Practice Bookmarked Questions
                    </Button>

                    {bookmarkedQuestions.map(question => (
                        <BookmarkCard key={question.id}>
                            <h3>{question.question}</h3>
                            <p>Category: {question.category}</p>
                            <p>Difficulty: {question.difficulty}</p>
                            <Button
                                onClick={() => handleRemoveBookmark(question.id)}
                                style={{ backgroundColor: '#ff4444' }}
                            >
                                Remove Bookmark
                            </Button>
                        </BookmarkCard>
                    ))}
                </>
            ) : (
                <EmptyState>
                    <h2>No bookmarked questions yet!</h2>
                    <p>Start adding bookmarks while taking quizzes</p>
                    <Button onClick={() => navigate('/quiz')}>
                        Take a Quiz
                    </Button>
                </EmptyState>
            )}
        </BookmarksContainer>
    );
}

export default Bookmarks;