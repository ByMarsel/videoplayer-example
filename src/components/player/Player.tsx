import { useCallback, useEffect, useRef, useState } from "react";
import {
  PlayPauseButton,
  Progress,
  ProgressAndTimerContainer,
  ProgressWrapper,
  StyledContainer,
  StyledControls,
  StyledPlayer,
  Time,
} from "./Player.styles";
import { VideoController } from "../../controller/video-controller";
import { formatCurrentVideoTime } from "../../controller/utils";

export const Player = () => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  const [controller, setController] = useState<VideoController | null>(null);
  const [, updateState] = useState<number>(0);

  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const playingState = controller?.getPlayingState() || "paused";

  const forceUpdate = useCallback(() => {
    updateState((prevState) => prevState + 1);
  }, []);

  useEffect(() => {
    if (element) {
      setController(new VideoController(element, forceUpdate));
    }
  }, [element, forceUpdate]);

  const updateCurrentVideoTime = useCallback(() => {
    const timeEl = timerRef.current;

    if (timeEl?.textContent) {
      timeEl.textContent = formatCurrentVideoTime(
        controller?.getPlayingProgress() || 0
      );
    }
  }, [controller]);

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

  const progressUpdateTask = useCallback(() => {
    const task = () => {
      updateProgressBar();
      updateCurrentVideoTime();

      if (controller?.getPlayingState() === "playing") {
        window.requestAnimationFrame(task);
      }
    };

    window.requestAnimationFrame(task);
  }, [controller, updateCurrentVideoTime, updateProgressBar]);

  useEffect(() => {
    if (playingState === "playing") {
      progressUpdateTask();
    }
  }, [playingState, progressUpdateTask]);

  const handlePlay = useCallback(() => {
    controller?.play();
    progressUpdateTask();
  }, [controller, progressUpdateTask]);

  const handlePause = useCallback(() => {
    controller?.pause();
  }, [controller]);

  const handlePlayAgain = useCallback(() => {
    controller?.reset();
    controller?.play();
  }, [controller]);

  return (
    <StyledContainer>
      <StyledPlayer
        ref={setElement}
        src="https://res.cloudinary.com/dl2xrqyxj/video/upload/v1698955137/l16kb1blwckvbchvkiff.mp4"
      />
      <StyledControls>
        <div>
          {playingState === "paused" && (
            <PlayPauseButton onClick={handlePlay}>play</PlayPauseButton>
          )}
          {playingState === "playing" && (
            <PlayPauseButton onClick={handlePause}>pause</PlayPauseButton>
          )}
          {playingState === "ended" && (
            <PlayPauseButton onClick={handlePlayAgain}>replay</PlayPauseButton>
          )}
        </div>
        <ProgressAndTimerContainer>
          <ProgressWrapper>
            <Progress ref={progressRef} />
          </ProgressWrapper>
          <Time ref={timerRef}>0</Time>
        </ProgressAndTimerContainer>
      </StyledControls>
    </StyledContainer>
  );
};
