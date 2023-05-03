import Constants from '../constants/constants';
import GameObject from './game-object.module';
import { Coordinates, FoodInterface } from '../interfaces/game-object.interface';
import BoardInterface from '../interfaces/board.interface';

export default class Food extends GameObject implements FoodInterface {
  constructor(
    board: BoardInterface,
    ctx: CanvasRenderingContext2D,
    coordinates: Coordinates,
    color = Constants.DEFAULT_FOOD_COLOR
  ) {
    super(board, ctx, coordinates, color);
    this.render();
  }
}
