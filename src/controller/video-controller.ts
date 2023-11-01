export class VideoController {
  private element: HTMLVideoElement;

  private isPausingBlocked = false;

  private cachedVolume = 0.5;

  private runRender: () => void;

  constructor(el: HTMLVideoElement, forceUpdate: () => void) {
    this.element = el;
    this.runRender = forceUpdate;

    el.addEventListener('play', this.runRender)
    el.addEventListener('pause', this.runRender);
    el.addEventListener('ended', this.runRender);
    el.addEventListener('playing', this.runRender);
    el.addEventListener('waiting', this.runRender);
    el.addEventListener('durationchange', this.runRender);
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

  mute() {
    this.cachedVolume = this.element.volume;

    this.element.volume = 0;
  }

  unmute() {
    this.element.volume = this.cachedVolume;
  }

  reset() {
    this.element.currentTime = 0;
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
    if(!this.element.paused) {
      return 'playing'
    }

    if (this.element.ended) {
      return 'ended';
    }

    return 'paused';
  }

  getDuration() {
     return this.element.duration;
  }

}
