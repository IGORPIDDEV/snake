import Constants from '../constants/constants';
import BoardInterface from '../interfaces/board.interface';
import { GameObjectInterface, Coordinates } from '../interfaces/game-object.interface';
import { generateRandomCoordinates } from '../utils/utils';

export default class GameObject implements GameObjectInterface {
  public ctx: CanvasRenderingContext2D;
  public board: BoardInterface;
  public coordinates: Coordinates;
  public color: string;

  constructor(
    board: BoardInterface,
    ctx: CanvasRenderingContext2D,
    coordinates: Coordinates,
    color: string = Constants.DEFAULT_COLOR
  ) {
    this.board = board;
    this.ctx = ctx;
    this.coordinates = coordinates;
    this.color = color;
  }
  render(color = this.color) {
    this.ctx.fillStyle = color;
    this.renderCell(this.coordinates);
  }
  renderCell(coordinates: Coordinates, color = this.color) {
    if (!('x' in coordinates) || !('y' in coordinates)) {
      throw new Error('Invalid coordinates object passed to renderCell method');
    }
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...this.getFillRectData(coordinates));
  }
  clear() {
    this.ctx.clearRect(...this.getFillRectData(this.coordinates));
  }
  clearCell(coordinates: Coordinates) {
    if (!('x' in coordinates) || !('y' in coordinates)) {
      throw new Error('Invalid coordinates object passed to clearCell method');
    }
    this.ctx.clearRect(...this.getFillRectData(coordinates));
  }
  getFillRectData(coordinates: Coordinates) {
    return [
      coordinates.x.start,
      coordinates.y.start,
      this.board.cellSize,
      this.board.cellSize
    ] as const;
  }
  setNewCoordinates() {
    this.coordinates = generateRandomCoordinates(
      this.board.canvas.width,
      this.board.canvas.height,
      this.board.cellSize
    );
  }
  reset() {
    this.clear();
    this.setNewCoordinates();
    this.render();
  }
}
