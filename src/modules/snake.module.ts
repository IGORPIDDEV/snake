import Constants from '../constants/constants';
import GameObject from './game-object.module';
import { SnakeInterface, Coordinates, FoodInterface } from '../interfaces/game-object.interface';
import BoardInterface from '../interfaces/board.interface';
import { Direction } from '../types/snake';

export default class Snake extends GameObject implements SnakeInterface {
  public board: BoardInterface;
  public food: FoodInterface;
  public speed: number;
  public direction: Direction;
  public moveCounter = 0;
  public moveCounterStep = Constants.DEFAULT_SNAKE_MOVE_COUNTER_STEP;
  public requestAnimationId: number;
  public headImage: HTMLImageElement;
  public cells: {
    coordinates: Coordinates;
    direction: Direction;
  }[] = [];
  constructor(
    board: BoardInterface,
    food: FoodInterface,
    ctx: CanvasRenderingContext2D,
    coordinates: Coordinates,
    color = Constants.DEFAULT_SNAKE_COLOR
  ) {
    super(board, ctx, coordinates, color);
    this.board = board;
    this.food = food;
    this.speed = Constants.DEFAULT_SNAKE_SPEED;
    this.headImage = document.getElementById('source') as HTMLImageElement;
    this.requestAnimationId = 0;
    this.direction = Direction.Right;
    this.renderSnake();
  }

  renderSnake() {
    this.renderCell(this.coordinates);
    this.cells.forEach((cell) => {
      this.renderCell(cell.coordinates, Constants.DEFAULT_SNAKE_BODY_COLOR);
    });
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
  }

  checkWallCollision() {
    return (
      this.coordinates.x.end <= this.board.canvas.width &&
      this.coordinates.y.end <= this.board.canvas.height &&
      this.coordinates.x.start >= 0 &&
      this.coordinates.y.start >= 0
    );
  }

  // checkFoodCollision() {
  //   return (
  //     this.coordinates.x.start <= this.food.coordinates.x.end &&
  //     this.coordinates.x.end >= this.food.coordinates.x.start &&
  //     this.coordinates.y.start <= this.food.coordinates.y.end &&
  //     this.coordinates.y.end >= this.food.coordinates.y.start
  //   );
  // }
  checkFoodCollision() {
    return this.checkHeadCollisionWithFood() || this.checkBodyCollisionWithFood();
  }

  checkHeadCollisionWithFood() {
    return (
      this.coordinates.x.start <= this.food.coordinates.x.end &&
      this.coordinates.x.end >= this.food.coordinates.x.start &&
      this.coordinates.y.start <= this.food.coordinates.y.end &&
      this.coordinates.y.end >= this.food.coordinates.y.start
    );
  }

