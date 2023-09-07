export class StrokeAnimator {
  private groups: SVGPathElement[][];
  private groupIndex: number;
  private pathIndex: number;
  private scale: number;
  private requestFrameId: number;

  private currOffset: number;
  private currLength: number;
  private currStart: number;

  constructor(svgEl: SVGSVGElement) {
    this.groups = [];
    svgEl.querySelector(".stroke-paths").childNodes.forEach((node) => {
      if (node.nodeName === "g")
        this.groups.push(Array.from(node.childNodes) as SVGPathElement[]);
      else if (node.nodeName === "path")
        this.groups.push([node as SVGPathElement]);
    });

    this.groupIndex = this.groups.length;
    this.pathIndex = 0;

    this.scale = svgEl.viewBox.baseVal.width;

    for (let i = 0; i < this.groupIndex; i++) {
      const group = this.groups[i];
      for (let j = 0; j < group.length; j++) {
        const path = group[j];
        const length = path.getTotalLength();
        path.style.strokeDasharray = length.toString();
      }
    }
  }

  private setup() {
    for (let i = 0; i < this.groupIndex; i++) {
      const group = this.groups[i];
      for (let j = 0; j < group.length; j++) {
        const path = group[j];
        path.style.strokeDashoffset = path.style.strokeDasharray;
      }
    }
  }

  public animatePath() {
    // Finish previous animation immediately
    if (this.requestFrameId) {
      cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;

      const group = this.groups[this.groupIndex];
      for (; this.pathIndex < group.length; this.pathIndex++) {
        const path = group[this.pathIndex];
        path.style.strokeDashoffset = "0";
      }

      this.groupIndex++;

      // Don't move on if it's the last stroke
      if (this.groupIndex === this.groups.length) return;
    }

    if (this.groupIndex === this.groups.length) {
      this.setup();
      this.groupIndex = 0;
    }

    this.pathIndex = 0;

    const group = this.groups[this.groupIndex];
    const path = group[this.pathIndex];

    this.currLength = path.getTotalLength();
    this.currOffset = this.currLength;
    this.currStart = performance.now();

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }

  private pathFrame(time) {
    const group = this.groups[this.groupIndex];
    const path = group[this.pathIndex];

    this.currOffset = Math.max(
      this.currLength - this.scale * ((time - this.currStart) / 250),
      0
    );

    path.style.strokeDashoffset = this.currOffset.toString();

    if (this.currOffset === 0) {
      this.pathIndex++;

      if (this.pathIndex === group.length) {
        this.requestFrameId = null;
        this.groupIndex++;
        return;
      }

      const path = group[this.pathIndex];
      this.currLength = path.getTotalLength();
      this.currOffset = this.currLength;
      this.currStart = performance.now();
    }

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }
}
