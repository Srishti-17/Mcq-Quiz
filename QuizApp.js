import React, { useState, useEffect } from "react";
import { quiz } from "./Data";
import MultiProgress from "react-multi-progress";
import { handleDifficultyLevel , handleOptions} from "../Utils";



function QuizApp() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [correctcolor, setCorrectcolor] = useState("");
  const [Score, setScore] = useState(0);
  const [clickOption, setClickOption] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(105);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answerStatus, setAnswerStatus] = useState("");
  const [showShuffledArray, setshowShuffledArray] = useState([]);
 

  

  useEffect(() => {
    const shuffledArray = handleOptions(currentQuestion);
    setshowShuffledArray(shuffledArray);
  }, [currentQuestion]);
  // To change question
  const changeQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setcurrentQuestion(currentQuestion + 1);
      setClickOption(0);
      setAnswerStatus("");
      setQuestionNumber(questionNumber + 1);
    }
  };
  //to update score
  const updateScore = (item, index) => {
    if (
      item === quiz[currentQuestion].correct_answer 
     
    ) {
      setScore(Score + 5);
      setCorrectAnswer(correctAnswer + 5);
      setCorrectcolor(index);
      setAnswerStatus("correct");
      setIncorrectAnswer(incorrectAnswer - 5);
    } 
    else  {
      setAnswerStatus("incorrect");
      setCorrectcolor(index);
    }
  };
  return (
    <div>
      <div className="container">
        <h1 className="heading-txt">Quiz</h1>
        <progress
          value={currentQuestion + 1}
          max={quiz.length}
          className="quesProgressBar"
        ></progress>
        <h3 className="question">Question {currentQuestion + 1} of 20.</h3>
        <div className="heading">
          category:{decodeURIComponent(quiz[currentQuestion].category)}
        </div>
        <div className="heading">
          {handleDifficultyLevel(quiz[currentQuestion].difficulty)}
        </div>
        <div className="question">
          <span id="question-text">
            {decodeURIComponent(quiz[currentQuestion].question)}
          </span>
        </div>
        <div className="option-container">
          {showShuffledArray.map((options, index) => {
            return (
              <button
                className="option-btn"
                onClick={() => {
                  const item = options;
                  updateScore(item, index);
                }}
                style={{backgroundColor:
                  index === correctcolor && "rgb(86, 11, 184)",
                  color: index === correctcolor && "white",
                  border: index === correctcolor && "1px solid black",
                }}
              >
                {decodeURIComponent(options)}
              </button>
            );
          })}
        </div>
        {}
        {answerStatus === "correct" && <p className="Correct">Correct!</p>}
        {answerStatus === "incorrect" && ( <p className="Sorry">Sorry, please try again.</p> )}
        <button
          onClick={() => {
            updateScore(clickOption);
            changeQuestion();
          }}
          className="btn"
        >
          {" "}
          Next
        </button>
        <span>
          <label className="scoree">Score : {correctAnswer}</label>{" "}
        </span>
        <span>
          <label className="MaxScore">Max Score : {incorrectAnswer - 5}</label>
        </span>
        <MultiProgress
          className="answerProgressBar"
          elements={[
            {
              value: correctAnswer,
              color: "hotpink",
              isBold: false,
              percent: ((currentQuestion + 1) / quiz.length) * 100,
            },
            {
              value: 0,
              color: "yellow",
              fontSize: 12,
              textColor: "white",
              isBold: true,
            },
            {
              value: incorrectAnswer - 5,
              color: "grey",
              textColor: "White",
              fontSize: 20,
              isBold: false,
            },
          ]}
          height={30}
        />
      </div>
    </div>
  );
}
export default QuizApp;