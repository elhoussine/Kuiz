import showHighScores from "./score";
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

        finalScore.innerText = mostRecentScore;

        const scoreFormEl = document.getElementById('score-form');

        if (parseInt(mostRecentScore) === 0) {
            scoreFormEl.classList.add('hidden');
        } else {
            scoreFormEl.classList.remove('hidden');
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
                endDiv.classList.add('hidden');
                loader.classList.remove('hidden');
                showHighScores(loader, document.getElementById("highScores"));
            };
        }
    }, 200);
}