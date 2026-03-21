const kingarr = [];

kingarr.push(document.getElementById("e1"));
kingarr.push(document.getElementById("e8"));

for (const i of kingarr) {
    i.addEventListener('click', () => handleKingClick(i));
}

function handleKingClick(square) {
    if (!square.querySelector("img")) return;
    if (!isValidTurn(square)) return;

    document.querySelectorAll(".circle").forEach(c => c.remove());
    document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

    const currid = square.getAttribute("id");
    const file = currid[0];
    const rank = parseInt(currid[1]);
    const kingColor = square.querySelector("img").getAttribute("data-color");
    const fileIndex = filearr.indexOf(file);

    const moves = [
        [0, 1], [0, -1],
        [1, 0], [-1, 0],
        [1, 1], [1, -1],
        [-1, 1], [-1, -1]
    ];

    const steps = [];
    moves.forEach(move => {
        const newFileIndex = fileIndex + move[0];
        const newRank = rank + move[1];

        if (newRank >= 1 && newRank <= 8 && newFileIndex >= 0 && newFileIndex < 8) {
            const sq = document.getElementById(filearr[newFileIndex] + newRank);
            if (!sq) return;
            const img = sq.querySelector("img");

            if (!img) {
                if (!isSquareAttacked(filearr[newFileIndex] + newRank, kingColor, square)) {
                    steps.push(sq);
                }
            } else if (img.getAttribute("data-color") !== kingColor) {
                if (!isSquareAttacked(filearr[newFileIndex] + newRank, kingColor, square)) {
                    sq.setAttribute("data-enemy", "true");
                    steps.push(sq);
                }
            }
        }
    });

    checkCastling(square, kingColor, rank, fileIndex, steps);
    lightking(steps, square);
}

function checkCastling(square, kingColor, rank, fileIndex, steps) {
    const kingId = square.getAttribute("id");
    const startSquare = kingColor === 'white' ? 'e8' : 'e1';
    if (kingId !== startSquare) return;
    if (isInCheck(kingColor)) return;

    const kingsideRookId = kingColor === 'white' ? 'h8' : 'h1';
    const kingsideRookSq = document.getElementById(kingsideRookId);
    if (kingsideRookSq) {
        const kingsideRookImg = kingsideRookSq.querySelector("img");
        if (kingsideRookImg &&
            kingsideRookImg.getAttribute("data-color") === kingColor &&
            kingsideRookImg.src.includes("rook")) {
            const f1 = document.getElementById(filearr[fileIndex + 1] + rank);
            const f2 = document.getElementById(filearr[fileIndex + 2] + rank);
            if (f1 && f2 && !f1.querySelector("img") && !f2.querySelector("img")) {
                if (!isSquareAttacked(f1.getAttribute("id"), kingColor, square) &&
                    !isSquareAttacked(f2.getAttribute("id"), kingColor, square)) {
                    f2.setAttribute("data-castle", "kingside");
                    steps.push(f2);
                }
            }
        }
    }

    const queensideRookId = kingColor === 'white' ? 'a8' : 'a1';
    const queensideRookSq = document.getElementById(queensideRookId);
    if (queensideRookSq) {
        const queensideRookImg = queensideRookSq.querySelector("img");
        if (queensideRookImg &&
            queensideRookImg.getAttribute("data-color") === kingColor &&
            queensideRookImg.src.includes("rook")) {
            const q1 = document.getElementById(filearr[fileIndex - 1] + rank);
            const q2 = document.getElementById(filearr[fileIndex - 2] + rank);
            const q3 = document.getElementById(filearr[fileIndex - 3] + rank);
            if (q1 && q2 && q3 && !q1.querySelector("img") && !q2.querySelector("img") && !q3.querySelector("img")) {
                if (!isSquareAttacked(q1.getAttribute("id"), kingColor, square) &&
                    !isSquareAttacked(q2.getAttribute("id"), kingColor, square)) {
                    q2.setAttribute("data-castle", "queenside");
                    steps.push(q2);
                }
            }
        }
    }
}

