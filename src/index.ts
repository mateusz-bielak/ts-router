type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

type Key<K extends string> = { type: 'key'; value: K };
type Parameter<P extends string> = { type: 'parameter'; value: P };

type RouteParameter<T extends string> = Key<T> | Parameter<T>;

type Route = keyof typeof MOCKED_ROUTES;

const route = <T extends RouteParameter<string>[]>(...args: T) => args;
const key = <K extends string>(value: K): Key<K> => ({ type: 'key', value });
const param = <P extends string>(value: P): Parameter<P> => ({ type: 'parameter', value });

const MOCKED_ROUTES = {
  root: route(),
  about: route(key('about')),
  aboutDetails: route(key('about'), key('details')),
  profile: route(key('profile'), param('id')),
} as const;

type SimpleRoute = FilteredKeys<typeof MOCKED_ROUTES, Key<string>[]>;

type RouteParams<P extends Route> = { [Key in typeof MOCKED_ROUTES[P][number]['value']]: string };

export const getPath = (route: Route) => MOCKED_ROUTES[route];

export function to<T extends SimpleRoute>(route: T): string;
export function to<T extends Route>(route: T, params: RouteParams<T>): string;
export function to<T extends SimpleRoute | Route>(_route: T, _params?: RouteParams<T>): string {
  return '';
}
