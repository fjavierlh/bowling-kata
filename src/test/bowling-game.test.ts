class BowlingGame {
  rolls: number[] = [];

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateTotalScore(): number {
    return 0;
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

  it('calculates the score for gutter when no pins are bowled', () => {
    Array.from({ length: 20 }).forEach(() => game.roll(0));

    expect(game.calculateTotalScore()).toBe(0);
  });
});
