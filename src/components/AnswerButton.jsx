export default function AnswerButton(props) {
    return <button
    type="button"
    className={`answer-button ${props.isQuizFinished ? (props.answer.isCorrect ? "correct" : (props.answer.isChecked ? "wrong" : "")) : props.answer.isChecked ? "active" : ""} ${props.isQuizFinished ? "disabled" : ""}`}
    onClick={() => props.handleClick()}
    >
        {props.answer.text}
    </button>
}