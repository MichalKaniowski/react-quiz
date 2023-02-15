import {nanoid} from "nanoid";
import AnswerButton from "./AnswerButton";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

function replaceCharactersInQuestion(question) { // &quot; ==> "
    while (question.includes("&quot;")) {
        question = question.replace("&quot;", '"');
    }
    return question;
}

export default function QuestionElement(props) {
    props.question["id"] = nanoid();
        let answers;
        if (!props.question.hasOwnProperty("answers")) {
            answers = [
                {
                    id:nanoid(),
                    text: props.question.correct_answer,
                    isChecked: false,
                    isCorrect: true
                }
            ];
            props.question.incorrect_answers.map(answer => answers.push({id:nanoid(), text: answer, isChecked: false, isCorrect: false}));
            props.question["answers"] = shuffleArray(answers);
        } else {
            answers = props.question.answers;
        }

        return <div className="question-container" key={nanoid()}>
            <h3>{replaceCharactersInQuestion(props.question.question)}</h3>
            {answers.map(answer => {
                return <AnswerButton key={nanoid()} answer={answer} isQuizFinished={props.isQuizFinished} handleClick={() => props.handleAnswerChange(props.question.id, answer.id)} />
            })}
            <hr style={{marginTop: "20px"}}/>
        </div>
}