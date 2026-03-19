const bishoparr = [];

bishoparr.push(document.getElementById("c1"));
bishoparr.push(document.getElementById("f1"));
bishoparr.push(document.getElementById("c8"));
bishoparr.push(document.getElementById("f8"));

for (const i of bishoparr) {
    i.addEventListener('click', () => handleBishopClick(i));
}

function handleBishopClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll(".circle").forEach(c => c.remove());
    document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

    const currid = square.getAttribute("id");
    const file = currid[0];
    const rank = parseInt(currid[1]);
    const bishopColor = square.querySelector("img").getAttribute("data-color");
    const fileIndex = filearr.indexOf(file);
    const steps = [];

    // top-right
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex + i] + (rank + i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) {
            steps.push(sq);
        } else {
            if (img.getAttribute("data-color") !== bishopColor) {
                sq.setAttribute("data-enemy", "true");
                steps.push(sq);
            }
            break;
        }
    }

    // top-left
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex - i] + (rank + i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) {
            steps.push(sq);
        } else {
            if (img.getAttribute("data-color") !== bishopColor) {
                sq.setAttribute("data-enemy", "true");
                steps.push(sq);
            }
            break;
        }
    }

    // bottom-right
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex + i] + (rank - i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) {
            steps.push(sq);
        } else {
            if (img.getAttribute("data-color") !== bishopColor) {
                sq.setAttribute("data-enemy", "true");
                steps.push(sq);
            }
            break;
        }
    }

    // bottom-left
    for (let i = 1; i <= 8; i++) {
        const sq = document.getElementById(filearr[fileIndex - i] + (rank - i));
        if (!sq) break;
        const img = sq.querySelector("img");
        if (!img) {
            steps.push(sq);
        } else {
            if (img.getAttribute("data-color") !== bishopColor) {
                sq.setAttribute("data-enemy", "true");
                steps.push(sq);
            }
            break;
        }
    }

    lightbishop(steps, square);
}

function lightbishop(steps, bishop) {
    steps.forEach(j => {
        const circle = document.createElement("div");
        circle.setAttribute("class", j.getAttribute("data-enemy") === "true" ? "circle enemy" : "circle");
        j.appendChild(circle);

        const moveHandler = (e) => {
            e.stopPropagation();

            document.querySelectorAll(".circle").forEach(c => c.remove());
            document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

            const img = bishop.querySelector("img");
            if (!img) return;

            const enemyimg = j.querySelector("img");
            if (enemyimg) enemyimg.remove();

            j.appendChild(img);
            j.addEventListener("click", () => handleBishopClick(j));

            switchTurn();
        };

        circle.addEventListener("click", moveHandler, { once: true });
        j.addEventListener("click", moveHandler, { once: true });
    });
}