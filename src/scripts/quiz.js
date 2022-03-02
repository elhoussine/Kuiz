import showEnd from "./end";
export default class Quiz {
    constructor() {
        this.question = document.getElementById('question');
        this.choices = Array.from(document.getElementsByClassName('choice-container'));
        this.progressText = document.getElementById('progressText');
        this.scoreText = document.getElementById('score');
        this.progressBarFull = document.getElementById('progressBarFull');
        this.loader = document.getElementById('loader');
        this.game = document.getElementById('game');
        this.currentQuestion = {};
        this.acceptingAnswers = false;
        this.score = 0;
        this.questionCounter = 0;
        this.availableQuesions = [];

        this.questions = [];

        this.CORRECT_BONUS = 10;
        this.MAX_QUESTIONS = 0;
    }

    fetchAPI = (url) => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((loadedQuestions) => {
                this.questions = loadedQuestions.results.map((loadedQuestion) => {
                    const formattedQuestion = {
                        question: loadedQuestion.question,
                    };

                    const answerChoices = [...loadedQuestion.incorrect_answers];
                    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                    answerChoices.splice(
                        formattedQuestion.answer - 1,
                        0,
                        loadedQuestion.correct_answer
                    );

                    answerChoices.forEach((choice, index) => {
                        formattedQuestion['choice' + (index + 1)] = choice;
                    });

                    return formattedQuestion;
                });

                this.MAX_QUESTIONS = this.questions.length;

                this.startGame();
            })
            .catch((err) => {
                console.error(err);
            });
    };


    startGame = () => {
        this.questionCounter = 0;
        this.score = 0;
        this.availableQuesions = [...this.questions];
        this.getNewQuestion();
        this.loader.classList.add('hidden');
        this.game.classList.remove('hidden');
    };

    getNewQuestion = () => {
        if (this.availableQuesions.length === 0 || this.questionCounter >= this.MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', this.score);
            console.log(localStorage.getItem('mostRecentScore'));
            //go to the end page
            //return window.location.assign('/end.html');
            this.game.classList.add('hidden');
            this.loader.classList.remove('hidden');
            showEnd(this.loader);
            return;
        }
        this.questionCounter++;
        this.progressText.innerText = `Question ${this.questionCounter}/${this.MAX_QUESTIONS}`;
        //Update the progress bar
        this.progressBarFull.style.width = `${(this.questionCounter / this.MAX_QUESTIONS) * 100}%`;

        const questionIndex = Math.floor(Math.random() * this.availableQuesions.length);
        this.currentQuestion = this.availableQuesions[questionIndex];
        this.question.innerHTML = this.currentQuestion.question;

        this.choices.forEach((choice) => {
            choice = choice.querySelector('.choice-text');
            const number = choice.dataset['number'];
            choice.innerHTML = this.currentQuestion['choice' + number];
        });

        this.availableQuesions.splice(questionIndex, 1);
        this.acceptingAnswers = true;

        this.checkChoice();
    };

    checkChoice() {
        this.choices.forEach((choice) => {
            choice.addEventListener('click', (e) => {
                if (!this.acceptingAnswers) return;

                this.acceptingAnswers = false;
                const selectedChoice = e.target.parentElement.querySelector('.choice-text');
                const selectedAnswer = selectedChoice.dataset['number'];

                const classToApply =
                    selectedAnswer == this.currentQuestion.answer ? 'correct' : 'incorrect';
                const correctChoice = document.querySelector('.choice-text[data-number="' + this.currentQuestion.answer + '"]')
                if (classToApply === 'correct') {
                    this.incrementScore(this.CORRECT_BONUS);
                } else {
                    setTimeout(() => {
                        correctChoice.parentElement.classList.add('correct');
                    }, 200);
                }

                selectedChoice.parentElement.classList.add(classToApply);

                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply);
                    correctChoice.parentElement.classList.remove('correct');
                    this.getNewQuestion();
                }, 1500);
            });
        });
    }

    incrementScore = (num) => {
        this.score += num;
        this.scoreText.innerText = this.score;
    };

    // showHighScores = (loader) => {
    //     loader.classList.remove('hidden');
    //     const highScoresList = document.getElementById("highScoresList");
    //     const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    //     highScoresList.innerHTML = highScores
    //         .map(score => {
    //             return `<li class="high-score">${score.name} - ${score.score}</li>`;
    //         })
    //         .join("");
    // }
}