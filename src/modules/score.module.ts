import ScoreInterface from '../interfaces/score.interface';

export default class Score implements ScoreInterface {
  public best: number;
  public current: number;
  public bestScoreId = '.score__value--best';
  public currentScoreId = '.score__value--current';

  constructor() {
    this.best = this.loadBest();
    this.current = 0;

    this.renderScore(this.bestScoreId, this.best);
  }

  loadBest(): number {
    const best = localStorage.getItem('bestScore');
    return best ? parseInt(best) : 0;
  }

  saveBest(score: number) {
    localStorage.setItem('bestScore', String(score));
  }

  increaseCurrent(score: number) {
    this.current += score;
    this.renderScore(this.currentScoreId, this.current);
  }

  resetScore() {
    if (this.current > this.best) {
      this.setBest(this.current);
    }
    this.current = 0;
    this.renderScore(this.currentScoreId, this.current);
  }

  setBest(score: number) {
    this.best = score;
    this.renderScore(this.bestScoreId, score);
    this.saveBest(score);
  }

  resetBest() {
    this.setBest(0);
  }

  renderScore(element: string, score: number) {
    const scoreElement = document.querySelector(element) as HTMLCanvasElement;
    if (scoreElement) scoreElement.innerText = String(score);
  }
}
