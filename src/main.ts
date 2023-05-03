import Game from './modules/game.module';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.game__board--canvas') as HTMLCanvasElement;
  new Game(canvas);
});
