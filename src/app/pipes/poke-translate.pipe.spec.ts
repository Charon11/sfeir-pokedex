import { PokeTranslatePipe } from './poke-translate.pipe';

describe('TranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new PokeTranslatePipe();
    expect(pipe).toBeTruthy();
  });
});
