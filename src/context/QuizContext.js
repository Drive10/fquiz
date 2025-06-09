import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
    score: 0,
    currentQuestion: 0,
    bookmarks: [],
    darkMode: false,
    category: '',
    difficulty: '',
    totalQuestions: 0,  // Add this line
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCORE':
            return { ...state, score: action.payload };
        case 'SET_CURRENT_QUESTION':
            return { ...state, currentQuestion: action.payload };
        case 'TOGGLE_BOOKMARK':
            const questionId = action.payload;
            const bookmarks = state.bookmarks.includes(questionId)
                ? state.bookmarks.filter(id => id !== questionId)
                : [...state.bookmarks, questionId];
            return { ...state, bookmarks };
        case 'TOGGLE_THEME':
            return { ...state, darkMode: !state.darkMode };
        case 'SET_QUIZ_SETTINGS':
            return {
                ...state,
                category: action.payload.category,
                difficulty: action.payload.difficulty,
                totalQuestions: action.payload.totalQuestions // Add this line
            };
        case 'RESET_QUIZ':
            return {
                ...state,
                score: 0,
                currentQuestion: 0,
                category: '',
                difficulty: '',
                totalQuestions: 0  // Add this line
            };
        default:
            return state;
    }
};

export const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};