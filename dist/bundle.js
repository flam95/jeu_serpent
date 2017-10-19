/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


window.onload = () => {
    let myGame = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
    myGame.init();

    document.onkeydown = e => {
        const key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 32:
                myGame.launch();
                return;
            default:
                return;
        }
        myGame.snakee.setDirection(newDirection);
    };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apple_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drawing_js__ = __webpack_require__(4);




class Game {

    constructor(canvasWidth = 900, canvasHeight = 600) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 30;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.widthInBlocks = this.canvasWidth / this.blockSize;
        this.heightInBlocks = this.canvasHeight / this.blockSize;
        this.centreX = this.canvasWidth / 2;
        this.centreY = this.canvasHeight / 2;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeOut;
    }

    init() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "30px solid gray";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(this.canvas);
        this.launch();
    };

    launch() {
        this.snakee = new __WEBPACK_IMPORTED_MODULE_0__snake_js__["a" /* default */]("right", [6, 4], [5, 4], [4, 4], [3, 4], [2, 4]);
        this.applee = new __WEBPACK_IMPORTED_MODULE_1__apple_js__["a" /* default */]();
        this.score = 0;
        clearTimeout(this.timeOut);
        this.delay = 100;
        this.refreshCanvas();
    };

    refreshCanvas() {
        this.snakee.advance();
        if (this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)) {
            __WEBPACK_IMPORTED_MODULE_2__drawing_js__["a" /* default */].gameOver(this.ctx, this.centreX, this.centreY);
        } else {
            if (this.snakee.isEatingApple(this.applee)) {
                this.score++;
                this.snakee.ateApple = true;

                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
                } while (this.applee.isOnSnake(this.snakee));

                if (this.score % 5 == 0) {
                    this.speedUp();
                }
            }
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            __WEBPACK_IMPORTED_MODULE_2__drawing_js__["a" /* default */].drawScore(this.ctx, this.centreX, this.centreY, this.score);
            __WEBPACK_IMPORTED_MODULE_2__drawing_js__["a" /* default */].drawSnake(this.ctx, this.blockSize, this.snakee);
            __WEBPACK_IMPORTED_MODULE_2__drawing_js__["a" /* default */].drawApple(this.ctx, this.blockSize, this.applee);
            this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay);
        }
    };

    speedUp() {
        this.delay /= 2;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Snake {
    constructor(direction, ...body) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
    }

    advance() {
        const nextPosition = this.body[0].slice();
        switch (this.direction) {
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                nextPosition[0] += 1;
                break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                nextPosition[1] -= 1;
                break;
            default:
                throw "invalid direction";
        }
        this.body.unshift(nextPosition);
        if (!this.ateApple) this.body.pop();
        else this.ateApple = false;
    }

    setDirection(newDirection) {
        let allowedDirections;
        switch (this.direction) {
            case "left":
            case "right":
                allowedDirections = ["up", "down"];
                break;
            case "down":
            case "up":
                allowedDirections = ["left", "right"];
                break;
            default:
                throw "invalid direction";
        }
        if (allowedDirections.indexOf(newDirection) > -1) {
            this.direction = newDirection;
        }
    }

    checkCollision(widthInBlocks, heightInBlocks) {
        let wallCollision = false;
        let snakeCollision = false;
        const [head, ...rest] = this.body;
        const [snakeX, snakeY] = head;
        const minX = 0;
        const minY = 0;
        const maxX = widthInBlocks - 1;
        const maxY = heightInBlocks - 1;
        const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) wallCollision = true;

        for (let block of rest) {
            if (snakeX === block[0] && snakeY === block[1]) snakeCollision = true;
        }

        return wallCollision || snakeCollision;
    }

    isEatingApple(appleToEat) {
        const head = this.body[0];
        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) return true;
        else return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Apple {
    constructor(position = [10, 10]) {
        this.position = position;
    }

    setNewPosition(widthInBlocks, heightInBlocks) {
        const newX = Math.round(Math.random() * (widthInBlocks - 1));
        const newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
    }

    isOnSnake(snakeToCheck) {
        let isOnSnake = false;
        for (let block of snakeToCheck.body) {
            if (
                this.position[0] === block[0] &&
                this.position[1] === block[1]
            ) {
                isOnSnake = true;
            }
        }
        return isOnSnake;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Apple;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Drawing {
    static gameOver(ctx, centreX, centreY) {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText("Game Over", centreX, centreY - 180);
        ctx.fillText("Game Over", centreX, centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
        ctx.restore();
    };

    static drawScore(ctx, centreX, centreY, score) {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    };

    static drawSnake(ctx, blockSize, snake) {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (let block of snake.body) {
            this.drawBlock(ctx, block, blockSize);
        }
        ctx.restore();
    }

    static drawApple(ctx, blockSize, apple) {
        const radius = blockSize / 2;
        const x = apple.position[0] * blockSize + radius;
        const y = apple.position[1] * blockSize + radius;
        ctx.save();
        ctx.fillStyle = "#33cc33";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
    }

    static drawBlock(ctx, position, blockSize) {
        const [x, y] = position;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drawing;



/***/ })
/******/ ]);