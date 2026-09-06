window.DNPGames = window.DNPGames || {};

window.DNPGames.dodge = function(area){

    let running = true;
    let score = 0;
    let enemies = [];
    let animation = null;
    let playerX = 50;

    area.innerHTML = `
        <div class="game-inner">
            <h2>🔥 Dodge</h2>
            <p>Screen पर drag करके enemy से बचो!</p>

            <div class="score">
                Score: <span id="ds">0</span>
            </div>

            <div class="game-canvas" id="dodgeCanvas">
                <div class="dodge-player" id="player"></div>
            </div>
        </div>
    `;

    const canvas = area.querySelector("#dodgeCanvas");
    const player = area.querySelector("#player");
    const scoreEl = area.querySelector("#ds");

    function move(e){

        const rect = canvas.getBoundingClientRect();

        let x;

        if(e.touches){

            x = e.touches[0].clientX - rect.left;

        }else{

            x = e.clientX - rect.left;

        }

        playerX = Math.max(
            5,
            Math.min(95,(x/rect.width)*100)
        );

        player.style.left = playerX + "%";

    }

    canvas.addEventListener("touchmove",move,{passive:true});
    canvas.addEventListener("mousemove",move);

    function createEnemy(){

        if(!running) return;

        const enemy = document.createElement("div");

        enemy.className = "enemy";

        enemy.style.left =
            Math.random()*(canvas.clientWidth-40) + "px";

        enemy.style.top = "-40px";

        canvas.appendChild(enemy);

        enemies.push({
            el:enemy,
            y:-40
        });

    }

    const spawn = setInterval(createEnemy,650);

    function loop(){

        if(!running) return;

        const p = player.getBoundingClientRect();

        enemies.forEach(function(obj,index){

            obj.y += 4;

            obj.el.style.top = obj.y + "px";

            const e = obj.el.getBoundingClientRect();

            const hit =
                p.left < e.right &&
                p.right > e.left &&
                p.top < e.bottom &&
                p.bottom > e.top;

            if(hit){

                running = false;

                clearInterval(spawn);

                enemies.forEach(x => x.el.remove());

                canvas.innerHTML = `
                    <div class="game-inner" style="padding-top:130px">
                        <h2>💥 Game Over</h2>
                        <p>Your Score: ${score}</p>
                        <button class="game-btn" id="againDodge">
                            Play Again
                        </button>
                    </div>
                `;

                canvas.querySelector("#againDodge").onclick =
                    function(){

                        window.DNPGames.dodge(area);

                    };

            }

            if(obj.y > canvas.clientHeight){

                obj.el.remove();

                enemies.splice(index,1);

                score++;

                scoreEl.textContent = score;

            }

        });

        animation = requestAnimationFrame(loop);

    }

    animation = requestAnimationFrame(loop);

    return function(){

        running = false;

        clearInterval(spawn);

        cancelAnimationFrame(animation);

        canvas.removeEventListener("touchmove",move);

        canvas.removeEventListener("mousemove",move);

    };

};