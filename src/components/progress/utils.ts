import { RectangleController } from "../../controllers/rectangle-controller";

export const calculateCursorPosition = (
  rectangleController: RectangleController,
  mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const offsetLeft = rectangleController.getLeftOffset();
  return mouseEvent.clientX - offsetLeft;
};

export const calculateCursorPositionInPercents = (
  rectangleController: RectangleController,
  mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const onePercentWidth = 100 / rectangleController.getWidth();

  return (
    onePercentWidth * calculateCursorPosition(rectangleController, mouseEvent)
  );
};

export const calculateCurrentTimeByCursorPosition = (
  rectangleController: RectangleController,
  mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>,
  duration: number
) => {
  const normalizedPercent =
    calculateCursorPositionInPercents(rectangleController, mouseEvent) / 100;

  return Math.min(duration * normalizedPercent, duration);
};
