import { RectangleController } from "../../controllers/rectangle-controller";

export const calculateCursorPosition = (
  rectangleController: RectangleController,
  x: number
) => {
  const offsetLeft = rectangleController.getLeftOffset();
  return x - offsetLeft;
};

export const calculateCursorPositionInPercents = (
  rectangleController: RectangleController,
  x: number
) => {
  const widthInPercents = 100 / rectangleController.getWidth();

  return (
    widthInPercents * calculateCursorPosition(rectangleController, x)
  );
};

export const calculateCurrentTimeByCursorPosition = (
  rectangleController: RectangleController,
  x: number,
  duration: number
) => {
  const normalizedPercent =
    calculateCursorPositionInPercents(rectangleController, x) / 100;

  return Math.min(duration * normalizedPercent, duration);
};