function isSquareAttacked(squareId, kingColor, kingSquare) {
    const enemyColor = kingColor === 'white' ? 'black' : 'white';
    const file = squareId[0];
    const rank = parseInt(squareId[1]);
    const fileIndex = filearr.indexOf(file);

    const straightDirs = [[0,1],[0,-1],[1,0],[-1,0]];
    for (const [df, dr] of straightDirs) {
        for (let i = 1; i <= 8; i++) {
            const f = fileIndex + df * i;
            const r = rank + dr * i;
            if (f < 0 || f >= 8 || r < 1 || r > 8) break;
            const sq = document.getElementById(filearr[f] + r);
            if (!sq) break;
            if (sq === kingSquare) continue;
            const img = sq.querySelector("img");
            if (img) {
                if (img.getAttribute("data-color") === enemyColor) {
                    if (img.src.includes("rook") || img.src.includes("queen")) return true;
                }
                break;
            }
        }
    }

    const diagDirs = [[1,1],[1,-1],[-1,1],[-1,-1]];
    for (const [df, dr] of diagDirs) {
        for (let i = 1; i <= 8; i++) {
            const f = fileIndex + df * i;
            const r = rank + dr * i;
            if (f < 0 || f >= 8 || r < 1 || r > 8) break;
            const sq = document.getElementById(filearr[f] + r);
            if (!sq) break;
            if (sq === kingSquare) continue;
            const img = sq.querySelector("img");
            if (img) {
                if (img.getAttribute("data-color") === enemyColor) {
                    if (img.src.includes("bishop") || img.src.includes("queen")) return true;
                }
                break;
            }
        }
    }

    const knightMoves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    for (const [df, dr] of knightMoves) {
        const f = fileIndex + df;
        const r = rank + dr;
        if (f < 0 || f >= 8 || r < 1 || r > 8) continue;
        const sq = document.getElementById(filearr[f] + r);
        if (!sq) continue;
        const img = sq.querySelector("img");
        if (img && img.getAttribute("data-color") === enemyColor && img.src.includes("knight")) return true;
    }

    const pawnDir = kingColor === 'white' ? -1 : 1;
    const pawnFiles = [fileIndex - 1, fileIndex + 1];
    for (const pf of pawnFiles) {
        if (pf < 0 || pf >= 8) continue;
        const sq = document.getElementById(filearr[pf] + (rank + pawnDir));
        if (!sq) continue;
        const img = sq.querySelector("img");
        if (img && img.getAttribute("data-color") === enemyColor && img.src.includes("pawn")) return true;
    }

    const kingMoves = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
    for (const [df, dr] of kingMoves) {
        const f = fileIndex + df;
        const r = rank + dr;
        if (f < 0 || f >= 8 || r < 1 || r > 8) continue;
        const sq = document.getElementById(filearr[f] + r);
        if (!sq) continue;
        const img = sq.querySelector("img");
        if (img && img.getAttribute("data-color") === enemyColor && img.src.includes("king")) return true;
    }

    return false;
}

function isInCheck(kingColor) {
    let kingSquare = null;
    document.querySelectorAll(".square").forEach(sq => {
        const img = sq.querySelector("img");
        if (img && img.getAttribute("data-color") === kingColor && img.src.includes("king")) {
            kingSquare = sq;
        }
    });
    if (!kingSquare) return false;
    return isSquareAttacked(kingSquare.getAttribute("id"), kingColor, null);
}

function wouldLeaveKingInCheck(fromSquare, toSquare, color) {
    const fromImg = fromSquare.querySelector("img");
    const toImg = toSquare.querySelector("img");

    if (toImg) toImg.remove();
    toSquare.appendChild(fromImg);

    const inCheck = isInCheck(color);

    fromSquare.appendChild(fromImg);
    if (toImg) toSquare.appendChild(toImg);

    return inCheck;
}

