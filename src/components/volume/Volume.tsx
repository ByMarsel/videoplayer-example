import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VideoController } from "../../controllers/video-controller";
import { StyledStripValueWrapper, StyledStripeValue } from "./Volume.styles";
import { StripValuePlaceholder } from "../../styles/common.styles";
import { RectangleController } from "../../controllers/rectangle-controller";
import { calculateCursorPositionInPercents } from "../progress/utils";

interface Props {
  controller: VideoController | null;
}

export const Volume: FC<Props> = ({ controller }) => {
  const [rectController, setRectController] =
    useState<RectangleController | null>();

  const volumeRef = useRef<HTMLDivElement>(null);
  const placeHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (placeHolderRef.current) {
      setRectController(new RectangleController(placeHolderRef.current));
    }
  }, []);

  useEffect(() => {
    if (volumeRef.current && controller) {
      volumeRef.current.style.width = `${controller.getVolume() * 100}%`;
    }
  }, [controller]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (rectController && controller) {
        const volume = calculateCursorPositionInPercents(rectController, event);

        if (volumeRef.current) {
          volumeRef.current.style.width = `${Math.max(volume, 0)}%`;
        }

        controller.updateVolume(volume);
      }
    },
    [controller, rectController]
  );

  return (
    <StyledStripValueWrapper onClick={handleClick}>
      <StyledStripeValue ref={volumeRef} />
      <StripValuePlaceholder ref={placeHolderRef} />
    </StyledStripValueWrapper>
  );
};
