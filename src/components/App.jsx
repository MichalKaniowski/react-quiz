import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import QuestionElement from "./QuestionElement";


export default function App() {
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [questions, setQuestions] = useState(() => []);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchAndUpdateQuestions();
    }, []);

    function fetchAndUpdateQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium")
            .then(res => res.json())
            .then(data => setQuestions(data.results));
    }

    function handleHomeButtonClick() {
        setIsHomeScreen(false);
    }

    function handleAnswerChange(questionId, answerId) {
        const newQuestions  = questions.map(question => {
            for (let i=0; i<question.answers.length; i++) {
                if (question.id === questionId && question.answers[i].isChecked) {
                    question.answers[i].isChecked = false;
                }
                if (question.answers[i].id === answerId) {
                    question.answers[i].isChecked = !question.answers[i].isChecked;
                }
            }
            return question;
        });

        setQuestions(newQuestions);
    }

    function handleQuizFinish() {
        if (isQuizFinished) {
            fetchAndUpdateQuestions();
            setIsQuizFinished(false);
            return;
        }

        let score = 0;
        questions.forEach(question => {
            const chosenAnswer = question.answers.find(answer => answer.isChecked === true);
            if (chosenAnswer.isCorrect) {
                score++;
            }
        });
        setScore(score);
        setIsQuizFinished(true);
    }

    const questionElements = questions.map(question => {
        return <QuestionElement
            key={nanoid()}
            question={question}
            isQuizFinished={isQuizFinished}
            handleAnswerChange={(questionId, answerId) => handleAnswerChange(questionId, answerId)}
        />
    });


    return <main className={isHomeScreen ? "home-screen" : "questions-container"}>
        {isHomeScreen
            ?
            <div className="home-container">
                <h1 className="home-heading">Quizzical</h1>
                {/* <p className="home-description">Some description if needed</p> */}
                <button onClick={handleHomeButtonClick} className="home-button">Start quiz</button>
            </div>
            :
            <form>
                {questionElements}
                <div className="score-container">
                    {isQuizFinished && <p>You scored {score}/5 answers</p>}

                    <button
                        onClick={handleQuizFinish}
                        type="button"
                        className="home-button"
                    >
                        {isQuizFinished ? "Play again" : "Check answers"}
                    </button>
                </div>
            </form>
        }
    </main>
}