import styled from '@emotion/styled';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled.div`
  background-color: ${props => props.theme.card};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const categories = [
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'tech', name: 'Technology', icon: '💻' },
];

function Categories() {
    const { dispatch } = useQuiz();
    const navigate = useNavigate();

    const handleCategorySelect = (categoryId) => {
        dispatch({ type: 'SET_CATEGORY', payload: categoryId });
        navigate('/quiz');
    };

    return (
        <CategoriesContainer>
            {categories.map(category => (
                <CategoryCard
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                >
                    <h2>{category.icon} {category.name}</h2>
                </CategoryCard>
            ))}
        </CategoriesContainer>
    );
}

export default Categories;