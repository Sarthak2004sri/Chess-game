const squares=document.querySelectorAll(".square");
squares.forEach(square =>{
    square.addEventListener("click",()=>{
        if(square.querySelector("img") && !square.querySelector(".circle,.enemy")){
            squares.forEach(s=>s.style.backgroundColor="");
            square.style.backgroundColor="yellow";
        }
    });
});


