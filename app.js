const questions = [{
        question: "قورئان چه‌ند پیته‌ ؟",
        choices: [3040740, 3040780, 3040741, 304240],
        correctAnswer: "3040740",
    },

    {
        question: "قورئان چه‌ند سوره‌ته‌ ؟",
        choices: [115, 114, 111, 110],
        correctAnswer: "114",
    },
    {
        question: "قورئان چه‌ند جزئه‌ ؟ ",
        choices: [28, 31, 29, 30 ],
        correctAnswer: "30",
    },
      {
        question: "قورئان چه‌ند حیزبه‌ ؟",
        choices: [65, 60 , 58, 30 ],
        correctAnswer: "60",
    },
    {
        question: "درێژترین ئایه‌ت له‌ چ سوره‌تێکه‌ ؟",
        choices: ["نور", "الدخان" , "الکهف", "البقره‌" ],
        correctAnswer: "البقره",
    }
];

const startBtn = document.getElementById("start")
const questionDisplay = document.querySelector(".question");
const choicesBtn = document.querySelectorAll(".choice");
const lengthQuestonDisplay = document.getElementById("lengthQuestion");
const Menu = document.querySelector(".menu");
const Quiz = document.querySelector(".quiz");
const timeDisplay = document.getElementById("number");
const circleTime = document.querySelector("circle");
const msg = document.getElementById("message");
const questionLengthDisplay  = document.getElementById("lengthQuestion")
let randomilyQuestions = shuffle(questions);

let running = false; 
let canClick = false; 
let score = 0;
let questionIndex = 0;
let currentQuestion;
let quizEnd = true;
let time = 10;
let initialOffset = 440;
let timeDecrement= 1; 
let timerId;

function shuffle(array) {

    let temp;
    let currentIndex = array.length;

    for (i = 0; i < array.length; i++) {
        let rand = Math.floor(Math.random() * currentIndex);
        let temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

function init() {
    canClick = true;
    getQuestion();
    End()
    timer()
}

function getQuestion() {

    if (questionIndex == questions.length) running = false, quizEnd = true;

    if (!running) return;

    currentQuestion = randomilyQuestions[questionIndex];

    questionDisplay.textContent = currentQuestion.question

    // add Choices 
    let choices = shuffle(currentQuestion.choices);
    choices.forEach((choice, i) => {
        choicesBtn[i].textContent = choice;
        choicesBtn[i].setAttribute("data-choice", choice, );
    });

}

function checkChoise(e) {

    let target = e.currentTarget;
    let selectChoice = target.dataset.choice;

    if (!running || !canClick) return;
    if (selectChoice == currentQuestion.correctAnswer) score += 1;

    questionIndex += 1;
    target.classList.add("selected")
    canClick = false;

    setTimeout(() => {
        target.classList.remove("selected")
        questionLengthDisplay.textContent = `${questionIndex}/${questions.length}`;
        timeDecrement = 1;
        clearInterval(timerId)
        init();
    }, 500);
}



function End() {

    if (!quizEnd) return;
    running = false;
    canClick = false;
    Menu.style.display = "block";
    Quiz.style.display = "none";
    document.querySelector("header > strong").style.display = "none";
    msg.textContent =  `Quiz end your Score is : ${score}`;
}

function timer() {

  circleTime.style.strokeDashoffset =  initialOffset-(1*(initialOffset/time))

  timerId = setInterval(() => {
    if(time == timeDecrement) {
    clearInterval(timerId)
    timeDecrement = 0;
    questionIndex +=1;
    init();
    questionLengthDisplay.textContent = `${questionIndex}/${questions.length}`;
   }
    timeDisplay.textContent = timeDecrement; 
     circleTime.style.strokeDashoffset =  initialOffset-((timeDecrement+1)*(initialOffset/time))
    timeDecrement++;
  },1000)

}


function newQuiz() {
    randomilyQuestions;
    timeDecrement = 1;
    clearInterval(timerId);
    running = true;
    canClick = true;
    score = 0;
    questionIndex = 0;
    currentQuestion;
    quizEnd = false;
    Menu.style.display = "none";
    document.querySelector("header > strong").style.display = "block";
    Quiz.style.display = "flex";
    questionLengthDisplay.textContent = `${questionIndex}/${questions.length}`;
}

// Event 
choicesBtn.forEach(btn => btn.addEventListener("click", checkChoise));

startBtn.addEventListener("click", () => {
    newQuiz();
    init()
});
