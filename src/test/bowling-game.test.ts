type Score = {
  totalScore: number;
  currentFrameIndex: number;
};

class BowlingGame {
  rolls: number[] = [];
  maxScorePerFrame: number = 10;

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateTotalScore(): number {
    const score = this.frames().reduce(
      ({ totalScore, currentFrameIndex }: Score) => {
        if (this.isStrike(currentFrameIndex)) {
          return {
            totalScore: totalScore + this.bonusForStrike(currentFrameIndex),
            currentFrameIndex: currentFrameIndex + 1,
          };
        }

        if (this.isSpare(currentFrameIndex)) {
          return {
            totalScore: totalScore + this.bonusForSpare(currentFrameIndex),
            currentFrameIndex: currentFrameIndex + 2,
          };
        }

        return {
          totalScore: totalScore + this.sumPinsIn(currentFrameIndex),
          currentFrameIndex: currentFrameIndex + 2,
        };
      },
      { totalScore: 0, currentFrameIndex: 0 }
    );
    return score.totalScore;
  }

  private frames() {
    return Array.from({ length: 10 }).map((_, i) => i);
  }

  private isStrike(currentFrameIndex: number) {
    return this.rolls[currentFrameIndex] === this.maxScorePerFrame;
  }

  private bonusForStrike(currentFrameIndex: number): number {
    return this.rolls[currentFrameIndex] + this.rolls[currentFrameIndex + 1] + this.rolls[currentFrameIndex + 2];
  }

  private isSpare(currentFrameIndex: number) {
    return this.rolls[currentFrameIndex] + this.rolls[currentFrameIndex + 1] === this.maxScorePerFrame;
  }

  private bonusForSpare(currentFrameIndex: number): number {
    return this.maxScorePerFrame + this.rolls[currentFrameIndex + 2];
  }

  private sumPinsIn(currentFrameIndex: number): number {
    return this.rolls[currentFrameIndex] + this.rolls[currentFrameIndex + 1];
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

    expect(game.calculateTotalScore()).toBe(0);
  });

  it('calculates the score when an spare is done', () => {
    rollSpare();
    game.roll(5);
    game.roll(1);
    rollMany(16, 0);

    expect(game.calculateTotalScore()).toBe(21);
  });

  it('calculates the score when an strike is done', () => {
    game.roll(10);
    game.roll(5);
    game.roll(1);
    rollMany(17, 0);

    expect(game.calculateTotalScore()).toBe(22);
  });

  function rollMany(times: number, pins: number) {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }
});
