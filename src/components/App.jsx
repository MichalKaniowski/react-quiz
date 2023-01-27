import React, {useState, useEffect} from "react";
import QuestionElement from "./QuestionElement";
import {nanoid} from "nanoid";

export default function App() {
    const [isHomeScreen, setIsHomeScreen] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium")
        .then(res => res.json())
        .then(data => setQuestions(data.results))      
    }, []);

    console.log(questions);

    function handleButtonClick() {
        setIsHomeScreen(prevValue => !prevValue);
    }

    const questionElements = questions.map(question => {
        return <QuestionElement 
            key={nanoid()} 
            id={nanoid()} 
            text={question.question} 
            answers={[...question.incorrect_answers, question.correct_answer]}
        />
    });

    return <main className={isHomeScreen ? "flex-centered" : "questions-container"}>
        {isHomeScreen 
            ?
            <div className="home-container">
                <h1 className="home-heading">Quizzical</h1>
                <p className="home-description">Some description if needed</p>
                <button onClick={handleButtonClick} className="home-button">Start quiz</button>
            </div> 
            :
            <form>
                {questionElements}
            </form>
        }
        
    </main>
}