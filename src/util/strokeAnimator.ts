export class StrokeAnimator {
  private paths: NodeListOf<SVGPathElement>;
  private index: number;
  private scale: number;
  private requestFrameId: number;

  private currOffset: number;
  private currLength: number;
  private currStart: number;

  constructor(svgEl: SVGSVGElement) {
    this.paths = svgEl.querySelectorAll("path");
    this.index = this.paths.length;

    this.scale = svgEl.width.baseVal.value;

    for (let i = 0; i < this.index; i++) {
      const path = this.paths[i];
      const length = path.getTotalLength();
      path.style.strokeDasharray = length.toString();
    }
  }

  private setup() {
    for (let i = 0; i < this.index; i++) {
      const path = this.paths[i];
      path.style.strokeDashoffset = path.style.strokeDasharray;
      // path.style.display = "none";
    }
  }

  public animatePath() {
    // Finish previous animation immediately
    if (this.requestFrameId) {
      cancelAnimationFrame(this.requestFrameId);
      const path = this.paths[this.index];
      path.style.strokeDashoffset = "0";
      this.index++;
      this.requestFrameId = null;
      return;
    }

    if (this.index === this.paths.length) {
      this.setup();
      this.index = 0;
    }

    const path = this.paths[this.index];
    // path.style.display = "block";

    this.currLength = path.getTotalLength();
    this.currOffset = this.currLength;
    this.currStart = performance.now();

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }

  private pathFrame(time) {
    const path = this.paths[this.index];

    this.currOffset = Math.max(
      this.currLength - this.scale * ((time - this.currStart) / 500),
      0
    );
    console.log(this.currOffset);

    path.style.strokeDashoffset = this.currOffset.toString();

    if (this.currOffset === 0) {
      this.index++;
      this.requestFrameId = null;
      return;
    }

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }
}
