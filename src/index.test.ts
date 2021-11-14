import { getPath } from './index';

describe('getPath()', () => {
  it('returns route path', () => {
    expect(getPath('profile')).toBe('/:id');
  });
});
