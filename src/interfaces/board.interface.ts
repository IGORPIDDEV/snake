import ScoreInterface from './score.interface';

export default interface BoardInterface {
  canvas: HTMLCanvasElement;
  cellSize: number;
  columnsCount: number;
  rowsCount: number;
  score: ScoreInterface;

  render(): void;
  setDisplayForGameMessage(display: 'none' | 'block'): void;
}
