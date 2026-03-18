const rookarr = [];

rookarr.push(document.getElementById("a1"));
rookarr.push(document.getElementById("h1"));
rookarr.push(document.getElementById("a8"));
rookarr.push(document.getElementById("h8"));

for (const i of rookarr) {
    i.addEventListener('click', () => handleRookClick(i));
}

function handleRookClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll(".circle").forEach(c => c.remove());
    document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

    const currid = square.getAttribute("id");
    const file = currid[0];
    const rank = parseInt(currid[1]);
    const rookColor = square.querySelector("img").getAttribute("data-color");
    const fileIndex = filearr.indexOf(file);
    const steps = [];

    for (let r = rank + 1; r <= 8; r++) {
        const sq = document.getElementById(file + r);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); } 
        else {
            if (img.getAttribute("data-color") !== rookColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    for (let r = rank - 1; r >= 1; r--) {
        const sq = document.getElementById(file + r);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); } 
        else {
            if (img.getAttribute("data-color") !== rookColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    for (let f = fileIndex + 1; f < 8; f++) {
        const sq = document.getElementById(filearr[f] + rank);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); } 
        else {
            if (img.getAttribute("data-color") !== rookColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    for (let f = fileIndex - 1; f >= 0; f--) {
        const sq = document.getElementById(filearr[f] + rank);
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) { steps.push(sq); } 
        else {
            if (img.getAttribute("data-color") !== rookColor) { sq.setAttribute("data-enemy", "true"); steps.push(sq); }
            break;
        }
    }

    lightrook(steps, square);
}

function lightrook(steps, rook) {
    steps.forEach(j => {
        const circle = document.createElement("div");
        circle.setAttribute("class", j.getAttribute("data-enemy") === "true" ? "circle enemy" : "circle");
        j.appendChild(circle);

        const moveHandler = (e) => {
            e.stopPropagation();

            document.querySelectorAll(".circle").forEach(c => c.remove());
            document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

            const img = rook.querySelector("img");
            if (!img) return;

            const enemyimg = j.querySelector("img");
            if (enemyimg) enemyimg.remove();

            j.appendChild(img);
            j.addEventListener("click", () => handleRookClick(j));

            switchTurn();
        };

        circle.addEventListener("click", moveHandler, { once: true });
        j.addEventListener("click", moveHandler, { once: true });
    });
}