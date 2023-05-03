import Constants from '../constants/constants';

const generateRandomCoordinates = (width: number, height: number, cellSize: number) => {
  const xStart = Math.round(Math.random() * (width - cellSize));
  const xStartGrid = Math.round(xStart / 20) * 20;
  const yStart = Math.round(Math.random() * (height - cellSize));
  const yStartGrid = Math.round(yStart / 20) * 20;
  return {
    x: {
      start: xStartGrid,
      end: xStartGrid + Constants.DEFAULT_CELL_SIZE
    },
    y: {
      start: yStartGrid,
      end: yStartGrid + Constants.DEFAULT_CELL_SIZE
    }
  };
};
export { generateRandomCoordinates };
