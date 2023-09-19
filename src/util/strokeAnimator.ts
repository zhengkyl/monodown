export class StrokeAnimator {
  private groups: SVGPathElement[][];
  private groupIndex: number;
  private scale: number;
  private requestFrameId: number;

  private currOffset: number;
  private currLength: number;
  private currStart: number;
  private animateAll: boolean;

  constructor(svgEl: SVGSVGElement) {
    this.groups = [];
    svgEl
      .querySelectorAll('path[clip-path][style^="--i:"]')
      .forEach((e: SVGPathElement) => {
        const index = parseInt(getComputedStyle(e).getPropertyValue("--i"));
        if (index == this.groups.length) {
          this.groups.push([]);
        }
        this.groups[index].push(e);
      });

    this.groupIndex = this.groups.length;

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

  public animatePath(animateAll = false) {
    this.animateAll = animateAll;
    // Finish previous animation immediately
    if (this.requestFrameId) {
      cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;

      const group = this.groups[this.groupIndex];
      for (let i = 0; i < group.length; i++) {
        const path = group[i];
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

    const group = this.groups[this.groupIndex];

    this.currLength = group[0].getTotalLength();
    this.currOffset = this.currLength;
    this.currStart = performance.now();

    for (let i = 0; i < group.length; i++) {
      const path = group[i];
      path.style.strokeDashoffset = this.currLength.toString();
    }

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }

  private pathFrame(time) {
    const group = this.groups[this.groupIndex];

    this.currOffset = Math.max(
      this.currLength - this.scale * ((time - this.currStart) / 250),
      0
    );

    for (const path of group) {
      path.style.strokeDashoffset = this.currOffset.toString();
    }

    if (this.currOffset === 0) {
      this.requestFrameId = null;
      this.groupIndex++;
      if (this.animateAll && this.groupIndex < this.groups.length)
        this.animatePath(true);
      return;
    }

    this.requestFrameId = requestAnimationFrame(this.pathFrame.bind(this));
  }
}
