(function(){

"use strict";

const games = [
    {
        id:"target",
        title:"Target Tap",
        icon:"🎯",
        desc:"Hit the target!",
        file:"games/target.js"
    },
    {
        id:"catch",
        title:"Catch Ball",
        icon:"⚡",
        desc:"Catch as many as possible.",
        file:"games/catch.js"
    },
    {
        id:"reaction",
        title:"Reaction Test",
        icon:"🧠",
        desc:"Test your reaction speed.",
        file:"games/reaction.js"
    },
    {
        id:"dodge",
        title:"Dodge",
        icon:"🔥",
        desc:"Avoid the enemies.",
        file:"games/dodge.js"
    },
    {
        id:"math",
        title:"Math Rush",
        icon:"➗",
        desc:"Solve quickly.",
        file:"games/math.js"
    },
    {
        id:"guess",
        title:"Guess Number",
        icon:"🔢",
        desc:"Guess the secret number.",
        file:"games/guess.js"
    },
    {
        id:"memory",
        title:"Memory",
        icon:"🃏",
        desc:"Match the cards.",
        file:"games/memory.js"
    },
    {
        id:"tap",
        title:"Tap Fast",
        icon:"👆",
        desc:"Tap as fast as you can.",
        file:"games/tap.js"
    }
];

const splash = document.getElementById("splash");
const app = document.getElementById("app");
const homePage = document.getElementById("homePage");
const gamePage = document.getElementById("gamePage");
const gameGrid = document.getElementById("gameGrid");
const gameArea = document.getElementById("gameArea");
const gameTitle = document.getElementById("gameTitle");
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const backBtn = document.getElementById("backBtn");
const homeNav = document.getElementById("homeNav");
const gamesNav = document.getElementById("gamesNav");

let currentGame = null;
let currentCleanup = null;
const loaded = {};

/* START APP */

function startApp(){

    splash.style.display = "none";
    app.style.display = "block";

    renderGames(games);

}

/* IMPORTANT: NO PAGE RELOAD */

window.addEventListener("load",function(){

    setTimeout(startApp,2200);

});

/* RENDER */

function renderGames(list){

    gameGrid.innerHTML = "";

    if(list.length === 0){

        gameGrid.innerHTML =
            '<div style="grid-column:1/-1;text-align:center;padding:50px;color:#888;">No games found 😔</div>';

        return;
    }

    list.forEach(function(game){

        const card = document.createElement("div");

        card.className = "game-card";

        card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3>${game.title}</h3>
            <p>${game.desc}</p>
        `;

        card.addEventListener("click",function(){

            openGame(game);

        });

        gameGrid.appendChild(card);

    });

}

/* LOAD GAME FILE ONLY WHEN NEEDED */

function loadGame(game,callback){

    if(loaded[game.id]){

        callback();

        return;

    }

    const script = document.createElement("script");

    script.src = game.file;

    script.onload = function(){

        loaded[game.id] = true;
        callback();

    };

    script.onerror = function(){

        gameArea.innerHTML = `
            <div class="game-inner">
                <h2>Game Loading Error</h2>
                <p>Game file नहीं मिल रही है।</p>
                <button class="game-btn" id="returnHome">← Home</button>
            </div>
        `;

        document.getElementById("returnHome").onclick = showHome;

    };

    document.body.appendChild(script);

}

/* OPEN GAME */

function openGame(game){

    if(currentCleanup){

        try{
            currentCleanup();
        }catch(e){}

        currentCleanup = null;

    }

    currentGame = game;

    homePage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    gameTitle.textContent = game.title;

    gameArea.innerHTML = `
        <div class="game-inner">
            <div class="loader" style="margin:80px auto"></div>
        </div>
    `;

    loadGame(game,function(){

        gameArea.innerHTML = "";

        if(window.DNPGames && typeof window.DNPGames[game.id] === "function"){

            currentCleanup = window.DNPGames[game.id](gameArea) || null;

        }else{

            gameArea.innerHTML = `
                <div class="game-inner">
                    <h2>Game Error</h2>
                    <p>Game start नहीं हो पाया.</p>
                </div>
            `;

        }

    });

}

/* HOME */

function showHome(){

    if(currentCleanup){

        try{
            currentCleanup();
        }catch(e){}

        currentCleanup = null;

    }

    currentGame = null;

    gamePage.classList.add("hidden");
    homePage.classList.remove("hidden");

    homeNav.classList.add("active");
    gamesNav.classList.remove("active");

    window.scrollTo(0,0);

}

/* BACK */

backBtn.addEventListener("click",showHome);

/* NAV */

homeNav.addEventListener("click",function(){

    showHome();

});

gamesNav.addEventListener("click",function(){

    showHome();

    setTimeout(function(){

        document.querySelector(".section-title").scrollIntoView({
            behavior:"smooth"
        });

    },50);

});

/* SEARCH */

searchBtn.addEventListener("click",function(){

    searchBox.classList.toggle("show");

    if(searchBox.classList.contains("show")){

        searchInput.focus();

    }else{

        searchInput.value = "";
        renderGames(games);

    }

});

searchInput.addEventListener("input",function(){

    const value = searchInput.value.toLowerCase().trim();

    const filtered = games.filter(function(game){

        return (
            game.title.toLowerCase().includes(value) ||
            game.desc.toLowerCase().includes(value)
        );

    });

    renderGames(filtered);

});

})();