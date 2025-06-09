export const questions = {
    science: {
        easy: [
            {
                id: 'sci_e_1',
                question: "What is the chemical symbol for water?",
                options: ["H2O", "CO2", "O2", "N2"],
                correctAnswer: 0,
                category: "science",
                difficulty: "easy"
            },
            // Add more easy science questions
        ],
        medium: [
            {
                id: 'sci_m_1',
                question: "What is the process by which plants convert light energy to chemical energy?",
                options: ["Photosynthesis", "Respiration", "Fermentation", "Oxidation"],
                correctAnswer: 0,
                category: "science",
                difficulty: "medium"
            },
            // Add more medium science questions
        ],
        hard: [
            {
                id: 'sci_h_1',
                question: "What is the Heisenberg Uncertainty Principle?",
                options: [
                    "Cannot simultaneously know position and momentum precisely",
                    "Energy is always conserved",
                    "Matter cannot be created or destroyed",
                    "Light behaves as both wave and particle"
                ],
                correctAnswer: 0,
                category: "science",
                difficulty: "hard"
            },
            // Add more hard science questions
        ]
    },
    history: {
        // Similar structure for history questions
    },
    tech: {
        // Similar structure for tech questions
    },
    geography: {
        // Similar structure for geography questions
    }
};