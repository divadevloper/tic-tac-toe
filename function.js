const cells = document.querySelectorAll(".cell")
const statustext = document.querySelector("#statustext")
const restartbtn = document.querySelector("#restartbtn")
const wincondtion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let option = ["", "", "", "", "", "", "", "", ""]
let currentplayer = "X";
let running = false;

intializedgame();

function intializedgame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartbtn.addEventListener("click",restartgame);
    statustext.innerHTML = `${currentplayer}'s turn`;
    running = true
}

function cellClicked() {
    const cellindex = this.getAttribute("cellIndex")
    if (option[cellindex] != ""|| !running ) {
        return
    }
    updateCel(this, cellindex)
    checkWinner();
}

function updateCel(cell, index) {
    option[index] = currentplayer;
    cell.innerHTML = currentplayer;

}

function changePlayer() {
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.innerHTML=`${currentplayer}'s turn`
}

function checkWinner() {
    let roundwon = false;

    for(let i = 0; i < wincondtion.length; i++ ){
        const condition = wincondtion[i]
        const cellA = option[condition[0]];
        const cellB = option[condition[1]];
        const cellC = option[condition[2]];

        if (cellA == "" || cellB == ""|| cellC == "") {
            continue
        }if (cellA == cellB && cellB == cellC) {
            roundwon = true
            break
        }
    }

    if (roundwon) {
        statustext.innerHTML = `${currentplayer} wins!`
        running = false;
    }else if(!option.includes("")){
        statustext.innerHTML = `Draw!`
        running = false
    }else{
        changePlayer();
    }
}

function restartgame() {
    currentplayer = "X";
  option = ["", "", "", "", "", "", "", "", ""]
    statustext.innerHTML = `${currentplayer}'s turn`
    cells.forEach(cell => cell.innerHTML = "")
    running = true
}