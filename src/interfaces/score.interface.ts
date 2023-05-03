export default interface ScoreInterface {
  best: number;
  current: number;

  loadBest(): number;
  saveBest(score: number): void;
  increaseCurrent(score: number): void;
  resetScore(): void;
  setBest(score: number): void;
  resetBest(): void;
  renderScore(element: string, score: number): void;
}
