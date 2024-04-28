import { BowlingGame } from '../core/bowling-game';

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
    rollStrike();
    game.roll(5);
    game.roll(1);
    rollMany(17, 0);

    expect(game.calculateScore()).toBe(22);
  });

  it('calculates the score when is perfect game', () => {
    makePerfectGame();

    expect(game.calculateScore()).toBe(300);
  });

  it('calculates the score when is all frames 5-5 spares', () => {
    rollMany(21, 5);

    expect(game.calculateScore()).toBe(150);
  });

  it('calculates the score when is all frames 8-2 spares', () => {
    Array.from({ length: 10 }).forEach(() => {
      game.roll(8);
      game.roll(2);
    });
    game.roll(8);

    expect(game.calculateScore()).toBe(180);
  });

  function rollMany(times: number, pins: number) {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  function rollStrike() {
    game.roll(10);
  }

  function makePerfectGame() {
    Array.from({ length: 12 }).forEach(rollStrike);
  }
});
