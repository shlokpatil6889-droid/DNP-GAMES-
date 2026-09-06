window.DNPGames = window.DNPGames || {};

window.DNPGames.target = function(area){

    let score = 0;
    let time = 30;
    let timer = null;

    area.innerHTML = `
        <div class="game-inner">
            <h2>🎯 Target Tap</h2>
            <p>30 seconds में जितने target हो सके hit करो!</p>

            <div class="score">
                Score: <span id="ts">0</span>
                &nbsp; | &nbsp;
                Time: <span id="tt">30</span>
            </div>

            <div class="game-canvas" id="targetCanvas"></div>
        </div>
    `;

    const canvas = area.querySelector("#targetCanvas");
    const scoreEl = area.querySelector("#ts");
    const timeEl = area.querySelector("#tt");

    function spawn(){

        const target = document.createElement("div");

        target.className = "target";

        const maxX = Math.max(0,canvas.clientWidth - 65);
        const maxY = Math.max(0,canvas.clientHeight - 65);

        target.style.left = Math.random()*maxX + "px";
        target.style.top = Math.random()*maxY + "px";

        target.onclick = function(e){

            e.stopPropagation();

            score++;
            scoreEl.textContent = score;

            target.remove();

            spawn();

        };

        canvas.appendChild(target);

    }

    spawn();

    timer = setInterval(function(){

        time--;

        timeEl.textContent = time;

        if(time <= 0){

            clearInterval(timer);

            canvas.innerHTML = `
                <div class="game-inner" style="padding-top:130px">
                    <h2>Time Up!</h2>
                    <p>Your Score: ${score}</p>
                    <button class="game-btn" id="restartTarget">Play Again</button>
                </div>
            `;

            canvas.querySelector("#restartTarget").onclick = function(){

                window.DNPGames.target(area);

            };

        }

    },1000);

    return function(){

        clearInterval(timer);

    };

};