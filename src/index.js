import Quiz from "./scripts/quiz";
import showHighScores from "./scripts/score";

window.addEventListener('load', function () {

    const home = document.getElementById("home");
    const quiz = document.getElementById("quiz");
    const highScores = document.getElementById("highScores");
    const end = document.getElementById("end");
    const loader = document.getElementById('loader');
    const highScoresBtn = document.getElementById("show-highscores");
    const sizeElement = document.getElementById('select-size');
    const category = document.getElementById('category');
    let categoryValue = 0;

    document.querySelectorAll('.start').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.size[data-size="50"]').classList.remove('hidden');
            document.querySelector('.size[data-size="30"]').classList.remove('hidden');
            home.classList.add('hidden');
            end.classList.add('hidden');
            quiz.classList.add('hidden');
            category.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.category').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            category.classList.add('hidden');
            categoryValue = parseInt(e.target.dataset['value']);
            if (categoryValue === 19 || categoryValue === 24 || categoryValue === 26) {
                document.querySelector('.size[data-size="50"]').classList.add('hidden');
            }
            if (categoryValue === 25) {
                document.querySelector('.size[data-size="50"]').classList.add('hidden');
                document.querySelector('.size[data-size="30"]').classList.add('hidden');
            }
            sizeElement.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.size').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.remove('hidden');
            sizeElement.classList.add('hidden');
            const questionsSize = e.target.dataset['size'];
            const quiz = new Quiz(categoryValue, questionsSize);
            quiz.start();
        });
    });

    highScoresBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loader.classList.remove('hidden');
        home.classList.add('hidden');
        quiz.classList.add('hidden');
        end.classList.add('hidden');
        showHighScores(loader, highScores);
    });

    document.querySelectorAll('.go-home').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.add('hidden');
            quiz.classList.add('hidden');
            highScores.classList.add('hidden');
            end.classList.add('hidden');
            home.classList.remove('hidden');
        });
    });
})