export class GesturesController {
    private touchStarted = false;
    private lastFingerPositionX = 0;
    private timeoutId = 0; 

    touch() {
        window.clearTimeout(this.timeoutId)
        this.touchStarted = true;
    }

    touchEnd() {
        this.timeoutId = window.setTimeout(() => {
            this.touchStarted = false;
        }, 300)
    }

    getTouchStarted() {
        return this.touchStarted;
    }

    setLastFingerPosition(x: number) {
        this.lastFingerPositionX = x;
    }

    getLastFingerPosition() {
        return this.lastFingerPositionX;
    }
}