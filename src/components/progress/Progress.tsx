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
import { GesturesController } from "../../controllers/gesture-controller";


const gesturesController = new GesturesController();

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

  const seek = useCallback((x: number) => {
    if (rectangleController && controller) {
      const seekingValue = calculateCurrentTimeByCursorPosition(
        rectangleController,
        x,
        controller.getDuration()
      );

      controller.seek(seekingValue);
      window.requestAnimationFrame(updateProgressBar);
    }
  }, [controller, rectangleController, updateProgressBar])

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      seek(event.clientX)
    },
    [seek]
  );

  const renderFramePreview = useCallback(
    (x: number) => {
      const framePreviewElement = framePreviewRef.current;

      const updatePosition = () => {
        if (rectangleController && framePreviewElement) {
          const cursorPosition = calculateCursorPosition(rectangleController, x);
  
          const currentTime = calculateCurrentTimeByCursorPosition(
            rectangleController,
            x,
            framePreviewElement.duration
          );
  
          const leftPadding = rectangleController.getLeftPadding();
  
          framePreviewElement.currentTime = currentTime;
          framePreviewElement.style.left = `${cursorPosition - 50 + leftPadding
            }px`;
        }
      }

      window.requestAnimationFrame(updatePosition)
    },
    [rectangleController]
  );

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      renderFramePreview(event.clientX);
    },
    [renderFramePreview]
  );

  const setFramePreviewVisible = useCallback(() => {
    const framePreviewElement = framePreviewRef.current;

    if (framePreviewElement) {
      framePreviewRef.current.style.visibility = "initial";
    }
  }, []);

  const hideFramePreview = useCallback(() => {
    const framePreviewElement = framePreviewRef.current;

    if (framePreviewElement) {
      framePreviewRef.current.style.visibility = "hidden";
    }
  }, []);

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];

      const x = touch.clientX;
      gesturesController.setLastFingerPosition(x);
      renderFramePreview(x)
    }
  }, [renderFramePreview])

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = useCallback((event) => {
    gesturesController.touch();

    if (event.touches.length === 1) {
      const touch = event.touches[0];

      const x = touch.clientX;
      gesturesController.setLastFingerPosition(x);
    }

    event.preventDefault();
    event.stopPropagation();
    setFramePreviewVisible();
  }, [setFramePreviewVisible])

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = useCallback(() => {
    console.log('touch end', gesturesController.getLastFingerPosition())
    gesturesController.touchEnd();

    seek(gesturesController.getLastFingerPosition())
    hideFramePreview()
  }, [hideFramePreview, seek])

  return (
    <StripValueWrapper
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={setFramePreviewVisible}
      onMouseLeave={hideFramePreview}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchMove}
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
