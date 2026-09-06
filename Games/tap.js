window.DNPGames = window.DNPGames || {};

window.DNPGames.tap = function(area){

    let taps = 0;
    let time = 10;
    let started = false;
    let timer = null;

    area.innerHTML = `
        <div class="game-inner">
            <h2>👆 Tap Fast</h2>
            <p>10 seconds में जितना fast tap कर सकते हो करो!</p>

            <div class="score">
                Taps: <span id="tapScore">0</span>
                &nbsp; | &nbsp;
                Time: <span id="tapTime">10</span>
            </div>

            <div class="tap-zone" id="tapZone">
                TAP!
            </div>
        </div>
    `;

    const zone = area.querySelector("#tapZone");
    const score = area.querySelector("#tapScore");
    const timeEl = area.querySelector("#tapTime");

    zone.addEventListener("pointerdown",function(){

        if(!started){

            started = true;

            timer = setInterval(function(){

                time--;

                timeEl.textContent = time;

                if(time <= 0){

                    clearInterval(timer);

                    zone.style.pointerEvents = "none";

                    zone.innerHTML = `
                        <div>
                            <div>🔥 ${taps} TAPS</div>
                            <br>
                            <button class="game-btn" id="tapAgain">
                                Play Again
                            </button>
                        </div>
                    `;

                    zone.querySelector("#tapAgain").onclick =
                        function(){

                            window.DNPGames.tap(area);

                        };

                }

            },1000);

        }

        if(time > 0){

            taps++;

            score.textContent = taps;

        }

    });

    return function(){

        clearInterval(timer);

    };

};