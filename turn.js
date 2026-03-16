let currentturn='white';

function switchTurn(){
    currentturn=currentturn === 'white' ? 'black' : 'white';
    console.log("Turn",currentturn);
}

function isValidTurn(square){
    const img=square.querySelector('img');
    if(!img) return false;
    return img.getAttribute('data-color')===currentturn;
}