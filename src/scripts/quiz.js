import showEnd from "./end";
export default class Quiz {
    constructor(category, size = 10) {
        this.question = document.getElementById('question');
        this.choices = Array.from(document.getElementsByClassName('choice-container'));
        this.progressText = document.getElementById('progressText');
        this.scoreText = document.getElementById('score');
        this.progressBarFull = document.getElementById('progressBarFull');
        this.loader = document.getElementById('loader');
        this.quiz = document.getElementById('quiz');
        this.currentQuestion = {};
        this.acceptingAnswers = false;
        this.score = 0;
        this.questionCounter = 0;
        this.availableQuesions = [];
        this.timerEl = document.getElementById('timer');
        this.time = 15;
        this.intervalHandler = null;

        this.questions = [];

        this.CORRECT_BONUS = 10;
        this.MAX_QUESTIONS = size;

        category = category > 0 ? `&category=${category}` : '';

        this.API_URL = `https://opentdb.com/api.php?amount=${size}${category}&type=multiple`;

        this.incrementScore(0);
    }

    start = () => {
        fetch(this.API_URL)
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
                this.startQuiz();
            })
            .catch((err) => {
                console.error(err);
            });
    };


    startQuiz = () => {
        this.questionCounter = 0;
        this.score = 0;
        this.availableQuesions = [...this.questions];
        this.getNewQuestion();
        this.loader.classList.add('hidden');
        this.quiz.classList.remove('hidden');
    };

    getNewQuestion = () => {
        clearInterval(this.intervalHandler);
        this.time = 15;
        this.timerEl.innerHTML = this.time;
        if (this.availableQuesions.length === 0 || this.questionCounter >= this.MAX_QUESTIONS) {
            this.choices.forEach((choice) => {
                let new_element = choice.cloneNode(true);
                choice.parentNode.replaceChild(new_element, choice);
            });
            localStorage.setItem('mostRecentScore', this.score);
            //go to the end page
            this.quiz.classList.add('hidden');
            this.loader.classList.remove('hidden');
            return showEnd(this.loader);
        }

        this.intervalHandler = setInterval(this.checkTimer, 1000);

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

    checkChoice = () => {
        this.choices.forEach((choice) => {
            choice.addEventListener('click', (e) => {
                if (!this.acceptingAnswers) return;

                this.timerEl.classList.remove('blink');
                clearInterval(this.intervalHandler);
                this.time = 15;
                this.timerEl.innerHTML = this.time;

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

    checkTimer = () => {
        if (this.time === 0) {
            setTimeout(() => {
                this.timerEl.classList.remove('blink');
                return this.getNewQuestion();
            }, 1000);
        }
        if (this.time === 5) {
            this.timerEl.classList.add('blink');
        }
        let currentTimer = this.time < 10 ? '0' + this.time : this.time;
        this.timerEl.innerHTML = currentTimer;
        this.time--;
    }
}