import React, {useState, useEffect} from "react";
import QuestionElement from "./QuestionElement";
import {nanoid} from "nanoid";

export default function App() {
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    let chosenAnswersArray = [];
    const [correctAnswersCount, setCorrectAnswerCount] = useState(0);

    useEffect(() => {
        getQuestions();
    }, []);

    function getQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium")
        .then(res => res.json())
        .then(data => setQuestions(data.results));
    }

    function handleHomeButtonClick() {
        setIsHomeScreen(false);
    }

    function createAnswerObject(indexOfChosenAnswer, indexOfCorrectAnswer, idOfChosenQuestion) {
        return {
            questionId: idOfChosenQuestion,
            chosenAnswerIndex: indexOfChosenAnswer,
            correctAnswerIndex: indexOfCorrectAnswer
        }
    }

    // const [checkedAnswers, setCheckedAnswers] = [];
    // console.log(checkedAnswers);

    // useEffect(() => {
    //     localStorage.setItem("areAnswerChecked", checkedAnswers);
    // }, [checkedAnswers])

    function handleAnswerChange(indexOfChosenAnswer, indexOfCorrectAnswer, idOfChosenQuestion, areAnswersChecked) {
        let isInTheArray = false;
        let indexOfItemToReplace;

        // setCheckedAnswers(prevAnswers => {
        //     return [
        //         ...prevAnswers,
        //         areAnswersChecked
        //     ]
        // });

        chosenAnswersArray.map((answer, index) => {
            if (idOfChosenQuestion == answer.questionId) {
                isInTheArray = true;
                indexOfItemToReplace = index;
            }
        });

        if (!isInTheArray) {
            chosenAnswersArray.push(createAnswerObject(indexOfChosenAnswer, indexOfCorrectAnswer, idOfChosenQuestion));
        } else {
            chosenAnswersArray[indexOfItemToReplace] = createAnswerObject(indexOfChosenAnswer, indexOfCorrectAnswer, idOfChosenQuestion);
        }
        // console.log(chosenAnswersArray);
    }

    function countCorrectAnswers() {
        let count = 0;
        chosenAnswersArray.map(answer => {
            answer.chosenAnswerIndex === answer.correctAnswerIndex && count++;
        });

        setCorrectAnswerCount(count);
    }

    function handleAnswersSubmit() {
        setIsQuizFinished(true);
        countCorrectAnswers(chosenAnswersArray);
    }

    function restartGame() {
        chosenAnswersArray = [];
        getQuestions();
        setIsQuizFinished(false);
    } 

    const questionElements = questions.map(question => {
        return <QuestionElement 
            key={nanoid()} 
            id={nanoid()} 
            text={question.question} 
            incorrect_answers={question.incorrect_answers}
            correct_answer={question.correct_answer}
            handleAnswerChange={handleAnswerChange}
            isQuizFinished={isQuizFinished}
        />
    });


    return <main className={isHomeScreen ? "flex-centered" : "questions-container"}>
        {isHomeScreen 
            ?
            <div className="home-container">
                <h1 className="home-heading">Quizzical</h1>
                <p className="home-description">Some description if needed</p>
                <button onClick={handleHomeButtonClick} className="home-button">Start quiz</button>
            </div> 
            :
            <form>
                {questionElements}
                <div className="score-container">
                    {isQuizFinished && <p>You scored {correctAnswersCount}/5 answers</p>}
                    {!isQuizFinished ? <button 
                        onClick={handleAnswersSubmit} 
                        type="button" 
                        className="home-button"
                    >
                        Check answers
                    </button> :
                    <button
                        onClick={restartGame}
                        type="button"
                        className="home-button"
                    >
                        Play again
                    </button>
                    }
                </div>
            </form>
        }
    </main>
}