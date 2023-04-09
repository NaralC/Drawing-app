type Draw = {
  context: CanvasRenderingContext2D;
  curCoor: Coordinates;
  prevCoor: Coordinates | null;
};

type Coordinates = {
  x: number;
  y: number;
};
