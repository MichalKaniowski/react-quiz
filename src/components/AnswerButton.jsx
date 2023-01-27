import React, {useState, useEffect} from "react";


export default function AnswerButton(props) {
    return <button 
            className={`answer-button ${props.isActive ? "active" : ""}`}
            type="button"
            onClick={() => {
                props.handleClick(props.id);
            }} 
            >
            {props.questionAnswer}
        </button>
}