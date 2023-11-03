import { FC, useCallback, useEffect, useRef } from "react";
import { ProgressWrapper, ProgressBar, ProgressPlaceholder } from "./Progress.styles";
import { VideoController } from "../../controller/video-controller";

interface Props {
  controller: VideoController | null;
}

export const Progress: FC<Props> = ({ controller }) => {
  const progressRef = useRef<HTMLDivElement>(null);

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
    if(controller) {
     controller.subscribe(runTask)
    }
  }, [controller, runTask])

  return (
    <ProgressWrapper>
      <ProgressBar ref={progressRef} />
      <ProgressPlaceholder />
    </ProgressWrapper>
  );
};
