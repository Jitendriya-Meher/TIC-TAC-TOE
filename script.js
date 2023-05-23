const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const jik = document.querySelector(".me");

let currPlayer;
let gameGrid;

const winPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// funvtion to initialize the game grid
function initGame() {
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // UI par bhi empty karna padega
    boxes.forEach((box,index)=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents="all";
    });

    // remove the background color also
    boxes.forEach((box,index)=>{
        box.classList.remove("win");
    })
        
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current player - ${currPlayer}`;

    jik.innerHTML = "JIKSSS...";
    jik.classList.remove("rot");
}

// call initGame
initGame();

function swapTurn(){
    if( currPlayer === "X"){
        currPlayer = "0";
    }else{
        currPlayer = "X";
    }
    // UI turn
    gameInfo.innerText = `current player - ${currPlayer}`;
}

function checkGameOver(){
    let answer ="";

    winPos.forEach((position) =>{
        // all 3 box should be non-empty and have same value
        if( (gameGrid[position[0]] !="" || gameGrid[position[1]] !="" || gameGrid[position[2]]!="") && 
            (gameGrid[position[0]]== gameGrid[position[1]]) && (gameGrid[position[0]]==gameGrid[position[2]])){
                
                // update answer 
                if( gameGrid[position[0]] == "X"){
                    answer = "X";
                }else{
                    answer = "0";
                }

                // disable pointer event to stop the game 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // now we know X/0 is winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                jik.innerHTML =`Player ${answer} Wins...`;
                jik.classList.add("rot");
            } 
    });

    // its mean we may have the anser
    if( answer !== ""){
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check if it tie or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if( fillCount == 9){
        gameInfo.innerHTML = `Game Tie !`;
        newGameBtn.classList.add("active");
        jik.innerHTML =`Game Tie!!!`;
        jik.classList.add("rot");
    }

}

function handleClick(index){
    if( gameGrid[index] === ""){
        gameGrid[index] = currPlayer;
        boxes[index].innerHTML = currPlayer;
        boxes[index].style.pointerEvents = "none";

        // swap kardo turn
        swapTurn();

        // check koi jeet toh nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", () =>{
    initGame();
});