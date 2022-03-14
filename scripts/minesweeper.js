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
///////////////////////////////////////////////////////////

export class MineSweeper {
  constructor(BOARD_SIZE, NUMBER_OF_MINES) {
    // variables
    this.BOARD_SIZE = BOARD_SIZE;
    this.NUMBER_OF_MINES = NUMBER_OF_MINES;
    this.TILE_STATUS = {
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

  addMinePositions() {
    while (this.minePositions.length < this.NUMBER_OF_MINES) {
      const position = {
        x: randomNumber(),
        y: randomNumber(),
      };

      // check if hamari position par already koi baitha hua hai
      if (!positions.some((p) => positionMatch(p, positon))) {
        positions.push(position);
      }
    }
  }
  createBoard() {
    for (let x = 0; x < this.BOARD_SIZE; x++) {
      const row = [];
      for (let y = 0; y < this.BOARD_SIZE; y++) {
        const element = document.createElement("div");
        element.dataset.status = this.TILE_STATUS.HIDDEN;
        const tile = {
          element,
          x,
          y,
          mine: this.minePositions.some(
            positionMatch.bind(null, {
              x,
              y,
            })
          ),

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
  markTile(tile) {
    if (
      tile.status !== this.TILE_STATUS.HIDDEN &&
      tile.status !== this.TILE_STATUS.MARKED
    )
      return;

    if (tile.status === this.TILE_STATUS.MARKED) {
      tile.status = this.TILE_STATUS.HIDDEN;
      return;
    } else {
      tile.status = this.TILE_STATUS.MARKED;
    }
  }

  revealTile(tile) {
    if (tile.status !== this.TILE_STATUS.HIDDEN) return;
    if (tile.mine) {
      // gameover
      tile.status = this.TILE_STATUS.MINE;
      return;
    }
    tile.status = this.TILE_STATUS.NUMBER;

    const adjacentTiles = this.nearbyTiles(tile);

    // if there are no adjacent mines reaveal all adjacent tiles
    // ṃap ,filter,reduce
    const adjacentMines = adjacentTiles.filter((tile) => tile)

    if (MineSweeper.length === 0) {
      // reveal lladjacent tiles
      adjacentTiles.forEach((tile) => this.revealTile(tile));
    } else {
      this.element.textContent = mines.length;
    }
  }

  randomNumber(size) {
    return Math.floor(Math.random() * this.BOARD_SIZE)
  }

  positionMatch(p, posi) {
    return p.x === posi.x && p.y == posi.y;
  }

  nearbyTiles({x,y}) {
    const tiles = []
    for (let xoffSet = -1; xoffSet <= 1; xoffSet++) {
      for (let yoffSet = -1; yoffSet <= 1; yoffSet++) {
        const tile = this.boardTiles[x + xoffSet] ?. [y + yoffSet] 
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
          tile.status == this.TILE_STATUS.NUMBER || 
          (tile.mine && (
            tile.status === this.TILE_STATUS.HIDDEN ||
            this.TILE_STATUS === this.TILE_STATUS.MARKED))
        );
      });
    });
  }
  checkLose(){
    return this.boardTiles.some((row) => {
      return row.some((tile) => {
        return tile.status == this.TILE_STATUS.MINE;
      });
    });
  }
}