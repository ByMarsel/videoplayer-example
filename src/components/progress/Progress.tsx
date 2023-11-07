import { FC, useCallback, useEffect, useRef } from "react";
import { VideoController } from "../../controllers/video-controller";
import {
  StripValue,
  StripValuePlaceholder,
  StripValueWrapper,
} from "../../styles/common.styles";
import { STRIPE_CONTAINER_PADDINGS } from "../../styles/constants";

interface Props {
  controller: VideoController | null;
}

export const Progress: FC<Props> = ({ controller }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTaskRef = useRef<number>(-1);

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
        progressTaskRef.current = window.requestAnimationFrame(task);
      }
    };

    progressTaskRef.current = window.requestAnimationFrame(task);
  }, [controller, updateProgressBar]);

  useEffect(() => {
    if (controller) {
      controller.subscribe("playingState", runTask);
    }
  }, [controller, runTask]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const localX =
        event.clientX -
        event.currentTarget.offsetLeft -
        STRIPE_CONTAINER_PADDINGS;

      if (controller) {
        const duraiton = controller.getDuration() / 100;
        const width = 100 / (event.currentTarget.clientWidth - STRIPE_CONTAINER_PADDINGS);

        const seekingValue = Math.min(
          width * localX * duraiton,
          controller.getDuration()
        );

        controller.seek(seekingValue);

        window.cancelAnimationFrame(progressTaskRef.current);
        progressTaskRef.current = -1;
        updateProgressBar();
      }
    },
    [controller, updateProgressBar]
  );

  return (
    <StripValueWrapper onClick={handleClick}>
      <StripValue ref={progressRef} />
      <StripValuePlaceholder />
    </StripValueWrapper>
  );
};
