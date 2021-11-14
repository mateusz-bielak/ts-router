const MOCKED_ROUTES = {
  root: '/',
  profile: '/profile/:id',
} as const;

type Static = { type: 'static'; value: string };
type Parameter = { type: 'parameter'; value: string };
type OptionalParameter = { type: 'optionalParameter'; value: string };

type RouteParameter = Static | Parameter | OptionalParameter;

type Route = keyof typeof MOCKED_ROUTES;

export const getPath = (route: Route) => MOCKED_ROUTES[route];

export const to = (_route: Route, _params: Record<string, RouteParameter['value']>) => {
  return;
};
