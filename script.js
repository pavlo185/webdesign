document.addEventListener("DOMContentLoaded", function() {
    const popupButton = document.getElementById("popupButton");
    const changeStyleButton = document.getElementById("changeStyleButton");

    popupButton.addEventListener("click", function() {
        alert("Це спливаюче вікно!");
    });

    changeStyleButton.addEventListener("click", function() {
        document.body.style.backgroundColor = "#e0f7fa";
        document.querySelector("header").style.backgroundColor = "#00796b";
        document.querySelector("header").style.color = "#fff";
        document.querySelector("header h1").style.fontSize = "3em";
        document.querySelector("header h1").style.textShadow = "2px 2px 4px #000";
        document.querySelectorAll("nav ul li a").forEach(a => {
            a.style.color = "#ffeb3b";
            a.style.fontSize = "1.2em";
        });
        document.querySelector(".content").style.backgroundColor = "#b2dfdb";
        document.querySelector(".content").style.color = "#004d40";
        document.querySelectorAll("table th").forEach(th => {
            th.style.backgroundColor = "#004d40";
            th.style.color = "#ffeb3b";
        });
        document.querySelectorAll("table td").forEach(td => {
            td.style.backgroundColor = "#e0f2f1";
            td.style.color = "#004d40";
        });
        document.querySelector("footer").style.backgroundColor = "#004d40";
        document.querySelector("footer").style.color = "#ffeb3b";
    });

    let gameState = false;
    const body = document.body;
    const secretWord = "Audi";

    document.addEventListener("keydown", function(event) {
        if (event.key === "a" && !gameState) {
            gameState = true;
            let word = prompt("Введіть ваше улюблене авто:");
            if (word.toLowerCase() === secretWord.toLowerCase()) {
                alert("Ви вгадали!");
            } else {
                alert("Спробуйте ще раз.");
            }
            gameState = false;
        }
    });
});

