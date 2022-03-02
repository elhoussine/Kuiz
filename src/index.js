import Quiz from "./scripts/quiz";
import showHighScores from "./scripts/score";

document.addEventListener("DOMContentLoader", () => {

});

window.addEventListener('load', function () {

    const home = document.getElementById("home");
    //home.classList.remove('hidden');

    const quiz = document.getElementById("quiz");
    //quiz.classList.add('hidden');

    const highScores = document.getElementById("highScores");
    //highScores.classList.add('hidden');

    const end = document.getElementById("end");
    //end.classList.add('hidden');

    const loader = document.getElementById('loader');
    //loader.classList.add('hidden');

    const highScoresBtn = document.getElementById("show-highscores");

    const sizeElement = document.getElementById('select-size');

    document.querySelectorAll('.start').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            home.classList.add('hidden');
            end.classList.add('hidden');
            sizeElement.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.size').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.remove('hidden');
            sizeElement.classList.add('hidden');
            const size = e.target.dataset['size'];
            const quiz = new Quiz(size, sizeElement);
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