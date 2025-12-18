const questions = [
    {
        question: "In which year of First World War Germany declared war on Russia and France?",
        answers:[
            {text:"1914", correct:true},
            {text:"1915", correct:false},
            {text:"1916", correct:false},
            {text:"1917", correct:false}
        ]
    },
    {
        question: "India has largest deposits of ____ in the world.",
        answers:[
            {text:"gold", correct:false},
            {text:"copper", correct:false},
            {text:"mica", correct:true},
            {text:"None of the above", correct:false}
        ]
    },
    {
        question: "How many Lok Sabha seats belong to Rajasthan?",
        answers:[
            {text:"32", correct:false},
            {text:"25", correct:true},
            {text:"30", correct:false},
            {text:"17", correct:false}
        ]
    },
    {
        question: "India's first satellite is named after",
        answers:[
            {text:"Aryabhatta", correct:true},
            {text:"Bhaskara II", correct:false},
            {text:"Bhaskara I", correct:false},
            {text:"Albert Einstein", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();