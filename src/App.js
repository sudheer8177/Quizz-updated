import React, { useState } from 'react';
import Start from "./components/Start";
import Quiz from './components/Quizz';
import Result from './components/Result';

function App() {
    const [stage, setStage] = useState('start');
    const [marks, setMarks] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const handleStartQuiz = () => {
        setStage('quiz');
    };

    const handleShowResult = (score) => {
        setMarks(score);
        setTotalQuestions(score / 5); // Assuming marks are 5 per question.
        setStage('result');
    };

    const handleStartOver = () => {
        setStage('start');
        setMarks(0);
        setTotalQuestions(0);
    };

    return (
        <>
            {stage === 'start' && <Start onStart={handleStartQuiz} />}
            {stage === 'quiz' && <Quiz onShowResult={handleShowResult} />}
            {stage === 'result' && <Result score={marks} total={totalQuestions} onStartOver={handleStartOver} />}
        </>
    );
}

export default App;
