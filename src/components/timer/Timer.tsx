import { FC, useCallback, useEffect, useRef } from "react";
import { Time } from "./Timer.styles";
import { VideoController } from "../../controllers/video-controller";
import { formatCurrentVideoTime } from "./utils";

interface Props {
  controller: VideoController | null;
}

export const Timer: FC<Props> = ({ controller }) => {
  const timerRef = useRef<HTMLDivElement>(null);

  const updateCurrentVideoTime = useCallback(() => {
    const timeEl = timerRef.current;

    if (timeEl?.textContent) {
      timeEl.textContent = formatCurrentVideoTime(
        controller?.getPlayingProgress() || 0
      );
    }
  }, [controller]);

  useEffect(() => {
    if (controller) {
      controller.subscribe("seeking", async () => {
        updateCurrentVideoTime();
      });
    }
  }, [controller, updateCurrentVideoTime]);

  const runTask = useCallback(async () => {
    const task = () => {
      updateCurrentVideoTime();

      if (controller?.getPlayingState() === "playing") {
        window.requestAnimationFrame(task);
      }
    };

    window.requestAnimationFrame(task);
  }, [controller, updateCurrentVideoTime]);

  useEffect(() => {
    if (controller) {
      controller.subscribe("playingState", runTask);
    }
  }, [controller, runTask]);

  return <Time ref={timerRef}>0:00</Time>;
};
