//selecting files using DOM and storing into array
const arroffiles = document.querySelectorAll(".files");
const filearr = ["a","b","c","d","e","f","g","h"];
let ind = 0; 

for(const i of arroffiles){
    let cnt = 1;
    for(const j of i.children){
        j.setAttribute("id", filearr[ind] + cnt);

        if(ind === 0){
            const span = document.createElement("span");
            span.innerText = cnt;
            span.setAttribute("class","num");
            j.appendChild(span);
        }

        if(cnt === 8){
            const span = document.createElement("span");
            span.innerText = filearr[ind];
            if(ind % 2 == 0){
                span.setAttribute("class","alphaeve");
            } else {
                span.setAttribute("class","alphaodd");
            }
            j.appendChild(span);
        }
        cnt++;
    }
    ind++;
}

document.querySelectorAll("img").forEach(img => {
    if(img.src.includes("white")){
        img.setAttribute("data-color","white");
    } else {
        img.setAttribute("data-color","black");
    }
});

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
        const color = img.getAttribute("data-color");
        if(color == "white") console.log("whitepiece");
        else console.log("blackpiece");
    });
});