function isCheckmate(kingColor) {
    const allSquares = document.querySelectorAll(".square");

    for (const sq of allSquares) {
        const img = sq.querySelector("img");
        if (!img || img.getAttribute("data-color") !== kingColor) continue;

        const id = sq.getAttribute("id");
        const file = id[0];
        const rank = parseInt(id[1]);
        const fileIndex = filearr.indexOf(file);
        const src = img.src;

        let pieceMoves = [];

        if (src.includes("king")) {
            [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([df, dr]) => {
                const f = fileIndex + df;
                const r = rank + dr;
                if (f >= 0 && f < 8 && r >= 1 && r <= 8) {
                    pieceMoves.push(document.getElementById(filearr[f] + r));
                }
            });
        } else if (src.includes("pawn")) {
            const dir = kingColor === 'white' ? -1 : 1;
            pieceMoves.push(document.getElementById(file + (rank + dir)));
            const lf = filearr[fileIndex - 1];
            const rf = filearr[fileIndex + 1];
            if (lf) pieceMoves.push(document.getElementById(lf + (rank + dir)));
            if (rf) pieceMoves.push(document.getElementById(rf + (rank + dir)));
        } else if (src.includes("knight")) {
            [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([df, dr]) => {
                const f = fileIndex + df;
                const r = rank + dr;
                if (f >= 0 && f < 8 && r >= 1 && r <= 8) {
                    pieceMoves.push(document.getElementById(filearr[f] + r));
                }
            });
        } else if (src.includes("rook")) {
            [[0,1],[0,-1],[1,0],[-1,0]].forEach(([df, dr]) => {
                for (let i = 1; i <= 8; i++) {
                    const f = fileIndex + df * i;
                    const r = rank + dr * i;
                    if (f < 0 || f >= 8 || r < 1 || r > 8) break;
                    const target = document.getElementById(filearr[f] + r);
                    if (!target) break;
                    pieceMoves.push(target);
                    if (target.querySelector("img")) break;
                }
            });
        } else if (src.includes("bishop")) {
            [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([df, dr]) => {
                for (let i = 1; i <= 8; i++) {
                    const f = fileIndex + df * i;
                    const r = rank + dr * i;
                    if (f < 0 || f >= 8 || r < 1 || r > 8) break;
                    const target = document.getElementById(filearr[f] + r);
                    if (!target) break;
                    pieceMoves.push(target);
                    if (target.querySelector("img")) break;
                }
            });
        } else if (src.includes("queen")) {
            [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([df, dr]) => {
                for (let i = 1; i <= 8; i++) {
                    const f = fileIndex + df * i;
                    const r = rank + dr * i;
                    if (f < 0 || f >= 8 || r < 1 || r > 8) break;
                    const target = document.getElementById(filearr[f] + r);
                    if (!target) break;
                    pieceMoves.push(target);
                    if (target.querySelector("img")) break;
                }
            });
        }

        for (const target of pieceMoves) {
            if (!target) continue;
            const targetImg = target.querySelector("img");
            if (targetImg && targetImg.getAttribute("data-color") === kingColor) continue;
            if (!wouldLeaveKingInCheck(sq, target, kingColor)) return false;
        }
    }

    return true;
}

// draw condition 1: stalemate
function isStalemate(kingColor) {
    if (isInCheck(kingColor)) return false;
    return isCheckmate(kingColor);
}

// draw condition 2: insufficient material
function isInsufficientMaterial() {
    const pieces = [];
    document.querySelectorAll(".square").forEach(sq => {
        const img = sq.querySelector("img");
        if (img) pieces.push({ color: img.getAttribute("data-color"), src: img.src });
    });

    // king vs king
    if (pieces.length === 2) return true;

    // king + bishop vs king or king + knight vs king
    if (pieces.length === 3) {
        const nonKings = pieces.filter(p => !p.src.includes("king"));
        if (nonKings.length === 1) {
            if (nonKings[0].src.includes("bishop") || nonKings[0].src.includes("knight")) return true;
        }
    }

    // king + bishop vs king + bishop (same color bishops)
    if (pieces.length === 4) {
        const whiteBishops = pieces.filter(p => p.color === 'white' && p.src.includes("bishop"));
        const blackBishops = pieces.filter(p => p.color === 'black' && p.src.includes("bishop"));
        if (whiteBishops.length === 1 && blackBishops.length === 1) return true;
    }

    return false;
}

//draw condition 3: 50 move rule
let moveCount = 0;
let lastCaptureOrPawnMove = 0;

function updateMoveCount(movedPieceSrc, didCapture) {
    moveCount++;
    if (movedPieceSrc.includes("pawn") || didCapture) {
        lastCaptureOrPawnMove = moveCount;
    }
    if (moveCount - lastCaptureOrPawnMove >= 100) {
        setTimeout(() => alert("Draw! 50 move rule."), 100);
        return true;
    }
    return false;
}

//draw condition 4: threefold repetition
const positionHistory = [];

