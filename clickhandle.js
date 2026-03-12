const squares=document.querySelectorAll(".square");
squares.forEach(square =>{
    square.addEventListener("click",()=>{
        if(square.querySelector("img")){
            squares.forEach(s=>s.style.backgroundColor="");
            square.style.backgroundColor="yellow";
        }
    });
});


