import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VideoController } from "../../controllers/video-controller";
import {
  StripValue,
  StripValuePlaceholder,
  StripValueWrapper,
} from "../../styles/common.styles";
import { RectangleController } from "../../controllers/rectangle-controller";
import {
  calculateCurrentTimeByCursorPosition,
  calculateCursorPosition,
} from "./utils";
import { FramePreview } from "./Progress.styles";

interface Props {
  controller: VideoController | null;
}

export const Progress: FC<Props> = ({ controller }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const framePreviewRef = useRef<HTMLVideoElement>(null);

  const [rectangleController, setRectangleController] =
    useState<RectangleController | null>(null);

  useEffect(() => {
    if (placeholderRef.current) {
      setRectangleController(new RectangleController(placeholderRef.current));
    }
  }, []);

  const updateProgressBar = useCallback(() => {
    const progressEl = progressRef.current;

    if (progressEl) {
      const videoProgress = controller?.getPlayingProgress() || 0;
      const duration = controller?.getDuration();

      if (duration) {
        progressEl.style.width = `${(100 / duration) * videoProgress}%`;
      }
    }
  }, [controller]);

  const runTask = useCallback(async () => {
    const task = () => {
      updateProgressBar();

      if (controller?.getPlayingState() === "playing") {
        window.requestAnimationFrame(task);
      }
    };

    window.requestAnimationFrame(task);
  }, [controller, updateProgressBar]);

  useEffect(() => {
    if (controller) {
      controller.subscribe("playingState", runTask);
    }
  }, [controller, runTask]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (rectangleController && controller) {
        const seekingValue = calculateCurrentTimeByCursorPosition(
          rectangleController,
          event,
          controller.getDuration()
        );

        controller.seek(seekingValue);
        updateProgressBar();
      }
    },
    [controller, rectangleController, updateProgressBar]
  );

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const framePreviewElement = framePreviewRef.current;

      if (rectangleController && framePreviewElement) {
        const cursorPosition = calculateCursorPosition(
          rectangleController,
          event
        );

        const currentTime = calculateCurrentTimeByCursorPosition(
          rectangleController,
          event,
          framePreviewElement.duration
        );

        const leftPadding = rectangleController.getLeftPadding();

        framePreviewElement.currentTime = currentTime;
        framePreviewElement.style.left = `${cursorPosition - 50 + leftPadding}px`;
      }
    },
    [rectangleController]
  );

  const handleMouseEnter = useCallback(() => {
    const framePreviewElement = framePreviewRef.current;

    if (framePreviewElement) {
      framePreviewRef.current.style.zIndex = "initial";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const framePreviewElement = framePreviewRef.current;

    if (framePreviewElement) {
      framePreviewRef.current.style.zIndex = "-1000";
    }
  }, []);

  return (
    <StripValueWrapper
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StripValue ref={progressRef} />
      <StripValuePlaceholder ref={placeholderRef} />
      <FramePreview
        muted
        preload="metadata"
        src={controller?.getVideoSrc()}
        ref={framePreviewRef}
      />
    </StripValueWrapper>
  );
};
