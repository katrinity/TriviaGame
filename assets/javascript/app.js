var myQuestions;
let quizContainer;
let resultsContainer;
let submitButton;
let currentSlide;
let slides;
let previousButton = $("#previous");
let nextButton = $("#next");



$(document).ready(function () {
    quizContainer = $(".quiz-container");
    resultsContainer = $("#results");


    $('#previous').toggle()
    $('#next').toggle()
    $('#submit').toggle()
    myQuestions = [
        {
            question: "What are two rights in the Declaration of Independence?",
            answers: {
                a: "life and pursuit of happines",
                b: "liberty and justice",
                c: "life and right to own a home"
            },
            correctAnswer: "a"
        },
        {
            question: "When must all men register for the Selective Service?",
            answers: {
                a: "at age sixteen (16)",
                b: "at any age",
                c: "between eighteen (18) and twenty-six (26)"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the 'rule of law'?",
            answers: {
                a: "All laws must be the same in every state.",
                b: "Everyone must follow the law.",
                c: "Everyone but the Presodent must follow the law.",
            },
            correctAnswer: "b"
        },
        {
            question: "Who was the first President?",
            answers: {
                a: "Abraham Lincoln",
                b: "George Washington",
                c: "Thomas Jefferson",
            },
            correctAnswer: "b"
        },
        {
            question: "How old do citizens have to be to vote for President?",
            answers: {
                a: "sixteen (16) and older",
                b: "eighteen (18) and older",
                c: "twenty-one (21) and older",
            },
            correctAnswer: "b"
        },
        {
            question: "Name one right only for United States citizens?",
            answers: {
                a: "run for federal office",
                b: "freedom of speech",
                c: "attend public school",
            },
            correctAnswer: "a"
        },
        {
            question: "What does the President's Cabinet do?",
            answers: {
                a: "makes laws",
                b: "commands the U.S. Armed Forces",
                c: "advises the President",
            },
            correctAnswer: "c"
        },
        {
            question: "The House of Representatives has how many voting members?",
            answers: {
                a: "435",
                b: "441",
                c: "200",
            },
            correctAnswer: "a"
        },
        {
            question: "What is the highest court in the United States??",
            answers: {
                a: "the Federal Court",
                b: "the Supreme Court",
                c: "the District Court",
            },
            correctAnswer: "b"
        },
        {
            question: "Name one war fought by the United States in the 1900s.",
            answers: {
                a: "Civil War",
                b: "World War I",
                c: "Revolutionary War",
            },
            correctAnswer: "b"
        }

    ]

    $('.start').on("click", event => {
        $('.start').toggle()
        $('#previous').toggle()
        $('#next').toggle()
        $('#submit').toggle()
        buildQuiz();

    })

});

function buildQuiz() {
    // we'll need a place to store the HTML output
    var output = [];
    //console.log (myQuestions)

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        var answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
            // ...add an HTML radio button
            answers.push(
                `<label>
                 <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
               </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="slide">
               <div class="question"> ${currentQuestion.question} </div>
               <div class="answers"> ${answers.join("")} </div>
             </div>`
        );
    });

    // combine our output list into one string of HTML and put it on the page

    quizContainer.html(output.join(""));
    $('.slide').first().addClass('active-slide');
    previousButton = $("#previous");
    nextButton = $("#next");
    submitButton = $("#submit");
    slides = document.querySelectorAll(".slide");
    // 

    showSlide(0);

    // on submit, show results

    submitButton.on("click", showResults);
    previousButton.on("click", showPreviousSlide);
    nextButton.on("click", showNextSlide);
}

function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            // answerContainers[questionNumber].style.color = "lightgreen";
        } else {
            // if answer is wrong or blank
            // color the answers red
            answerContainers[questionNumber].style.color = "red";
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    console.log('currentSlide', currentSlide);
    if (currentSlide === 0) {

        previousButton.css('display', "none");
    } else {
        previousButton.css('display', "inline-block");
    }

    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        //nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}


// display quiz right away
//buildQuiz();