function getBoardPosition() {
    const position = {};
    document.querySelectorAll(".square").forEach(sq => {
        const img = sq.querySelector("img");
        if (img) {
            position[sq.getAttribute("id")] = img.getAttribute("data-color") + "_" + img.src.split("/").pop();
        }
    });
    return JSON.stringify(position);
}

function checkThreefoldRepetition() {
    const current = getBoardPosition();
    positionHistory.push(current);
    const count = positionHistory.filter(p => p === current).length;
    if (count >= 3) {
        setTimeout(() => alert("Draw! Threefold repetition."), 100);
        return true;
    }
    return false;
}

function checkAndMate(movedPieceColor, movedPieceSrc, didCapture) {
    const enemyColor = movedPieceColor === 'white' ? 'black' : 'white';

    // check draw conditions first
    if (isInsufficientMaterial()) {
        setTimeout(() => alert("Draw! Insufficient material."), 100);
        return;
    }
    if (updateMoveCount(movedPieceSrc, didCapture)) return;
    if (checkThreefoldRepetition()) return;

    // check stalemate
    if (isStalemate(enemyColor)) {
        setTimeout(() => alert("Draw! Stalemate."), 100);
        return;
    }

    // check checkmate and check
    if (isInCheck(enemyColor)) {
        if (isCheckmate(enemyColor)) {
            setTimeout(() => {
                alert(`Checkmate! ${movedPieceColor === 'white' ? 'White' : 'Black'} wins!`);
            }, 100);
        } else {
            setTimeout(() => {
                alert(`${enemyColor.charAt(0).toUpperCase() + enemyColor.slice(1)} is in Check!`);
            }, 100);
        }
    }
}

function lightking(steps, king) {
    if (steps.length === 0 && isInCheck(king.querySelector("img").getAttribute("data-color"))) {
        const kingColor = king.querySelector("img").getAttribute("data-color");
        if (isCheckmate(kingColor)) {
            setTimeout(() => {
                alert(`Checkmate! ${kingColor === 'white' ? 'Black' : 'White'} wins!`);
            }, 100);
        }
        return;
    }

    steps.forEach(j => {
        const circle = document.createElement("div");
        circle.setAttribute("class", j.getAttribute("data-enemy") === "true" ? "circle enemy" : "circle");
        j.appendChild(circle);

        const moveHandler = (e) => {
            e.stopPropagation();

            document.querySelectorAll(".circle").forEach(c => c.remove());
            document.querySelectorAll("[data-enemy]").forEach(e => e.removeAttribute("data-enemy"));

            const img = king.querySelector("img");
            if (!img) return;

            if (wouldLeaveKingInCheck(king, j, img.getAttribute("data-color"))) return;

            const enemyimg = j.querySelector("img");
            const didCapture = !!enemyimg;
            if (enemyimg) enemyimg.remove();

            const castleSide = j.getAttribute("data-castle");
            if (castleSide) {
                j.removeAttribute("data-castle");
                const rank = j.getAttribute("id")[1];
                const jFileIndex = filearr.indexOf(j.getAttribute("id")[0]);

                if (castleSide === "kingside") {
                    const rookSq = document.getElementById("h" + rank);
                    const rookImg = rookSq ? rookSq.querySelector("img") : null;
                    const rookDest = document.getElementById(filearr[jFileIndex - 1] + rank);
                    if (rookImg && rookDest) {
                        rookDest.appendChild(rookImg);
                        rookDest.addEventListener("click", () => handleRookClick(rookDest));
                    }
                } else if (castleSide === "queenside") {
                    const rookSq = document.getElementById("a" + rank);
                    const rookImg = rookSq ? rookSq.querySelector("img") : null;
                    const rookDest = document.getElementById(filearr[jFileIndex + 1] + rank);
                    if (rookImg && rookDest) {
                        rookDest.appendChild(rookImg);
                        rookDest.addEventListener("click", () => handleRookClick(rookDest));
                    }
                }
            }

            j.appendChild(img);
            j.addEventListener("click", () => handleKingClick(j));

            switchTurn();
            checkAndMate(img.getAttribute("data-color"), img.src, didCapture);
        };

        circle.addEventListener("click", moveHandler, { once: true });
        j.addEventListener("click", moveHandler, { once: true });
    });
}