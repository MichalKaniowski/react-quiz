import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

export default function QuestionElement(props) {
    let allAnswers = [...props.incorrect_answers, props.correct_answer]; 
    allAnswers = shuffleArray(allAnswers);
    const [isQuizFinished, setIsQuizFinished] = useState(props.isQuizFinished);

    const answerObjects = allAnswers.map((answer, index) => {
        return {
            id: nanoid(),
            text: answer,
            isCorrect: answer === props.correct_answer,
            isChecked: false,
            index: index
        }
    });

    const areAnswersCheckedArray = [false, false, false, false, false];
    const [areAnswersChecked, setAreAnswersChecked] = useState(() => areAnswersCheckedArray);

    // console.log(areAnswersChecked);

    //we need this useState so answers don't refresh on every refresh of the app
    const [answers, setAnswers] = useState(() => answerObjects); 
    const [chosenAnswerId, setChosenAnswerId] = useState(() => "");

    function getCorrectAnswerIndex() {
        return answers.indexOf(answers.find(object => object.text == props.correct_answer));
    }

    function handleAnswerChange(chosenAnswerId) {
        const indexOfChosenAnswer = answers.indexOf(answers.find(object => object.id == chosenAnswerId));
        const indexOfCorrectAnswer = getCorrectAnswerIndex();

        areAnswersChecked[indexOfChosenAnswer] = true;

        props.handleAnswerChange(indexOfChosenAnswer, indexOfCorrectAnswer, props.id, areAnswersChecked); 
        setChosenAnswerId(chosenAnswerId);
    }

    const buttonAnswers = answers.map((answer, index) => {
        // console.log(areAnswersChecked[index]);
        // console.log(answer);
        return <button 
            key={nanoid()} 
            onClick={() => handleAnswerChange(answer.id)} 
            className={`answer-button ${chosenAnswerId === answer.id ? "active" : ""} ${isQuizFinished && answer.isCorrect ? "correct" : ""}`}
            >
            {answer.text}
        </button>
    });

    console.log(chosenAnswerId);

    return <div className="question-element">
        <h3 className="question-element-heading">{props.text}</h3>
        {buttonAnswers}
        <hr style={{color: "#DBDEF0"}}></hr>
    </div>
}