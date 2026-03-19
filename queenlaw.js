const queenarr = [];

queenarr.push(document.getElementById("d1"));
queenarr.push(document.getElementById("d8"));

for (const i of queenarr) {
    i.addEventListener('click', () => handleQueenClick(i));
}

function handleQueenClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll(".circle").forEach(c => c.remove());
    document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

    const currid = square.getAttribute("id");
    const file = currid[0];
    const rank = parseInt(currid[1]);
    const queenColor = square.querySelector("img").getAttribute("data-color");
    const fileIndex = filearr.indexOf(file);
    const steps = [];

    // up
    for (let r = rank + 1; r <= 8; r++) {
        const sq = document.getElementById(file + r);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // down
    for (let r = rank - 1; r >= 1; r--) {
        const sq = document.getElementById(file + r);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // right
    for (let f = fileIndex + 1; f < 8; f++) {
        const sq = document.getElementById(filearr[f] + rank);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // left
    for (let f = fileIndex - 1; f >= 0; f--) {
        const sq = document.getElementById(filearr[f] + rank);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // top-right
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex + i] + (rank + i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // top-left
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex - i] + (rank + i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // bottom-right
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex + i] + (rank - i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    // bottom-left
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex - i] + (rank - i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); }
        else {
            if (img.getAttribute("data-color") !== queenColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    lightqueen(steps, square);
}

function lightqueen(steps, queen) {
    steps.forEach(j => {
        const circle = document.createElement("div");
        circle.setAttribute("class", j.getAttribute("data-enemy") === "true" ? "circle enemy" : "circle");
        j.appendChild(circle);

        const moveHandler = (e) => {
            e.stopPropagation();

            document.querySelectorAll(".circle").forEach(c => c.remove());
            document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

            const img = queen.querySelector("img");
            if (!img) return;

            const enemyimg = j.querySelector("img");
            if (enemyimg) enemyimg.remove();

            j.appendChild(img);
            j.addEventListener("click", () => handleQueenClick(j));

            switchTurn();
        };

        circle.addEventListener("click", moveHandler, { once: true });
        j.addEventListener("click", moveHandler, { once: true });
    });
}