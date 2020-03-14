let questionslist = {};
let trivia = {};

let questions;
let answers = ["a", "c", "b", "b", "b", "a", "c", "a", "b", "b"];

let intervalID;

// Timer Object ========================================================================================================
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

// Question Object =====================================================================================================

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "What are two rights in the Declaration of Independence?",
            a: "life and pursuit of happines",
            b: "liberty and justice",
            c: "life and right to own a home",
        },
        q1: {
            question: "When must all men register for the Selective Service?",
            a: "at age sixteen (16)",
            b: "at any age",
            c: "between eighteen (18) and twenty-six (26)",
        },
        q2: {
            question: "What is the 'rule of law'?",
            a: "All laws must be the same in every state.",
            b: "Everyone must follow the law.",
            c: "Everyone but the Presodent must follow the law.",
        },
        q3: {
            question: "Who was the first President?",
            a: "Abraham Lincoln",
            b: "George Washington",
            c: "Thomas Jefferson",
        },
        q4: {
            question: "How old do citizens have to be to vote for President?",
            a: "sixteen (16) and older",
            b: "eighteen (18) and older",
            c: "twenty-one (21) and older",
        },
        q5: {
            question: "Name one right only for United States citizens?",
            a: "run for federal office",
            b: "freedom of speech",
            c: "attend public school",
        },
        q6: {
            question: "What does the President's Cabinet do?",
            a: "makes laws",
            b: "commands the U.S. Armed Forces",
            c: "advises the President",
        },
        q7: {
            question: "The House of Representatives has how many voting members?",
            a: "435",
            b: "441",
            c: "200",
        },
        q8: {
            question: "Name one war fought by the United States in the 1900s.",
            a: "Civil War",
            b: "World War I",
            c: "Revolutionary War",
        }
    }

}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name= '" + key + "' value='a'><label>" + question.a + "</label></li>" +
        "<li><input type='radio' name= '" + key + "' value='b'><label>" + question.b + "</label></li>" +
        "<li><input type='radio' name= '" + key + "' value='c'><label>" + question.c + "</label></li>" +
        // "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    /*console.log($("input:radio[name='q0']:checked").val());*/
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
    $("input:radio[name='q1']:checked").val(),
    $("input:radio[name='q2']:checked").val(),
    $("input:radio[name='q3']:checked").val(),
    $("input:radio[name='q4']:checked").val(),
    $("input:radio[name='q5']:checked").val(),
    $("input:radio[name='q6']:checked").val(),
    $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});