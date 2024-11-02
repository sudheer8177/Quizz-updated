import React, { useState, useEffect } from 'react';

const Quiz = ({ onShowResult }) => {
    const [quizs, setQuizs] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [question, setQuestion] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [marks, setMarks] = useState(0);
    const [showQuiz, setShowQuiz] = useState(true);

    // Load JSON Data
    useEffect(() => {
        fetch('quiz.json')
            .then(res => res.json())
            .then(data => setQuizs(data));
    }, []);

    // Set a Single Question
    useEffect(() => {
        if (quizs.length > questionIndex) {
            setQuestion(quizs[questionIndex]);
        }
    }, [quizs, questionIndex]);

    const checkAnswer = (event, selected) => {
        if (!selectedAnswer) {
            setCorrectAnswer(question.answer);
            setSelectedAnswer(selected);

            if (selected === question.answer) {
                event.target.classList.add('bg-success');
                setMarks(marks + 5);
            } else {
                event.target.classList.add('bg-danger');
            }
        }
    };

    const nextQuestion = () => {
        setCorrectAnswer('');
        setSelectedAnswer('');
        const wrongBtn = document.querySelector('button.bg-danger');
        wrongBtn?.classList.remove('bg-danger');
        const rightBtn = document.querySelector('button.bg-success');
        rightBtn?.classList.remove('bg-success');
        setQuestionIndex(questionIndex + 1);
    };

    const showTheResult = () => {
        setShowQuiz(false);
        onShowResult(marks);
    };

    return (
        <section className="bg-dark text-white" style={{ display: `${showQuiz ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            <div className="d-flex justify-content-between gap-md-3">
                                <h5 className='mb-2 fs-normal lh-base'>{question?.question}</h5>
                                <h5 style={{ color: '#60d600', width: '100px', textAlign: 'right' }}>{questionIndex + 1} / {quizs.length}</h5>
                            </div>
                            <div>
                                {
                                    question?.options?.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${correctAnswer === item && 'bg-success'}`}
                                            onClick={(event) => checkAnswer(event, item)}
                                        >
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>
                            {
                                (questionIndex + 1) !== quizs.length ? (
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={nextQuestion} disabled={!selectedAnswer}>Next Question</button>
                                ) : (
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={showTheResult} disabled={!selectedAnswer}>Show Result</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
