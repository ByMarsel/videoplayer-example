export class VideoController {
  private element: HTMLVideoElement;

  private isPausingBlocked: boolean;

  private playingStateListeners: (() => Promise<void>)[] = [];
  private volumeChangeListeners: (() => Promise<void>)[] = [];
  private seekingListeners: (() => Promise<void>)[] = [];

  private cachedVolume: number;

  constructor(el: HTMLVideoElement) {
    this.element = el;
    this.isPausingBlocked = false;
    this.cachedVolume = 0.5;

    el.addEventListener(
      "play",
      this.emitPlayingStateChangeListeners.bind(this)
    );
    el.addEventListener(
      "pause",
      this.emitPlayingStateChangeListeners.bind(this)
    );
    el.addEventListener(
      "ended",
      this.emitPlayingStateChangeListeners.bind(this)
    );
    el.addEventListener(
      "playing",
      this.emitPlayingStateChangeListeners.bind(this)
    );
    el.addEventListener(
      "waiting",
      this.emitPlayingStateChangeListeners.bind(this)
    );
    el.addEventListener(
      "volumechange",
      this.emitVolumeChangeListeners.bind(this)
    );
    el.addEventListener('seeking', this.emitSeekingListeners.bind(this))

    // don't forget implement unsubscribe;
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
    this.reset();
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

  requestFullsreen() {}

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
    return this.element.volume * 100;
  }

  subscribe(
    event: "playingState" | "durationChange" | "volumeChange" | "seeking",
    callb: () => Promise<void>
  ) {
    // add checking that subscriber doesn't exist

    if (event === "playingState") {
      this.playingStateListeners.push(callb);
    }

    if (event === 'volumeChange') {
      this.volumeChangeListeners.push(callb);
    }

    if (event === 'seeking') {
      this.seekingListeners.push(callb);
    }
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
}
