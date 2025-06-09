import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QuizProvider } from './context/QuizContext';
import { useQuiz } from './context/QuizContext';
import { lightTheme, darkTheme } from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Quiz = lazy(() => import('./components/Quiz'));
const Categories = lazy(() => import('./components/Categories'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const Bookmarks = lazy(() => import('./components/Bookmarks'));

function AppContent() {
    const { state } = useQuiz();
    const theme = state.darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <div className="App" style={{ backgroundColor: theme.background }}>
                <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Router>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/quiz" element={<Quiz />} />
                                <Route path="/categories" element={<Categories />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/bookmarks" element={<Bookmarks />} />
                            </Routes>
                        </Router>
                    </Suspense>
                </ErrorBoundary>
            </div>
        </ThemeProvider>
    );
}

function App() {
    return (
        <QuizProvider>
            <AppContent />
        </QuizProvider>
    );
}

export default App;