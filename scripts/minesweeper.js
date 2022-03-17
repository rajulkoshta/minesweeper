// export const TILE_STATUS = {
//     HIDDEN: "hidden",
//     MINE: "mine",
//     NUMBER: "number",
//     MARKED: "marked",
// };

// export function createBoard(boardSize, NumberOfMines) {
//     const board = [];

//     // we want random positions for our mines
//     const minePositions = getMinePositions(boardSize, numberOfMines);

//     for (let x = 0; x < boardSize; x++) {
//         const row = [];
//         for (let y = 0; y < boardSize; y++) {
//             const element = document.createElement("div");
//             element.dataset.status = TILE_STATUS.HIDDEN;
//             const tile = {
//                 element,
//                 x,
//                 y,
//                 mine: minePositions.some(positionMatch.bind(null, {
//                     x,
//                     y
//                 })),

//                 // get dataset value
//                 get status() {
//                     return element.dataset.status;
//                 },

//                 set status(value) {
//                     this.element.dataset.status = value
//                 },
//             };
//             row.push(tile);
//         }
//         board.push(row);
//     }
//     return board;
// }

// export const MarkTile = (tile) => {
//     if (
//         tile.status !== TILE_STATUS.HIDDEN &&
//         tile.status !== TILE_STATUS.MARKED
//     ) return;

//     if (tile.status === TILE_STATUS.MARKED) {
//         tile.status = TILE_STATUS.HIDDEN;
//         return;
//     } else {
//         tile.status = TILE_STATUS.MARKED;
//     }
// };

// function getMinePositions(boardSize, numberOfMines) {
//     const positions = [];
//     while (positions.length < numberOfMines) {
//         const positon = {
//             x: randomNumber(boardSize),
//             y: randomNumber(boardSize),
//         }
//         // check if hamari position par already koi baitha hua hai
//         if (!positions.some((p) => positionMatch(p, positon))) {
//             positions.push(position);
//         }
//     }
//     return positions;
// }

// function positionMatch(p, posi) {
//     return p.x === posi.x && p.y == posi.y;
// }

// function randomNumber(size) {
//     return Math.floor(Math.random() * size);
// }


// *************************************************** MAIN CODE ***************************************//

export class MineSweeper {
  constructor(BOARD_SIZE, NUMBER_OF_MINES) {
    // variables
    this.BOARD_SIZE = BOARD_SIZE;
    this.NUMBER_OF_MINES = NUMBER_OF_MINES;
    this.TILE_STATUSES = {
      HIDDEN: "hidden",
      MINE: "mine",
      NUMBER: "number",
      MARKED: "marked",
    };
    this.boardTiles = [];
    this.minePositions = [];

    // self starting Functions
    this.addMinePositions();
    this.createBoard();
  }
  
	// all main functions

	// 1.1 - add mines in random locations

  addMinePositions() {
    while (this.minePositions.length < this.NUMBER_OF_MINES) {
      const position = {
        x: this.randomNumber(),
        y: this.randomNumber(),
      };

      // check if hamari position par already koi baitha hua hai
      if (!this.minePositions.some((p) => this.positionMatch(p, position))) {
        this.minePositions.push(position);
      }
    }
  }


  // 1. 2 - for create the board
  createBoard() {
    for (let x = 0; x < this.BOARD_SIZE; x++) {
      const row = [];
      for (let y = 0; y < this.BOARD_SIZE; y++) {
        const element = document.createElement("div");
        element.dataset.status = this.TILE_STATUSES.HIDDEN;
        const tile = {
          element,
          x,
          y,
          mine: this.minePositions.some((p) => this.positionMatch(p, { x , y })),

          // get dataset value
          get status() {
            return element.dataset.status;
          },

          set status(value) {
            this.element.dataset.status = value;
          },
        };
        row.push(tile);
      }
      this.boardTiles.push(row);
    }
  }

  
	// 1.3 - right click mark funtion

  markTile(tile) {
    if (
      tile.status !== this.TILE_STATUSES.HIDDEN &&
      tile.status !== this.TILE_STATUSES.MARKED
    )
      return;

    if (tile.status === this.TILE_STATUSES.MARKED) {
      tile.status = this.TILE_STATUSES.HIDDEN;
      return;
    } else {
      tile.status = this.TILE_STATUSES.MARKED;
    }
  }

  revealTile(tile) {
    if (tile.status !== this.TILE_STATUSES.HIDDEN) return;
    if (tile.mine) {
      // gameover
      tile.status = this.TILE_STATUSES.MINE;
      return;
    }

    tile.status = this.TILE_STATUSES.NUMBER;

    const adjacentTiles = this.nearbyTiles(tile);

    // if there are no adjacent mines reaveal all adjacent tiles
    // ṃap ,filter,reduce
    const mines = adjacentTiles.filter((tile) => tile.mine)

    if (mine.length === 0) {
      // reveal lladjacent tiles
      adjacentTiles.forEach((p) => this.revealTile(p));
    } else {
      this.element.textContent = mines.length;
    }
  }

  // all helper functions

  randomNumber() {
    return Math.floor(Math.random() * this.BOARD_SIZE)
  }

  positionMatch(a,b) {
    return a.x === b.x && a.y == b.y;
  }

  nearbyTiles({x,y}) {
    const tiles = []
    for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
      for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
        const tile = this.boardTiles[x + xOffSet] ?. [y + yOffSet] 
        if (tile) {
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }


  checkWin(){
    return this.boardTiles.every((row) => {
      return row.every((tile) => {
        return (
          tile.status == this.TILE_STATUSES.NUMBER || 
          (tile.mine && (
            tile.status === this.TILE_STATUSES.HIDDEN ||
            this.TILE_STATUSES === this.TILE_STATUSES.MARKED))
        );
      });
    });
  }
  checkLose(){
    return this.boardTiles.some((row) => {
      return row.some((tile) => {
        return tile.status == this.TILE_STATUSES.MINE;
      });
    });
  }
}