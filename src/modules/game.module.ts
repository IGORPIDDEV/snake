import GameInterface from '../interfaces/game.interface';
import BoardInterface from '../interfaces/board.interface';
import { SnakeInterface, FoodInterface, Coordinates } from '../interfaces/game-object.interface';
import { generateRandomCoordinates } from '../utils/utils';
import Board from './board.module';
import Snake from './snake.module';
import Food from './food.module';
import { Direction } from '../types/snake';
import Score from './score.module';
import ScoreInterface from '../interfaces/score.interface';

export default class Game implements GameInterface {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public board: BoardInterface;
  public food: FoodInterface;
  public snake: SnakeInterface;
  public score: ScoreInterface;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    this.score = new Score();
    this.board = this.createBoard(this.canvas, this.score);
    this.food = this.createFood(this.board, this.ctx, this.getRandomCoordinates());
    this.snake = this.createSnake(this.board, this.food, this.ctx, this.getRandomCoordinates());

    document.addEventListener('keydown', (event) => {
      if (!this.snake.requestAnimationId) {
        this.snake.move();
        this.board.setDisplayForGameMessage('none');
      }
      switch (event.key) {
        case 'ArrowUp':
          this.snake.setDirection(Direction.Up);
          break;
        case 'ArrowDown':
          this.snake.setDirection(Direction.Down);
          break;
        case 'ArrowLeft':
          this.snake.setDirection(Direction.Left);
          break;
        case 'ArrowRight':
          this.snake.setDirection(Direction.Right);
          break;
      }
    });
  }

  getRandomCoordinates() {
    return generateRandomCoordinates(
      this.board.canvas.width,
      this.board.canvas.height,
      this.board.cellSize
    );
  }

  createBoard(canvas: HTMLCanvasElement, score: ScoreInterface) {
    return new Board(canvas, score);
  }

  createSnake(
    board: BoardInterface,
    food: FoodInterface,
    ctx: CanvasRenderingContext2D,
    coordinates: Coordinates
  ) {
    return new Snake(board, food, ctx, coordinates);
  }

  createFood(board: BoardInterface, ctx: CanvasRenderingContext2D, coordinates: Coordinates) {
    return new Food(board, ctx, coordinates);
  }
}
