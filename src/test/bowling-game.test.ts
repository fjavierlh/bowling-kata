class BowlingGame {
  rolls: number[] = [];

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateTotalScore(): number {
    return Array.from({ length: 10 })
      .map((_, i) => i)
      .reduce(
        ({ totalScore, currentFrameIndex }: { totalScore: number; currentFrameIndex: number }) => {
          if (this.rolls[currentFrameIndex] + this.rolls[currentFrameIndex + 1] === 10) {
            return {
              totalScore: totalScore + 10 + this.rolls[currentFrameIndex + 2],
              currentFrameIndex: currentFrameIndex + 2,
            };
          }

          return {
            totalScore: totalScore + this.rolls[currentFrameIndex] + this.rolls[currentFrameIndex + 1],
            currentFrameIndex: currentFrameIndex + 2,
          };
        },
        { totalScore: 0, currentFrameIndex: 0 }
      ).totalScore;
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
    game.roll(5);
    game.roll(5);
    game.roll(5);
    game.roll(1);
    rollMany(16, 0);

    expect(game.calculateTotalScore()).toBe(21);
  });

  function rollMany(times: number, pins: number) {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }
});
