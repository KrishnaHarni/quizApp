const display = document.querySelector(".display");
const scoreDisplay = document.querySelector(".scoreDisplay");
const playAgain = document.querySelector(".playAgain");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
function decodeQuestion(text) {
    var question = new DOMParser().parseFromString(text, 'text/html');
    return question.documentElement.textContent;
}

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then((res) => res.json())
    .then((questions) => {
        const quiz = questions.results;
        console.log(quiz);
// quiz = [
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "The Flag of the European Union has how many stars on it?",
//         "correct_answer": "12",
//         "incorrect_answers": [
//             "10",
//             "14",
//             "16"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "What is the Spanish word for &quot;donkey&quot;?",
//         "correct_answer": "Burro",
//         "incorrect_answers": [
//             "Caballo",
//             "Toro",
//             "Perro"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "Which of the following card games revolves around numbers and basic math?",
//         "correct_answer": "Uno",
//         "incorrect_answers": [
//             "Go Fish",
//             "Twister",
//             "Munchkin"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "Where is the train station &quot;Llanfair&shy;pwllgwyngyll&shy;gogery&shy;chwyrn&shy;drobwll&shy;llan&shy;tysilio&shy;gogo&shy;goch&quot;?",
//         "correct_answer": "Wales",
//         "incorrect_answers": [
//             "Moldova",
//             "Czech Republic",
//             "Denmark"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "Virgin Trains, Virgin Atlantic and Virgin Racing, are all companies owned by which famous entrepreneur?   ",
//         "correct_answer": "Richard Branson",
//         "incorrect_answers": [
//             "Alan Sugar",
//             "Donald Trump",
//             "Bill Gates"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "In which fast food chain can you order a Jamocha Shake?",
//         "correct_answer": "Arby&#039;s",
//         "incorrect_answers": [
//             "McDonald&#039;s",
//             "Burger King",
//             "Wendy&#039;s"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "Which company did Valve cooperate with in the creation of the Vive?",
//         "correct_answer": "HTC",
//         "incorrect_answers": [
//             "Oculus",
//             "Google",
//             "Razer"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "Red Vines is a brand of what type of candy?",
//         "correct_answer": "Licorice",
//         "incorrect_answers": [
//             "Lollipop",
//             "Chocolate",
//             "Bubblegum"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "The &ldquo;fairy&rdquo; type made it&rsquo;s debut in which generation of the Pokemon core series games?",
//         "correct_answer": "6th",
//         "incorrect_answers": [
//             "2nd",
//             "7th",
//             "4th"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "General Knowledge",
//         "question": "What company developed the vocaloid Hatsune Miku?",
//         "correct_answer": "Crypton Future Media",
//         "incorrect_answers": [
//             "Sega",
//             "Sony",
//             "Yamaha Corporation"
//         ]
//     }
// ]
let currIndex = -1;
selectedAnswer = [];
finalAnswer = [];
var submit = false;
for (let x = 0; x < quiz.length; x++) {
    finalAnswer.push(decodeQuestion(quiz[x].correct_answer));
}
next.addEventListener('click', function () {
    savedOptions();
    currIndex = (currIndex + 1) % quiz.length;
    displayQuestion();
})

prev.addEventListener('click', function () {
    savedOptions();
    currIndex = currIndex === 0 ? quiz.length - 1 : currIndex - 1;
    displayQuestion();
})

function displayQuestion() {
    let options = [...quiz[currIndex].incorrect_answers, quiz[currIndex].correct_answer];
    for (let i = options.length - 1; i >= 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [options[i], options[randomNumber]] = [options[randomNumber], options[i]];
    }
    display.innerHTML = `<h1 class="pb-2 text-[#0C1844] font-bold">${decodeQuestion(quiz[currIndex].question)}</h1>`;
    options.forEach((option,index) => {
        display.innerHTML += `<input type="radio" id="q${currIndex}_${index}" class="h-5 w-5 mt-4 accent-[#0C1844]" name="q${currIndex}" value="${decodeQuestion(option)}" ${selectedAnswer[currIndex] === option ? "checked" : ""}>
                              <label for="q${currIndex}_${index}">${decodeQuestion(option)}</label><br>`;
    });

    if (submit) {
        let ans = finalAnswer[currIndex];
        let userAns = document.querySelector(`input[name="q${currIndex}"]:checked`);
        if (userAns) {
            let label = document.querySelector(`label[for="${userAns.id}"]`);
            if (ans === userAns.value) {
                label.style.backgroundColor = "#39e75f";
            }
            else {
                label.style.backgroundColor = "crimson";
                for(let x=0;x<4;x++)
                    {
                        let inputField = document.querySelector(`input[id="q${currIndex}_${x}"]`);
                        let labelField = document.querySelector(`label[for="${inputField.id}"]`);
                        if(inputField.value === ans)
                        {
                            labelField.style.backgroundColor = "#39e75f";
                        }
                    }
            }
        }
        else{
            for(let x=0;x<4;x++)
            {
                let inputField = document.querySelector(`input[id="q${currIndex}_${x}"]`);
                let labelField = document.querySelector(`label[for="${inputField.id}"]`);
                if(inputField.value === ans)
                {
                    labelField.style.backgroundColor = "#39e75f";
                }
            }
        }
    }
    console.log(selectedAnswer);
}

function savedOptions() {
    let selectedOption = document.querySelector(`input[name="q${currIndex}"]:checked`);
    if (selectedOption) {
        selectedAnswer[currIndex] = selectedOption.value;
    }
}

document.querySelector(".checkBtn").addEventListener('click', function () {
    submit = true;
    let score = 0;
    selectedAnswer.forEach((answer, index) => {
        if (answer === decodeQuestion(quiz[index].correct_answer)) {
            score++;
        }
    });
    scoreDisplay.textContent = "You scored: " + score + " out of " + quiz.length;
    playAgain.classList.remove("hidden");
});

document.querySelector(".playAgain").addEventListener('click', function () {
    location.reload();
})
});



