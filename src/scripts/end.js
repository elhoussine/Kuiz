import showHighScores from "./highscores";
export default function showEnd(loader) {
    setTimeout(() => {
        loader.classList.add('hidden');
        const endDiv = document.getElementById("end");
        endDiv.classList.remove('hidden');

        const username = document.getElementById('username');
        const saveScoreBtn = document.getElementById('saveScoreBtn');
        const finalScore = document.getElementById('finalScore');
        const mostRecentScore = localStorage.getItem('mostRecentScore');

        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

        const MAX_HIGH_SCORES = 5;

        finalScore.innerText = mostRecentScore;

        username.addEventListener('keyup', () => {
            saveScoreBtn.disabled = !username.value;
        });

        saveScoreBtn.addEventListener('click', (e) => {
            saveHighScore(e);
        });

        const saveHighScore = (e) => {
            e.preventDefault();

            const score = {
                score: mostRecentScore,
                name: username.value,
            };
            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score);
            highScores.splice(5);

            localStorage.setItem('highScores', JSON.stringify(highScores));
            //window.location.assign('/');
            endDiv.classList.add('hidden');
            loader.classList.remove('hidden');
            showHighScores(loader, document.getElementById("highScores"));
        };
    }, 200);
}