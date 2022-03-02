import Quiz from "./scripts/quiz";
import showHighScores from "./scripts/score";

document.addEventListener("DOMContentLoader", () => {

});

const API_URL = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple';

window.addEventListener('load', function () {

    let home = document.getElementById("home");
    home.classList.remove('hidden');

    let game = document.getElementById("game");
    game.classList.add('hidden');

    let highScores = document.getElementById("highScores");
    highScores.classList.add('hidden');

    let end = document.getElementById("end");
    end.classList.add('hidden');

    const loader = document.getElementById('loader');
    loader.classList.add('hidden');

    const highScoresBtn = document.getElementById("show-highscores");

    document.querySelectorAll('.play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.remove('hidden');
            home.classList.add('hidden');
            highScores.classList.add('hidden');
            end.classList.add('hidden');

            const quiz = new Quiz();
            quiz.fetchAPI(API_URL);
        });
    });

    highScoresBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loader.classList.remove('hidden');
        home.classList.add('hidden');
        game.classList.add('hidden');
        end.classList.add('hidden');
        showHighScores(loader, highScores);
    });

    document.querySelectorAll('.go-home').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loader.classList.add('hidden');
            game.classList.add('hidden');
            highScores.classList.add('hidden');
            end.classList.add('hidden');
            home.classList.remove('hidden');
        });
    });
})