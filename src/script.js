const display = document.querySelector(".display");
const scoreDisplay = document.querySelector(".scoreDisplay");
const playAgain = document.querySelector(".playAgain");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
function decodeQuestion(text) {
  var question = new DOMParser().parseFromString(text, "text/html");
  return question.documentElement.textContent;
}

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => res.json())
  .then((questions) => {
    const quiz = questions.results;

    let currIndex = -1;
    selectedAnswer = [];
    finalAnswer = [];
    var submit = false;
    for (let x = 0; x < quiz.length; x++) {
      finalAnswer.push(decodeQuestion(quiz[x].correct_answer));
    }
    next.addEventListener("click", function () {
      savedOptions();
      currIndex = (currIndex + 1) % quiz.length;
      displayQuestion();
    });

    prev.addEventListener("click", function () {
      savedOptions();
      currIndex = currIndex === 0 ? quiz.length - 1 : currIndex - 1;
      displayQuestion();
    });

    function displayQuestion() {
      let options = [
        ...quiz[currIndex].incorrect_answers,
        quiz[currIndex].correct_answer,
      ];
      for (let i = options.length - 1; i >= 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [options[i], options[randomNumber]] = [
          options[randomNumber],
          options[i],
        ];
      }
      display.innerHTML = `<h1 class="pb-2 text-[#0C1844] font-bold">${decodeQuestion(
        quiz[currIndex].question
      )}</h1>`;
      options.forEach((option, index) => {
        display.innerHTML += `<input type="radio" id="q${currIndex}_${index}" class="h-5 w-5 mt-4 accent-[#0C1844]" name="q${currIndex}" value="${decodeQuestion(
          option
        )}" ${selectedAnswer[currIndex] === option ? "checked" : ""}>
                              <label for="q${currIndex}_${index}">${decodeQuestion(
          option
        )}</label><br>`;
      });

      if (submit) {
        let ans = finalAnswer[currIndex];
        let userAns = document.querySelector(
          `input[name="q${currIndex}"]:checked`
        );
        if (userAns) {
          let label = document.querySelector(`label[for="${userAns.id}"]`);
          if (ans === userAns.value) {
            label.style.backgroundColor = "#39e75f";
          } else {
            label.style.backgroundColor = "crimson";
            for (let x = 0; x < 4; x++) {
              let inputField = document.querySelector(
                `input[id="q${currIndex}_${x}"]`
              );
              let labelField = document.querySelector(
                `label[for="${inputField.id}"]`
              );
              if (inputField.value === ans) {
                labelField.style.backgroundColor = "#39e75f";
              }
            }
          }
        } else {
          for (let x = 0; x < 4; x++) {
            let inputField = document.querySelector(
              `input[id="q${currIndex}_${x}"]`
            );
            let labelField = document.querySelector(
              `label[for="${inputField.id}"]`
            );
            if (inputField.value === ans) {
              labelField.style.backgroundColor = "#39e75f";
            }
          }
        }
      }
    }

    function savedOptions() {
      let selectedOption = document.querySelector(
        `input[name="q${currIndex}"]:checked`
      );
      if (selectedOption) {
        selectedAnswer[currIndex] = selectedOption.value;
      }
    }

    document.querySelector(".checkBtn").addEventListener("click", function () {
      submit = true;
      let score = 0;
      selectedAnswer.forEach((answer, index) => {
        if (answer === decodeQuestion(quiz[index].correct_answer)) {
          score++;
        }
      });
      scoreDisplay.textContent =
        "You scored: " + score + " out of " + quiz.length;
      playAgain.classList.remove("hidden");
    });

    document.querySelector(".playAgain").addEventListener("click", function () {
      location.reload();
    });
  });
