const questions = [
  {
    question:
      "Who used a Time-Turner to get to all their classes in their third year at Hogwarts?",
    answers: [
      { text: "Ron Weasley", correct: false },
      { text: "Harry Potter", correct: false },
      { text: "Hannah Abbott", correct: false },
      { text: "Hermione Granger", correct: true },
    ],
  },

  {
    question: "Where were the Time-Turners kept at the Ministry of Magic?",
    answers: [
      {
        text: "Department of International Magical Co-operation",
        correct: false,
      },
      { text: "Department of Mysteries", correct: true },
      { text: "Department of Magical Law Enforcement", correct: false },
      {
        text: "Department of Magical Accidents and Catastrophes",
        correct: false,
      },
    ],
  },
  {
    question: "What were the names of Draco's parents?",
    answers: [
      { text: "Alecto and Walden", correct: false },
      { text: "Bellatrix and Theodore", correct: false },
      { text: "Narcissa and Lucius", correct: true },
      { text: "Andromeda and Antonin", correct: false },
    ],
  },

  {
    question: "Which position did Draco play on the Slytherin Quidditch team?",
    answers: [
      { text: "Seeker", correct: true },
      { text: "Beater", correct: false },
      { text: "Keeper", correct: false },
      { text: "Chaser", correct: false },
    ],
  },

  {
    question: "Bubotubers... They need squeezing. You will collect the pus.",
    answers: [
      { text: "Firenze", correct: false },
      { text: "Hagrid", correct: false },
      { text: "Professor Grubbly-Plank", correct: false },
      { text: "Professor Sprout", correct: true },
    ],
  },
  {
    question:
      "Before we begin our banquet, I would like to say a few words. And they are: Nitwit! Blubber! Oddment! Tweak!",
    answers: [
      { text: "Professor Lockhart", correct: false },
      { text: "Professor Dumbledore", correct: true },
      { text: "Professor Umbridge", correct: false },
      { text: "Professor McGonagall ", correct: false },
    ],
  },

  {
    question:
      "Who was the first witch to reject Ron when he asked her to the Yule Ball?",
    answers: [
      { text: "Luna Lovegood", correct: false },
      { text: "Lavender Brown", correct: false },
      { text: "Fleur Delacour", correct: true },
      { text: "Hermione Granger", correct: false },
    ],
  },

  {
    question:
      "Hermione spent the majority of the Slug Club Christmas party trying to hide from her date, who was she avoiding?",
    answers: [
      { text: "Ron Weasley", correct: false },
      { text: "Cormac McLaggen", correct: true },
      { text: "Justin Finch-Fletchley", correct: false },
      { text: "Neville Longbottom", correct: false },
    ],
  },

  {
    question:
      "And in the Philosopher's Stone film, what colour was the jumper?",
    answers: [
      { text: "Scarlet", correct: false },
      { text: "Emerald green", correct: false },
      { text: "Navy", correct: true },
      { text: "Lilac", correct: false },
    ],
  },

  {
    question:
      "In the Philosopher's Stone book, what colour was the first Weasley jumper that Harry wa given?",
    answers: [
      { text: "Emerald green", correct: true },
      { text: "Scarlet", correct: false },
      { text: "Grey", correct: false },
      { text: "Navy", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currenntQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currenntQuestion.question;

  currenntQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
