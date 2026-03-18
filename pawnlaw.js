const arrpawn = [];

for (const i of filearr) arrpawn.push(document.getElementById(i + 2));
for (const i of filearr) arrpawn.push(document.getElementById(i + 7));

for (const i of arrpawn) {
    i.addEventListener('click', () => handlePawnClick(i));
}

function handlePawnClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll('.circle').forEach(c => c.remove());

    const id = square.getAttribute('id');
    const file = id[0];
    const rank = parseInt(id[1]);
    const color = square.querySelector('img').getAttribute('data-color');
    const direction = color === 'white' ? -1 : 1;
    const startRank = color === 'white' ? 7 : 2;

    const oneStep = document.getElementById(file + (rank + direction));
    if (oneStep && !oneStep.querySelector('img')) {
        addCircle(oneStep);

        if (rank === startRank) {
            const twoStep = document.getElementById(file + (rank + direction * 2));
            if (twoStep && !twoStep.querySelector('img')) {
                addCircle(twoStep);
            }
        }
    }

    const leftFile = filearr[filearr.indexOf(file) - 1];
    const rightFile = filearr[filearr.indexOf(file) + 1];

    [leftFile, rightFile].forEach(diagFile => {
        if (!diagFile) return;
        const diagSq = document.getElementById(diagFile + (rank + direction));
        if (!diagSq) return;
        const diagImg = diagSq.querySelector('img');
        if (diagImg && diagImg.getAttribute('data-color') !== color) {
            addCircle(diagSq, 'capture');
        }
    });

    lightpawn(square);
}

function lightpawn(pawn) {
    document.querySelectorAll('.circle').forEach(circle => {
        const square = circle.parentElement;

        const moveHandler = (e) => {
            e.stopPropagation();

            document.querySelectorAll('.circle').forEach(c => c.remove());

            const img = pawn.querySelector('img');
            if (!img) return;

            const enemy = square.querySelector('img');
            if (enemy) enemy.remove();

            square.appendChild(img);
            square.addEventListener('click', () => handlePawnClick(square));

            switchTurn();
        };

        circle.addEventListener('click', moveHandler, { once: true });
        square.addEventListener('click', moveHandler, { once: true });
    });
}

function addCircle(square, type) {
    const circle = document.createElement('div');
    circle.setAttribute('class', type === 'capture' ? 'circle enemy' : 'circle');
    const img = square.querySelector('img');
    if (img) {
        square.insertBefore(circle, img);
    } else {
        square.appendChild(circle);
    }
}