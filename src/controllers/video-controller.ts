export class VideoController {
  private readonly element: HTMLVideoElement;

  private isPausingBlocked: boolean;

  private playingStateListeners: (() => Promise<void>)[] = [];
  private volumeChangeListeners: (() => Promise<void>)[] = [];
  private seekingListeners: (() => Promise<void>)[] = [];

  private cachedVolume: number;

  private boundEmitPlayingStateChangeListener: () => void;
  private boundEmitVolumeChangeListeners: () => void;
  private boundEmitSeekingListeners: () => void;

  constructor(el: HTMLVideoElement) {
    this.element = el;
    this.isPausingBlocked = false;
    this.cachedVolume = 0.5;

    this.boundEmitPlayingStateChangeListener =
    this.emitPlayingStateChangeListeners.bind(this);
    this.boundEmitVolumeChangeListeners =
    this.emitVolumeChangeListeners.bind(this);
    this.boundEmitSeekingListeners = this.emitSeekingListeners.bind(this);

    el.addEventListener("play", this.boundEmitPlayingStateChangeListener);
    el.addEventListener("pause", this.boundEmitPlayingStateChangeListener);
    el.addEventListener("ended", this.boundEmitPlayingStateChangeListener);
    el.addEventListener("playing", this.boundEmitPlayingStateChangeListener);
    el.addEventListener("waiting", this.boundEmitPlayingStateChangeListener);
    el.addEventListener("volumechange", this.boundEmitVolumeChangeListeners);
    el.addEventListener("seeking", this.boundEmitSeekingListeners);
  }

  play() {
    this.isPausingBlocked = true;

    this.element
      .play()
      .then(() => {
        this.isPausingBlocked = false;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  pause() {
    if (!this.isPausingBlocked) {
      this.element.pause();
    }
  }

  replay() {
    if (this.getPlayingState() !== "ended") {
      this.reset();
    }
    this.play();
  }

  mute() {
    this.cachedVolume = this.element.volume;

    this.element.volume = 0;
  }

  unmute() {
    this.element.volume = this.cachedVolume;
  }

  updateVolume(percent: number) {
    if (percent > 100) {
      this.element.volume = 1;
    } else if (percent < 0) {
      this.element.volume = 0;
    } else {
      this.element.volume = percent * 0.01;
    }
  }

  seek(seconds: number) {
      this.element.currentTime = seconds;
  }

  getPlayingProgress() {
    return this.element.currentTime;
  }

  getPlayingState() {
    if (!this.element.paused) {
      return "playing";
    }

    if (this.element.ended) {
      return "ended";
    }

    return "paused";
  }

  getDuration() {
    return this.element.duration;
  }

  getVolume() {
    return this.element.volume * 1000;
  }

  subscribe(
    event: "playingState" | "volumeChange" | "seeking",
    callb: () => Promise<void>
  ) {
    // add checking that subscriber doesn't exist

    if (event === "playingState") {
      this.playingStateListeners.push(callb);
    }

    if (event === "volumeChange") {
      this.volumeChangeListeners.push(callb);
    }

    if (event === "seeking") {
      this.seekingListeners.push(callb);
    }
  }

  getVideoSrc() {
    return this.element.src;
  }

  private reset() {
    this.element.currentTime = 0;
  }

  private emitPlayingStateChangeListeners() {
    try {
      this.playingStateListeners.map((s) => s());
    } catch (e) {
      console.error(e);
    }
  }

  private emitVolumeChangeListeners() {
    try {
      this.volumeChangeListeners.map((s) => s());
    } catch (e) {
      console.error(e);
    }
  }

  private emitSeekingListeners() {
    try {
      this.seekingListeners.map((s) => s());
    } catch (e) {
      console.error(e);
    }
  }

  dispose() {
    const el = this.element;

    el.removeEventListener("play", this.boundEmitPlayingStateChangeListener);
    el.removeEventListener("pause", this.boundEmitPlayingStateChangeListener);
    el.removeEventListener("ended", this.boundEmitPlayingStateChangeListener);
    el.removeEventListener("playing", this.boundEmitPlayingStateChangeListener);
    el.removeEventListener("waiting", this.boundEmitPlayingStateChangeListener);
    el.removeEventListener("volumechange", this.boundEmitVolumeChangeListeners);
    el.removeEventListener("seeking", this.boundEmitSeekingListeners);
  }
}
