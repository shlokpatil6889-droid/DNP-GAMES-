window.DNPGames = window.DNPGames || {};

window.DNPGames.reaction = function(area){

    let startTime = 0;
    let timeout = null;
    let finished = false;

    area.innerHTML = `
        <div class="game-inner">
            <h2>🧠 Reaction Test</h2>
            <p>Green होने पर तुरंत tap करो!</p>

            <div class="reaction-box" id="reactionBox">
                TAP TO START
            </div>

            <div class="score" id="reactionScore"></div>
        </div>
    `;

    const box = area.querySelector("#reactionBox");
    const score = area.querySelector("#reactionScore");

    box.onclick = function(){

        if(finished) return;

        if(box.dataset.waiting === "yes"){

            score.textContent = "Too Early! 😅";
            box.dataset.waiting = "no";
            box.style.background = "#25253a";
            box.textContent = "TAP TO TRY AGAIN";

            return;

        }

        box.dataset.waiting = "yes";
        box.textContent = "WAIT...";
        box.style.background = "#6b2538";

        timeout = setTimeout(function(){

            startTime = performance.now();

            box.dataset.waiting = "no";
            box.dataset.ready = "yes";
            box.textContent = "TAP NOW!";
            box.style.background = "#26734a";

        },1000 + Math.random()*2500);

    };

    box.addEventListener("click",function(){

        if(box.dataset.ready === "yes"){

            const reaction = Math.round(performance.now()-startTime);

            box.dataset.ready = "no";
            finished = true;

            box.style.background = "#25253a";
            box.textContent = reaction + " ms";

            score.innerHTML = `
                <button class="game-btn" id="reactionAgain">
                    Try Again
                </button>
            `;

            score.querySelector("#reactionAgain").onclick = function(){

                window.DNPGames.reaction(area);

            };

        }

    });

    return function(){

        clearTimeout(timeout);

    };

};