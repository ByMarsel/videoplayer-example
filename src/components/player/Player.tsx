import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FirstPlayOverlay,
  FirstPlayButton,
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

interface Props {
  src: string;
}

export const Player: FC<Props> = ({src}) => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  const [controller, setController] = useState<VideoController | null>(null);
  const [playingState, setPlayingState] = useState<
    "playing" | "paused" | "ended"
  >("paused");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [wasFirstPlayed, setWasFirstPlayed] = useState<boolean>(false);

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
        if (
          element &&
          (element as any)?.webkitSupportsPresentationMode("fullscreen")
        ) {
          (element as any)?.webkitSetPresentationMode("fullscreen");
        }
      }
    }, [element]);

  const handleContainerClick = useCallback(() => {
    if (controller?.getPlayingState() === "paused") {
      setWasFirstPlayed(true);
      controller?.play();
    }

    if (controller?.getPlayingState() === "playing") {
      controller?.pause();
    }
  }, [controller]);

  const handleControllsClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <StyledContainer onClick={handleContainerClick} ref={containerRef}>
      {!wasFirstPlayed && (
        <FirstPlayOverlay>
          <FirstPlayButton>Click to Play</FirstPlayButton>
        </FirstPlayOverlay>
      )}
      <StyledPlayer
        playsInline
        preload="metadata"
        ref={setElement}
        src={src}
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
