const knightarr = [];

knightarr.push(document.getElementById("b1"));
knightarr.push(document.getElementById("g1"));
knightarr.push(document.getElementById("b8"));
knightarr.push(document.getElementById("g8"));

for (const i of knightarr) {
    i.addEventListener('click', () => handleKnightClick(i));
}

function handleKnightClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll(".circle").forEach(c => c.remove());
    document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

    const currid = square.getAttribute("id");
    const file = currid[0];
    const rank = parseInt(currid[1]);
    const knightColor = square.querySelector("img").getAttribute("data-color");

    const moves = [
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];

    const steps = [];
    moves.forEach(move => {
        const newfile = filearr.indexOf(file) + move[0];
        const newrank = rank + move[1];

        if (newrank >= 1 && newrank <= 8 && newfile >= 0 && newfile < 8) {
            const targetsq = document.getElementById(filearr[newfile] + newrank);
            if (!targetsq) return;
            const targetimg = targetsq.querySelector("img");

            if (!targetimg) {
                steps.push(targetsq);
            } else if (targetimg.getAttribute("data-color") !== knightColor) {
                targetsq.setAttribute("data-enemy", "true");
                steps.push(targetsq);
            }
        }
    });

    lightknight(steps, square);
}

function lightknight(steps, knight) {
    steps.forEach(j => {
        const circle = document.createElement("div");
        circle.setAttribute("class", j.getAttribute("data-enemy") === "true" ? "circle enemy" : "circle");
        j.appendChild(circle);

        circle.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".circle").forEach(c => c.remove());
            document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

            const img = knight.querySelector("img");
            if (!img) return;

            const enemyimg = j.querySelector("img");
            if (enemyimg) enemyimg.remove();

            j.appendChild(img);

            j.addEventListener("click", () => handleKnightClick(j));

            switchTurn();

        }, { once: true });
    });
}