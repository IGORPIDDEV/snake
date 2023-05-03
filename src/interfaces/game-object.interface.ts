import BoardInterface from './board.interface';
import { Direction } from '../types/snake';

export interface Coordinates {
  x: {
    start: number;
    end: number;
  };
  y: {
    start: number;
    end: number;
  };
}

export interface GameObjectInterface {
  ctx: CanvasRenderingContext2D;
  board: BoardInterface;
  coordinates: Coordinates;
  color: string;

  render(): void;
  renderCell(coordinates: Coordinates): void;
  clear(): void;
  clearCell(coordinates: Coordinates): void;
  getFillRectData(coordinates: Coordinates): void;
  setNewCoordinates(): void;
  reset(): void;
}

export interface SnakeInterface extends GameObjectInterface {
  speed: number;
  direction: Direction;
  moveCounter: number;
  food: FoodInterface;
  requestAnimationId: number;
  headImage: HTMLImageElement;
  cells: {
    coordinates: Coordinates;
    direction: Direction;
  }[];

  render(): void;
  setDirection(direction: Direction): void;
  checkWallCollision(): boolean;
  checkFoodCollision(): boolean;
  move(): void;
  reset(): void;
  stop(): void;
}
export type FoodInterface = GameObjectInterface;
