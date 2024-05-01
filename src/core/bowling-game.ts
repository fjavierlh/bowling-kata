type Score = {
  score: number;
  frame: number;
};

export class BowlingGame {
  private readonly rolls: number[] = [];
  private readonly maxScorePerFrame: number = 10;

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateScore(): number {
    return this.frames().reduce(this.calculateScorePerFrame, { score: 0, frame: 0 }).score;
  }

  private frames() {
    return Array.from({ length: 10 }).map((_, i) => i);
  }

  private calculateScorePerFrame = ({ score, frame }: Score) => {
    if (this.strikeIn(frame)) {
      return {
        score: score + this.scoreForStrike(frame),
        frame: frame + 1,
      };
    }

    if (this.spareIn(frame)) {
      return {
        score: score + this.scoreForSpare(frame),
        frame: frame + 2,
      };
    }

    return {
      score: score + this.scoreIn(frame),
      frame: frame + 2,
    };
  };

  private strikeIn(frame: number) {
    return this.rolls[frame] === this.maxScorePerFrame;
  }

  private scoreForStrike(frame: number): number {
    return this.rolls[frame] + this.rolls[frame + 1] + this.rolls[frame + 2];
  }

  private spareIn(frame: number) {
    return this.rolls[frame] + this.rolls[frame + 1] === this.maxScorePerFrame;
  }

  private scoreForSpare(frame: number): number {
    return this.maxScorePerFrame + this.rolls[frame + 2];
  }

  private scoreIn(frame: number): number {
    return this.rolls[frame] + this.rolls[frame + 1];
  }
}
