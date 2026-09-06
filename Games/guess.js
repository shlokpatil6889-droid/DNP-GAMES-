window.DNPGames = window.DNPGames || {};

window.DNPGames.guess = function(area){

    let secret = Math.floor(Math.random()*100)+1;
    let attempts = 0;

    area.innerHTML = `
        <div class="game-inner">
            <h2>🔢 Guess Number</h2>
            <p>1 से 100 के बीच number guess करो.</p>

            <input
                id="guessInput"
                class="guess-input"
                type="number"
                min="1"
                max="100"
                placeholder="Enter number"
            >

            <button class="game-btn" id="guessBtn">
                Guess
            </button>

            <div class="score" id="guessResult">
                Good luck! 🎯
            </div>
        </div>
    `;

    const input = area.querySelector("#guessInput");
    const btn = area.querySelector("#guessBtn");
    const result = area.querySelector("#guessResult");

    btn.onclick = function(){

        const value = Number(input.value);

        if(!value || value < 1 || value > 100){

            result.textContent = "1 से 100 के बीच number डालो.";

            return;

        }

        attempts++;

        if(value === secret){

            result.innerHTML = `
                🎉 Correct!<br>
                ${attempts} attempts लगे.
                <br><br>
                <button class="game-btn" id="guessAgain">
                    Play Again
                </button>
            `;

            btn.disabled = true;

            area.querySelector("#guessAgain").onclick =
                function(){

                    window.DNPGames.guess(area);

                };

        }else if(value < secret){

            result.textContent = "⬆️ थोड़ा बड़ा number.";

        }else{

            result.textContent = "⬇️ थोड़ा छोटा number.";

        }

        input.value = "";

    };

    input.addEventListener("keydown",function(e){

        if(e.key === "Enter"){

            btn.click();

        }

    });

    return function(){};

};