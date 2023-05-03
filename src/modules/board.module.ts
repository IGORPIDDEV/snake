import Constants from '../constants/constants';
import BoardInterface from '../interfaces/board.interface';
import ScoreInterface from '../interfaces/score.interface';

export default class Board implements BoardInterface {
  public canvas: HTMLCanvasElement;
  public cellSize: number;
  public columnsCount: number;
  public rowsCount: number;
  public score: ScoreInterface;

  constructor(
    canvas: HTMLCanvasElement,
    score: ScoreInterface,
    cellSize: number = Constants.DEFAULT_CELL_SIZE,
    columnsCount: number = Constants.DEFAULT_COLUMNS_COUNT,
    rowsCount: number = Constants.DEFAULT_ROWS_COUNT
  ) {
    this.canvas = canvas;
    this.cellSize = cellSize;
    this.columnsCount = columnsCount;
    this.rowsCount = rowsCount;
    this.score = score;
    this.render();
  }

  render() {
    this.canvas.width = this.cellSize * this.columnsCount;
    this.canvas.height = this.cellSize * this.rowsCount;
  }

  setDisplayForGameMessage(display: 'none' | 'block') {
    const element = document.querySelector('.game__start') as HTMLDivElement;
    if (element) element.style.display = display;
  }
}
