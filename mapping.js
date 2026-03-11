//selecting files using DOM and storing inot array
const arroffiles= document.querySelectorAll(".files");
let cnt=1;
const filearr=["a","b","c","d","e","f","g","h"];
let ind=0; 
for(const i of arroffiles){
    let cnt=1;
    for(const j of i.children){
        j.setAttribute("id",filearr[ind]+cnt);
        cnt++;
    }
    ind++;
}