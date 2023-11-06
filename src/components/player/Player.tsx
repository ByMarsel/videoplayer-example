import { useCallback, useEffect, useState } from "react";
import {
  PlayPauseButton,
  ProgressAndTimerContainer,
  StyledContainer,
  StyledControls,
  StyledPlayer,
} from "./Player.styles";
import { VideoController } from "../../controller/video-controller";
import { Progress } from "../progress/Progress";
import { Timer } from "../timer/Timer";
import { Volume } from "../volume/Volume";

export const Player = () => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  const [controller, setController] = useState<VideoController | null>(null);
  const [playingState, setPlayingState] = useState<
    "playing" | "paused" | "ended"
  >("paused");

  useEffect(() => {
    if (element) {
      const newVideoController = new VideoController(element);
      setController(newVideoController);
      // add controller clearing
    }
  }, [element]);

  useEffect(() => {
    if (controller) {
      controller.subscribe("playingState", async () => {
        setPlayingState(controller.getPlayingState());
      });
      controller.subscribe("seeking", async () =>
        setPlayingState(controller.getPlayingState())
      );
    }
  }, [controller]);

  const handlePlay = useCallback(() => {
    controller?.play();
  }, [controller]);

  const handlePause = useCallback(() => {
    controller?.pause();
  }, [controller]);

  const handlePlayAgain = useCallback(() => {
    controller?.replay();
  }, [controller]);

  return (
    <StyledContainer>
      <StyledPlayer
        playsInline
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
          <Progress controller={controller} />
          <Timer controller={controller} />
        </ProgressAndTimerContainer>
        <Volume controller={controller} />
      </StyledControls>
    </StyledContainer>
  );
};
