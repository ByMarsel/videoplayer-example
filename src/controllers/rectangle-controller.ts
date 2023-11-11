export class RectangleController {
  private readonly element: HTMLElement;
  private width: number = 0;
  private left: number = 0;
  private leftPadding: number = 0;

  private boundUpdate: () => void;

  constructor(element: HTMLElement) {
    this.element = element;
    this.boundUpdate = this.update.bind(this);
   
    window.addEventListener("resize", this.boundUpdate);
    window.queueMicrotask(this.boundUpdate);
  }

  getWidth() {
    return this.width;
  }

  getLeftOffset() {
    return this.left;
  }

  getLeftPadding() {
    return this.leftPadding;
  }

  dispose() {
    window.removeEventListener("resize", this.boundUpdate);
  }

  private update() {
    const domRect = this.element.getBoundingClientRect();
    
    this.leftPadding = this.element.offsetLeft;
    this.width = domRect.width;
    this.left = domRect.left;
  }
}
