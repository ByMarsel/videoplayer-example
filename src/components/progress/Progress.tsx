import { FC, useCallback, useEffect, useRef } from "react";
import {
  ProgressWrapper,
  ProgressBar,
  ProgressPlaceholder,
} from "./Progress.styles";
import { VideoController } from "../../controller/video-controller";

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
      controller.subscribe(runTask);
    }
  }, [controller, runTask]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {

      //refactor me
      const localX = event.clientX - event.currentTarget.offsetLeft - 8;

      if (controller) {
        const duraiton = controller.getDuration() / 100;
        const width = 100 / (event.currentTarget.clientWidth);

        controller.seek(Math.min(Math.round(width * localX * duraiton), controller.getDuration()));
        
        window.cancelAnimationFrame(progressTaskRef.current);
        progressTaskRef.current= -1;
        updateProgressBar();
      }
    },
    [controller, updateProgressBar]
  );

  return (
    <ProgressWrapper onClick={handleClick}>
      <ProgressBar ref={progressRef} />
      <ProgressPlaceholder />
    </ProgressWrapper>
  );
};
