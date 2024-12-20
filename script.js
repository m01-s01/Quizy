const q = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Where is the smallest bone in human body?",
        answers: [
            { text: "Neck", correct: false},
            { text: "Thumb", correct: false},
            { text: "Ear", correct: true},
            { text: "Eye", correct: false},
        ]
    },
    {
        question: "Which is the chemical formula of water?",
        answers: [
            { text: "H2", correct: false},
            { text: "H2O2", correct: false},
            { text: "H2O", correct: true},
            { text: "SO2", correct: false},
        ]
    }
];

const questionEle = document.getElementById("question");
const ansBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = q[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEle.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
   nextBtn.style.display = "none";
   while(ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
   }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}


function showScore(){
    resetState();
    questionEle.innerHTML = `You scored ${score} out of ${q.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < q.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < q.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();


