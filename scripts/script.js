// // display UI

// import { createBoard , MarkTile} from "./ minesweeper";

// const BOARD_SIZE = 9;
// const NUMBER_OF_MINES = 2;
// const board = CreateBoard(BOARD_SIZE,NUMBER_OF_MINES);

// CONSOLE
// const boardElement = document.querySelector(".board");
// const MineLeftCount = document.querySelector("[data-mine-count]");


// // for (let x = 0;x < BOARD_SIZE ; x++){
// //     const row=[];
// //     for(let y=0 ; y< BOARD_SIZE ; y++){
// //         const element = document.createElement("div");

// //         // if we want to add class to specific element
// //         // element.classList.add("cell");
// //         element.dataset.status = "hidden";
// //         const tile = {
// //             element, //html element
// //             x, // x coordinate
// //             y, //y coordinate
// //         };
// //         row.push(tile);
// //     }
// //     board.push(row); 
// // }


// board.forEach((row) => {
//     row.forEach((title) => {
//         boardElement.append(tile.element);
//         tile.element.addEventListener("click",function () {

//         })
//         tile.element.addEventListener("contextmenu",function(e){
//             //prevent default rigth click view
//             e.preventDefault();
//             MarkTile(tile );
//         })
//     })
// })

// MineLeftCount.textContent = NUMBER_OF_MINES;




import {
    MineSweeper
} from "./minesweeper";

class MinesweeeprUI extends MineSweeper {
    constructor(
        BOARD_SIZE,
        NUMBER_OF_MINES, {
            boardElement,
            mineLeftCount,
            messageTextElement
        }
    ) {
        super(BOARD_SIZE, NUMBER_OF_MINES);

        // all dom elements
        this.boardElement = boardElement;
        this.mineLeftCountElement = mineLeftCountElement;
        this.messageTextElement = messageTextElement;
    }

    updateTilesUI() {
        this.boardTiles.forEach((row) => {
            row.forEach((tile) => {
                this.boardElement.append(tile.element);
                tile.element.addEventListener("click", () => {
                    this.revealTile(tile);
                    this.checkGameEnd();
                });
                tile.element.addEventListener("contextmenu", (e) => {
                    // prevent default right click menu
                    e.preventDefault();
                    this.markTile(tile);
                    this.listMineLeft();
                });
            });
        });
    }
    listMineLeft() {
        const markTilesCount = this.boardTiles.reduce((count, row) => {
            return (
                count + row.filter((tile) => tile.status === this.TILE_STATUS.MARKED).length
            )
        })

    }
    checkGameEnd() {
        const win = this.checkWin();
        const lose = this.checkLose();

        if (win || lose) {
            this.boardElement.addEventListener("click", this.stopProp, {
                capture: true
            });
            this.boardElement.addEventListener("context-menu", this.stopProp, {
                capture: true
            });
        }

        if (win) {
            this.messageTextElement.textContent = "You win!";
        }
        if (lose) {
            this.messageTextElement.textContent = "You degenrate!";
            this.boardElement.forEach((row) => {
                row.forEach((tile) => {
                    if (tile.TILE_STATUS === this.TILE_STATUS.MARKED)
                        this.markTile(tile);
                    if (tile.mine) this.revealTile(tile);
                });
            });

        }
    }
    stopProp(e){
        e.stopImmediatePropagation();
    }    
}


const BOARD_SIZE = 10
const NUMBER_OF_MINES =60

const boardElement= document.querySelector(".board");
const mineLeftCountElement = document.querySelector("[data-mine-count]")
const messageTextElement  = document.querySelector(".subtext");

const boardUI = new MinesweeeprUI(BOARD_SIZE,NUMBER_OF_MINES, {
    boardElement,
    mineLeftCount,
    messageTextElement
})

boardElement.updateTilesUI()

boardElement.setProperty("--Size",BOARD_SIZE)
mineLeftCountElement.textContent = NUMBER_OF_MINES;