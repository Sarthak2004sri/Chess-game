const knightarr=[];

knightarr.push(document.getElementById("b1"));
knightarr.push(document.getElementById("g1"));
knightarr.push(document.getElementById("b8"));
knightarr.push(document.getElementById("g8"));

for(const i of knightarr){
    i.addEventListener('click',()=>{
        const currid=i.getAttribute("id");
        const file=currid[0];
        const rank=parseInt(currid[1]);
        const moves=[
            [2,1],[2,-1],
            [-2,1],[-2,-1],
            [1,2],[1,-2],
            [-1,2],[-1,-2]
        ];
        const steps=[];
        moves.forEach(i=>{
           const x=i[0];
           const y=i[1];
           const newfile=filearr.indexOf(file)+x;
           const newrank=rank+y;
           if(newrank>=1 && newrank<=8 && newfile<8 && newfile>=0){
              steps.push(document.getElementById(filearr[newfile]+newrank));
           }
        })
        lightknight(steps,knight);    
    })
}

function lightknight(steps,knight){
   steps.forEach(j=>{
        let circle=document.createElement("div");
        circle.setAttribute("class","circle");
        j.appendChild(circle);

        j.addEventListener("click",()=>{
            const img=knight.querySelector("img");
           
            document.querySelectorAll(".circle").forEach(c=>c.remove());
             j.appendChild(img);
        });
   });
}