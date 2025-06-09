import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
    darkMode: false,
    scores: [],
    bookmarks: [],
    selectedCategory: 'all',
    difficulty: 'medium',
};

function quizReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            return { ...state, darkMode: !state.darkMode };
        case 'ADD_SCORE':
            return { ...state, scores: [...state.scores, action.payload] };
        case 'TOGGLE_BOOKMARK':
            return {
                ...state,
                bookmarks: state.bookmarks.includes(action.payload)
                    ? state.bookmarks.filter(id => id !== action.payload)
                    : [...state.bookmarks, action.payload]
            };
        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_DIFFICULTY':
            return { ...state, difficulty: action.payload };
        default:
            return state;
    }
}

export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    return useContext(QuizContext);
}