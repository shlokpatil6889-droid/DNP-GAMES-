window.DNPGames = window.DNPGames || {};

window.DNPGames.catch = function(area){

    let score = 0;
    let time = 30;
    let timer = null;
    let spawnTimer = null;

    area.innerHTML = `
        <div class="game-inner">
            <h2>⚡ Catch Ball</h2>
            <p>Ball को tap करके score बढ़ाओ!</p>

            <div class="score">
                Score: <span id="cs">0</span>
                &nbsp; | &nbsp;
                Time: <span id="ct">30</span>
            </div>

            <div class="game-canvas" id="catchCanvas"></div>
        </div>
    `;

    const canvas = area.querySelector("#catchCanvas");
    const scoreEl = area.querySelector("#cs");
    const timeEl = area.querySelector("#ct");

    function spawn(){

        const ball = document.createElement("div");

        ball.className = "catch-ball";

        ball.style.left =
            Math.random()*(canvas.clientWidth-60) + "px";

        ball.style.top =
            Math.random()*(canvas.clientHeight-60) + "px";

        ball.onclick = function(e){

            e.stopPropagation();

            score++;
            scoreEl.textContent = score;

            ball.remove();

        };

        canvas.appendChild(ball);

        setTimeout(function(){

            if(ball.parentNode) ball.remove();

        },900);

    }

    spawnTimer = setInterval(spawn,700);

    timer = setInterval(function(){

        time--;

        timeEl.textContent = time;

        if(time <= 0){

            clearInterval(timer);
            clearInterval(spawnTimer);

            canvas.innerHTML = `
                <div class="game-inner" style="padding-top:130px">
                    <h2>Finished!</h2>
                    <p>Your Score: ${score}</p>
                    <button class="game-btn" id="againCatch">Play Again</button>
                </div>
            `;

            canvas.querySelector("#againCatch").onclick = function(){

                window.DNPGames.catch(area);

            };

        }

    },1000);

    return function(){

        clearInterval(timer);
        clearInterval(spawnTimer);

    };

};