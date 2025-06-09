import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { lightTheme, darkTheme } from './styles/theme';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Quiz = lazy(() => import('./components/Quiz'));
const Categories = lazy(() => import('./components/Categories'));
const Bookmarks = lazy(() => import('./components/Bookmarks'));
const Results = lazy(() => import('./components/Results')); // Add this line

const AppRoutes = () => {
    const { state } = useQuiz();

    return (
        <ThemeProvider theme={state.darkMode ? darkTheme : lightTheme}>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/results" element={<Results />} /> {/* Add this line */}
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
};

export default function App() {
    return (
        <QuizProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </QuizProvider>
    );
}