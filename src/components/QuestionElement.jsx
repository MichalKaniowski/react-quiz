import React, {useState, useEffect} from "react";
import AnswerButton from "./AnswerButton";
import {nanoid} from "nanoid";

export default function QuestionElement(props) {
    const [chosenAnswerId, setChosenAnswerId] = useState("");

    function handleAnswerChange(chosenAnswerId) {
        console.log(chosenAnswerId);
        setChosenAnswerId(prevValue => chosenAnswerId)
    }

    return <div className="question-element">
        <h3 className="question-element-heading">{props.text}</h3>

        {props.answers.map(answer => {
            const answerKey = nanoid();
            return <AnswerButton 
                key={nanoid()}
                id={answerKey}
                questionAnswer={answer} 
                isActive={chosenAnswerId === answerKey ? true : false}
                handleClick={handleAnswerChange}  
                />
        })}
        <hr style={{color: "#DBDEF0"}}></hr>
    </div>
}
