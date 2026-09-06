window.DNPGames = window.DNPGames || {};

window.DNPGames.math = function(area){

    let question = 0;
    let score = 0;

    area.innerHTML = `
        <div class="game-inner">
            <h2>➗ Math Rush</h2>
            <p>10 questions solve करो.</p>

            <div class="score">
                Question: <span id="mq">1</span>/10
                &nbsp; | &nbsp;
                Score: <span id="ms">0</span>
            </div>

            <div class="question" id="question"></div>

            <div class="answers" id="answers"></div>
        </div>
    `;

    const qEl = area.querySelector("#question");
    const answers = area.querySelector("#answers");
    const qNo = area.querySelector("#mq");
    const scoreEl = area.querySelector("#ms");

    let correct = 0;

    function next(){

        if(question >= 10){

            area.innerHTML = `
                <div class="game-inner" style="padding-top:130px">
                    <h2>🎉 Finished!</h2>
                    <p>Your Score: ${correct}/10</p>
                    <button class="game-btn" id="mathAgain">
                        Play Again
                    </button>
                </div>
            `;

            area.querySelector("#mathAgain").onclick =
                function(){

                    window.DNPGames.math(area);

                };

            return;

        }

        question++;

        qNo.textContent = question;

        const a = Math.floor(Math.random()*20)+1;
        const b = Math.floor(Math.random()*20)+1;

        const operations = ["+","-","×"];

        const op =
            operations[Math.floor(Math.random()*operations.length)];

        let answer;

        if(op === "+") answer = a+b;
        if(op === "-") answer = a-b;
        if(op === "×") answer = a*b;

        qEl.textContent = `${a} ${op} ${b} = ?`;

        let options = [
            answer,
            answer + Math.floor(Math.random()*10)+1,
            answer - Math.floor(Math.random()*10)-1,
            answer + 10
        ];

        options.sort(() => Math.random()-.5);

        answers.innerHTML = "";

        options.forEach(function(value){

            const btn = document.createElement("button");

            btn.className = "answer";

            btn.textContent = value;

            btn.onclick = function(){

                if(Number(value) === answer){

                    correct++;

                    scoreEl.textContent = correct;

                }

                next();

            };

            answers.appendChild(btn);

        });

    }

    next();

    return function(){};

};