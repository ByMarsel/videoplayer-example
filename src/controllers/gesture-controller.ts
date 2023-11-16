export class GesturesController {
    private touchStarted = false;
    private lastFingerPositionX = 0;

    touch() {
        this.touchStarted = true;
    }

    touchEnd() {
        this.touchStarted = false;
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