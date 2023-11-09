import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FullscreenButton,
  PlayPauseButton,
  ProgressAndTimerContainer,
  StyledContainer,
  StyledControls,
  StyledPlayer,
} from "./Player.styles";
import { VideoController } from "../../controllers/video-controller";
import { Progress } from "../progress/Progress";
import { Timer } from "../timer/Timer";
import { Volume } from "../volume/Volume";
import screenfull from "screenfull";

export const Player = () => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  const [controller, setController] = useState<VideoController | null>(null);
  const [playingState, setPlayingState] = useState<
    "playing" | "paused" | "ended"
  >("paused");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        setIsFullscreen(screenfull.isFullscreen);
      });
    }
  }, []);

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

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleFullscreen: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (screenfull.isEnabled) {
        if (containerRef.current) {
          screenfull.toggle(containerRef.current);
        }
      } else {
        if (element && (element as any)?.webkitSupportsPresentationMode('fullscreen')) {
          (element as any)?.webkitSetPresentationMode("fullscreen");
        }
      }
    }, [element]);

  const handleContainerClick = useCallback(() => {
    if (playingState === "paused") {
      controller?.play();
    }
    if (playingState === "playing") {
      controller?.pause();
    }
  }, [controller, playingState]);

  const handleControllsClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <StyledContainer onClick={handleContainerClick} ref={containerRef}>
      <StyledPlayer
        playsInline
        ref={setElement}
        src="https://res.cloudinary.com/dl2xrqyxj/video/upload/v1698955137/l16kb1blwckvbchvkiff.mp4"
      />
      <StyledControls onClick={handleControllsClick}>
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
        <FullscreenButton onClick={handleToggleFullscreen}>
          {isFullscreen ? "]  [" : "[  ]"}
        </FullscreenButton>
      </StyledControls>
    </StyledContainer>
  );
};
