const questionNumber = document.querySelector('.question-number')
const questionText = document.querySelector('.question-text')
const optionContainer = document.querySelector('.option-container')
const homePage = document.querySelector(".home-page")
const gamePage = document.querySelector(".game-page")
const resultPage = document.querySelector(".result-page")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// WPROWADZAM DOSTĘPNE PYTANIA DO TABLICY setAvailableQuestions
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// TWORZĘ OKIENKO Z NUMEREM PYTANIA, TREŚCIĄ I ODPOWIEDZIAMI
function getNewQuestion() {
    // KTÓRY NR PYTANIA
    questionNumber.innerHTML = "Pytanie " + (questionCounter + 1) + " z " + quiz.length;
    // LOSUJĘ RANDOMOWE PYTANIE
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q
    // POBIERAM INDEX Z TABLICY availableQuestions
    const index1 = availableQuestions.indexOf(questionIndex);
    // USUWAM questionIndex Z TABLICY availableQuestions ŻEBY PYTANIA SIĘ NIE POWTARZAŁY
    availableQuestions.splice(index1, 1);
    // POBIERAM ILOŚĆ ODPOWIEDZI
    const optionLen = currentQuestion.options.length
    // WPROWADZAM DOSTĘPNE ODPOWIEDZI DO TABLICY availableQuestions
    for(let i=0; i<optionLen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2

    // TWORZĘ ODPOWIEDZI W HTML
    for(let i=0; i<optionLen; i++) {
        // RANDOMOWO POKAZANE ODPOWIEDZI
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
        // POBIERAM optionIndex Z TABLICY availableOptions
        const index2 = availableOptions.indexOf(optionIndex)
        // USUNAM optionIndex Z TABLICY availableOptions ŻEBY ODPOWIEDZI SIĘ NIE POWTARZAŁY
        availableOptions.splice(index2, 1)
        // TWORZĘ ODPOWIEDZI W optionContainer
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's'
        animationDelay = animationDelay + 0.2
        option.className = "option"
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)")
    }
    questionCounter++
}

// POBIERAM WYNIK AKTUALNEGO PYTANIA
function getResult(element) {
    const id = parseInt(element.id)
    // POBIERAM ODPOWIEDŹ PORÓWNUJĄC ID KLIKNIĘTEJ ODPOWIEDZI
    if(id === currentQuestion.answer) {
        // WPROWADZAM ZIELONY KOLOR TO POPRAWNEJ OPCJI
        element.classList.add("correct")
        correctAnswers++
    }
    else {
        // WPROWADZAM CZERWONY KOLOR DO BŁĘDNEJ ODPOWIEDZI
        element.classList.add("wrong")

        // JEŚLI ODPOWIEDŹ JEST NIEPOPRAWNA, DODAJĘ ZIELONY KOLOR DO POPRAWNEJ ODPOWIEDZI I POKAZUJE DOBRY WYNIK
        const optionLen = optionContainer.children.length
        for(let i=0; i<optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// ODPOWIEDZI NIEKLIKALNE JEŚLI JEDNA JUŻ ZOSTAŁA KLIKNIĘTA
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next() {
    if(questionCounter === quiz.length) {
        quizOver()
    }
    else {
        getNewQuestion()
    }
}

function quizOver() {
    // UKRYWAM GAME-PAGE
    gamePage.classList.add("hide")
    // POKAZUJĘ OKIENKO WYNIKÓW
    resultPage.classList.remove("hide")
    quizResult();
}

// POBIERAM UZYSKANE WYNIKI
function quizResult() {
    resultPage.querySelector(".total-question").innerHTML = quiz.length
    resultPage.querySelector(".total-attempt").innerHTML = attempt
    resultPage.querySelector(".total-correct").innerHTML = correctAnswers
    resultPage.querySelector(".total-wrong").innerHTML = attempt - correctAnswers
    const percentage = (correctAnswers/quiz.length) * 100
    resultPage.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"
    resultPage.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length

}
// USUWAM WYNIKI
function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgain() {
    // UKRYWAM WYNIKI
    resultPage.classList.add("hide")
    // POKAZUJĘ GAMEPAGE
    gamePage.classList.remove("hide")
    resetQuiz();
    startQuiz();
}

function goHome() {
    // UKRYWAM RESULTPAGE
    resultPage.classList.add("hide")
    // POKAZUJĘ HOMEPAGE
    homePage.classList.remove("hide")
    resetQuiz();
}

// ROZPOCZĘCIE GRY
function startQuiz() {
    // UKRYWAM HOMEPAGE
    homePage.classList.add("hide")
    // POKAZUJĘ QUIZPAGE
    gamePage.classList.remove("hide")
    // WRZUCAM NOWE PYTANIA DO TABLICY availableQuestions
    setAvailableQuestions()
    // WYWOŁUJĘ FUNKCJĘ getNewQuestion()
    getNewQuestion()
}

window.onload = function() {
    homePage.querySelector(".total-question").innerHTML = quiz.length
}
