const MOCKED_ROUTES = {
  root: '/',
  profile: '/:id',
} as const;

export const getPath = (route: keyof typeof MOCKED_ROUTES) => MOCKED_ROUTES[route];
