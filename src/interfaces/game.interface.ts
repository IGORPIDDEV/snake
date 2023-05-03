import BoardInterface from './board.interface';
import { SnakeInterface, FoodInterface } from './game-object.interface';
import ScoreInterface from './score.interface';

export default interface GameInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  board: BoardInterface;
  snake: SnakeInterface;
  food: FoodInterface;
  score: ScoreInterface;
}