  checkBodyCollisionWithFood() {
    const newHead = this.coordinates;
    for (let i = 1; i < this.cells.length; i++) {
      if (
        newHead.x.start <= this.cells[i].coordinates.x.end &&
        newHead.x.end >= this.cells[i].coordinates.x.start &&
        newHead.y.start <= this.cells[i].coordinates.y.end &&
        newHead.y.end >= this.cells[i].coordinates.y.start
      ) {
        return true;
      }
    }
    return false;
  }
  moveCells({ x, y }: Coordinates, direction: Direction) {
    const oldCoords = { ...this.coordinates };
    const oldDirection = this.direction;
    if (this.cells.length) {
      for (let i = this.cells.length - 1; i > 0; i--) {
        this.cells[i].coordinates = { ...this.cells[i - 1].coordinates };
        this.cells[i].direction = this.cells[i - 1].direction;
      }
      this.cells[0].coordinates = { ...oldCoords };
      this.cells[0].direction = oldDirection;
    }
    this.coordinates = { x, y };
    this.direction = direction;
  }
  getCoordsByDirection() {
    return new Map([
      [Direction.Up, { x: { start: 0, end: 0 }, y: { start: 1, end: 1 } }],
      [Direction.Down, { x: { start: 0, end: 0 }, y: { start: -1, end: -1 } }],
      [Direction.Left, { x: { start: -1, end: -1 }, y: { start: 0, end: 0 } }],
      [Direction.Right, { x: { start: 1, end: 1 }, y: { start: 0, end: 0 } }]
    ]);
  }
  eatFood() {
    const lastCell = this.cells[this.cells.length - 1] || {
      coordinates: this.coordinates,
      direction: this.direction
    };
    const direction = lastCell.direction || this.direction;
    const newCoords = this.getCoordsByDirection().get(direction);
    if (!newCoords) return;
    const newCell = {
      coordinates: {
        x: {
          start: lastCell.coordinates.x.start + newCoords.x.start * this.board.cellSize,
          end: lastCell.coordinates.x.end + newCoords.x.end * this.board.cellSize
        },
        y: {
          start: lastCell.coordinates.y.start + newCoords.y.start * this.board.cellSize,
          end: lastCell.coordinates.y.end + newCoords.y.end * this.board.cellSize
        }
      },
      direction: lastCell.direction
    };
    this.cells.push(newCell);
    this.board.score.increaseCurrent(1);
    this.food.reset();
  }
  getMoveDirection() {
    return new Map([
      [
        Direction.Up,
        { x: { start: 0, end: 0 }, y: { start: -this.board.cellSize, end: -this.board.cellSize } }
      ],
      [
        Direction.Down,
        { x: { start: 0, end: 0 }, y: { start: this.board.cellSize, end: this.board.cellSize } }
      ],
      [
        Direction.Left,
        { x: { start: -this.board.cellSize, end: -this.board.cellSize }, y: { start: 0, end: 0 } }
      ],
      [
        Direction.Right,
        { x: { start: this.board.cellSize, end: this.board.cellSize }, y: { start: 0, end: 0 } }
      ]
    ]);
  }
  stop() {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = 0;
    }
  }
  move() {
    if (!this.requestAnimationId)
      this.requestAnimationId = requestAnimationFrame(() => this.moveAnimation());
  }
  checkCollisionWithSelf() {
    const newHead = this.coordinates;
    if (this.cells.length < 2) {
      return false;
    }
    for (let i = 1; i < this.cells.length; i++) {
      const cell = this.cells[i].coordinates;
      if (
        newHead.x.start >= cell.x.start &&
        newHead.x.end <= cell.x.end &&
        newHead.y.start >= cell.y.start &&
        newHead.y.end <= cell.y.end
      ) {
        return true;
      }
    }
    return false;
  }
  moveAnimation() {
    this.requestAnimationId = requestAnimationFrame(() => this.moveAnimation());
    this.clearCell(this.coordinates);
    this.cells.forEach((cell) => {
      this.clearCell(cell.coordinates);
    });
    this.ctx.fillStyle = this.color;
    this.moveCounter++;
    if (this.checkFoodCollision()) {
      this.eatFood();
      if (this.moveCounterStep > 0) this.moveCounterStep--;
    }
    if (this.moveCounter > this.moveCounterStep) {
      if (this.checkWallCollision() && !this.checkCollisionWithSelf()) {
        const direction = this.getMoveDirection().get(this.direction);
        if (!direction) return;
        this.moveCells(
          {
            x: {
              start: this.coordinates.x.start + direction.x.start,
              end: this.coordinates.x.end + direction.x.end
            },
            y: {
              start: this.coordinates.y.start + direction.y.start,
              end: this.coordinates.y.end + direction.y.end
            }
          },
          this.direction
        );
      } else {
        this.stop();
        this.reset();
        this.food.reset();
        this.moveCounterStep = Constants.DEFAULT_SNAKE_MOVE_COUNTER_STEP;
      }
      this.moveCounter = 0;
    }
    this.renderSnake();
  }

  reset() {
    this.setNewCoordinates();
    this.board.score.resetScore();
    this.board.setDisplayForGameMessage('block');
    this.cells = [];
    this.renderSnake();
  }
}
