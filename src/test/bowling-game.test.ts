class BowlingGame {
  rolls: number[] = [];

  roll(pins: number) {
    this.rolls.push(pins);
  }

}

describe('The Bowling game', () => {
  it('can be created', () => {
    const game = new BowlingGame();

    expect(game).toBeInstanceOf(BowlingGame);
  });

  it('should be able to make a roll', () => {
    const game = new BowlingGame();
    game.roll(0);
    expect(game.rolls).toEqual([0]);
  });

  it('calculates the score for gutter when no pins are bowled', () => {
    const game = new BowlingGame();
    Array.from({ length: 20 }).forEach(() => game.roll(0));

    expect(game.calculateTotalScore()).toBe(0);
  });
});
