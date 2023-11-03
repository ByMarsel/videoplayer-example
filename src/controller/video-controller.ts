export class VideoController {
  private element: HTMLVideoElement;

  private isPausingBlocked: boolean;

  private subscribers: (() => Promise<void>)[];

  private cachedVolume: number;

  constructor(el: HTMLVideoElement) {
    this.element = el;
    this.isPausingBlocked = false;
    this.subscribers = [];
    this.cachedVolume = 0.5;

    el.addEventListener("play", this.emitListeners.bind(this));
    el.addEventListener("pause", this.emitListeners.bind(this));
    el.addEventListener("ended", this.emitListeners.bind(this));
    el.addEventListener("playing", this.emitListeners.bind(this));
    el.addEventListener("waiting", this.emitListeners.bind(this));
    el.addEventListener("durationchange", this.emitListeners.bind(this));

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
    this.replay();
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

  subscribe(callb: () => Promise<void>) {
    // add checking that subscriber doesn't exist
    this.subscribers.push(callb);
  }

  private reset() {
    this.element.currentTime = 0;
  }

  private emitListeners() {
    try {
      this.subscribers.map((s) => s());
    } catch (e) {
      console.error(e);
    }
  }
}
