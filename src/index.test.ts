import { getPath, to } from './index';

describe('getPath()', () => {
  it('returns route path', () => {
    expect(getPath('profile')).toBe('/profile/:id');
  });
});

// describe('to()', () => {
//   it('returns path with passed params', () => {
//     expect(to('profile', { id: 'user-id' })).toBe('/profile/user-id');
//   });
// });
