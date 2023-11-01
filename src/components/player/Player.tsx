import { useCallback, useEffect, useRef, useState } from "react";
import { StyledPlayer } from "./Player.styles";
import { VideoController } from "../../controller/video-controller";

export const Player = () => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  const [controller, setController] = useState<VideoController | null>(null);
  const [, updateState] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null);

  const forceUpdate = useCallback(() => {
    updateState((prevState) => prevState+1);
  }, []);

  useEffect(() => {
    if (element) {
      setController(new VideoController(element, forceUpdate));
    }
  }, [element, forceUpdate]);

  const handlePlay = useCallback(() => {
    controller?.play();

    const task = () => {
      if (progressRef.current?.textContent) {
        (progressRef.current.textContent as any) = controller?.getPlayingProgress();
      }
      if (timerRef.current?.textContent) {
        (timerRef.current.textContent as any) = (controller?.getPlayingProgress() || 1) / 60;
      }

      if (controller?.getPlayingState() === 'playing') {
          window.requestAnimationFrame(task)
      }
  }

    window.requestAnimationFrame(task);
  }, [controller])

  const handlePause = useCallback(() => {
    controller?.pause();
  }, [controller])

  const handlePlayAgain = useCallback(() => {
    controller?.reset();
    controller?.play();


    const task = () => {
      if (progressRef.current?.textContent) {
        (progressRef.current.textContent as any) = controller?.getPlayingProgress();
      }

      if (controller?.getPlayingState() === 'playing') {
          window.requestAnimationFrame(task)
      }
  }

    window.requestAnimationFrame(task);
  }, [controller])

  const playingState = controller?.getPlayingState() || 'paused';

  return (
    <>
      <StyledPlayer
        ref={setElement}
        src="https://www.shutterstock.com/shutterstock/videos/1069358941/preview/stock-footage-water-drops-flying-in-super-slow-motion-k.mp4"
      />
     {playingState === 'paused' && <button onClick={handlePlay}>play</button>}
     {playingState === 'playing' && <button onClick={handlePause}>pause</button>}
     {playingState === 'ended' && <button onClick={handlePlayAgain}>play again</button>}
     <div ref={progressRef}>0</div>
     <div ref={timerRef}>0</div>
    </>
  );
};
