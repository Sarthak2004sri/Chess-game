const arrpawn=[];

for(const i of filearr){
    arrpawn.push(document.getElementById(i+2));
}

for(const i of filearr){
    arrpawn.push(document.getElementById(i+7));
}

for(const i of arrpawn){
  i.addEventListener('click', () => {
    document.querySelectorAll('.circle').forEach(c=>c.remove());

    const currentid = i.getAttribute("id");
    let change = parseInt(currentid[1]);  
    const steps = [];

    for(let j = 0; j < 2; j++){
        const step=change==2 ? change+j+1 : change - j - 1;    
        steps.push(document.getElementById(currentid[0] + step));
    }

    light(steps[0],steps[1],i);
  })
}

//function to add highlighting
function light(first,second,pawn){
    let circle1=document.createElement("div");
    let circle2=document.createElement("div");
    circle1.setAttribute("class","circle");
    circle2.setAttribute("class","circle");
    first.appendChild(circle1);
    second.appendChild(circle2);

    first.addEventListener("click",()=>{
       const img=pawn.querySelector("img");
       first.appendChild(img);
       document.querySelectorAll(".circle").forEach(c=>c.remove());
    });

    second.addEventListener("click",()=>{
        const img=pawn.querySelector("img");
       second.appendChild(img);
       document.querySelectorAll(".circle").forEach(c=>c.remove());
    });
}




