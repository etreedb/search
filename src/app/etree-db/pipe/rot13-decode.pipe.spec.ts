import { Rot13DecodePipe } from './rot13-decode.pipe';

describe('Rot13DecodePipe', () => {
  it('create an instance', () => {
    const pipe = new Rot13DecodePipe();
    expect(pipe).toBeTruthy();
  });
});
