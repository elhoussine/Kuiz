import Quiz from './scripts/quiz';
require("./scripts/highscores");
require("./scripts/end");

document.addEventListener("DOMContentLoader", () => {

});

window.addEventListener('load', function () {
    let home = document.getElementById("home");
    home.classList.remove('hidden');
    let game = document.getElementById("game");
    game.classList.add('hidden');
    let highScores = document.getElementById("highScores");
    highScores.classList.add('hidden');
    let end = document.getElementById("end");
    end.classList.add('hidden');
    console.log('loaded');

    const loader = document.getElementById('loader');
    loader.classList.add('hidden');


    const showGame = document.getElementById("show-game");

    showGame.addEventListener('click', () => {
        loader.classList.remove('hidden');
        home.classList.add('hidden');
        game.classList.remove('hidden');
        highScores.classList.add('hidden');
        end.classList.add('hidden');

        const quiz = new Quiz();
        quiz.fetchAPI();
    });
})