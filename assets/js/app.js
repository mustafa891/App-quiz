import {
    questions
} from "./quizData.js"

const startBtn = document.getElementById("startBtn")
const answerBtns = document.querySelectorAll(".answers button");
const timeDisplay = document.querySelector(".time");

let shuffleQuestion, questionIndex, timeStart;
let quiz_point = 0;


function startGame() {

    document.querySelector(".menu").classList.add("d-none")
    document.querySelector(".quiz").classList.remove("d-none")
    timeDisplay.classList.remove("d-none")

    shuffleQuestion = questions.sort(() => Math.random() - 0.5);
    questionIndex = 0;
    timeStart = 10;

    localStorage.removeItem("score")

    displayQuestion()
    timer()
}


function displayQuestion() {

    // Check quizEnd
    if (questionIndex == questions.length) return QuizEnd();

    const questionDisplay = document.querySelector(".quiestion h3");
    let currentQuestionAnswer = shuffleQuestion[questionIndex].choices.sort(() => Math.random() - 0.5);

    questionDisplay.textContent = shuffleQuestion[questionIndex].question;

    answerBtns.forEach((btn, i) => {
        btn.textContent = currentQuestionAnswer[i];
        btn.setAttribute("data-choice", currentQuestionAnswer[i])
    });

}

function checkAnswer(e) {

    let yourChoice = e.currentTarget.dataset.choice;
    if (yourChoice == shuffleQuestion[questionIndex].correctAnswer) quiz_point += 1;
    localStorage.setItem("score",quiz_point);
    nextQuestion();
}


function nextQuestion() {
    questionIndex += 1;
    timeDisplay.textContent = timeStart = 10
    timer();
    displayQuestion()
}

function QuizEnd() {
    window.location.href = "result.html";
}


function timer() {
    let timerId;
    timerId = setInterval(() => {
        if (timeStart <= 1) {
            clearInterval(timerId)
            nextQuestion()
        }
        timeStart -= 1;
        timeDisplay.textContent = timeStart
    }, 1000);
}


// Events

startBtn.addEventListener("click", startGame);
answerBtns.forEach(btn => {
    btn.addEventListener("click", checkAnswer);
})