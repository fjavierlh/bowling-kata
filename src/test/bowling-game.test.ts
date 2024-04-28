type Score = {
  score: number;
  frame: number;
};

class BowlingGame {
  rolls: number[] = [];
  maxScorePerFrame: number = 10;

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateScore(): number {
    const score = this.frames().reduce(
      ({ score, frame }: Score) => {
        if (this.isStrike(frame)) {
          return {
            score: score + this.scoreForStrike(frame),
            frame: frame + 1,
          };
        }

        if (this.isSpare(frame)) {
          return {
            score: score + this.scoreForSpare(frame),
            frame: frame + 2,
          };
        }

        return {
          score: score + this.scoreIn(frame),
          frame: frame + 2,
        };
      },
      { score: 0, frame: 0 }
    );
    return score.score;
  }

  private frames() {
    return Array.from({ length: 10 }).map((_, i) => i);
  }

  private isStrike(frame: number) {
    return this.rolls[frame] === this.maxScorePerFrame;
  }

  private scoreForStrike(frame: number): number {
    return this.rolls[frame] + this.rolls[frame + 1] + this.rolls[frame + 2];
  }

  private isSpare(frame: number) {
    return this.rolls[frame] + this.rolls[frame + 1] === this.maxScorePerFrame;
  }

  private scoreForSpare(frame: number): number {
    return this.maxScorePerFrame + this.rolls[frame + 2];
  }

  private scoreIn(frame: number): number {
    return this.rolls[frame] + this.rolls[frame + 1];
  }
}

describe('The Bowling game', () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  it('can be created', () => {
    expect(game).toBeInstanceOf(BowlingGame);
  });

  it('should be able to make a roll', () => {
    game.roll(0);
    expect(game.rolls).toEqual([0]);
  });

  it('calculates the score when no pins are bowled', () => {
    rollMany(20, 0);

    expect(game.calculateScore()).toBe(0);
  });

  it('calculates the score when an spare is done', () => {
    rollSpare();
    game.roll(5);
    game.roll(1);
    rollMany(16, 0);

    expect(game.calculateScore()).toBe(21);
  });

  it('calculates the score when an strike is done', () => {
    game.roll(10);
    game.roll(5);
    game.roll(1);
    rollMany(17, 0);

    expect(game.calculateScore()).toBe(22);
  });

  function rollMany(times: number, pins: number) {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }
});
