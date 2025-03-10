import { envAvailability } from './index';

describe('envAvailability', () => {
  it('should throw an error if any key is missing', () => {
    const env = { FOO: 'bar' };
    const keys = ['FOO', 'BAR'];

    expect(() => envAvailability({ env, keys })).toThrow('Missing required environment variables: BAR');
  });

  it('should not throw an error if all keys are present', () => {
    const env = { FOO: 'bar', BAR: 'baz' };
    const keys = ['FOO', 'BAR'];

    expect(() => envAvailability({ env, keys })).not.toThrow();
  });

  it('should not throw an error if no keys are provided', () => {
    const env = { FOO: 'bar' };
    const keys: string[] = [];

    expect(() => envAvailability({ env, keys })).not.toThrow();
  });
});
