/**
 * Filter `P` keys from `T` object by `C` condition.
 */
type FilterKeys<T, C> = {
  [P in keyof T]: T[P] extends C ? P : never;
}[keyof T];

/**
 * Static keys from route url.
 * For example `home` in `/home` url.
 */
type Key<K extends string> = { type: 'key'; value: K };

/**
 * Dynamic parameters from route url.
 * For example ID or page number.
 */
type Parameter<P extends string> = { type: 'parameter'; value: P };

type Element<T extends string> = Key<T> | Parameter<T>;

/**
 * Type for routes passed by client.
 */
type RouteObject = typeof MOCKED_ROUTES;

/**
 * Type for route keys passed by client.
 */
type Route = keyof RouteObject;

const route = <T extends Element<string>[]>(...args: T) => args;
const key = <K extends string>(value: K): Key<K> => ({ type: 'key', value });
const param = <P extends string>(value: P): Parameter<P> => ({ type: 'parameter', value });

const MOCKED_ROUTES = {
  about: route(key('about')),
  aboutDetails: route(key('about'), key('details')),
  profile: route(key('profile'), param('id')),
  root: route(),
  user: route(param('id')),
} as const;

/**
 * Routes with only static keys and no dynamic parameters.
 */
type SimpleRoute = FilterKeys<typeof MOCKED_ROUTES, Key<string>[]>;

/**
 * Union type of selected route elements.
 */
type RouteElement<R extends Route> = RouteObject[R][number];

/**
 * Union type of filtered route parameters.
 */
type RouteParam<R extends Route> = Exclude<RouteElement<R>, Key<string>>;

/**
 * Union type of dynamic parameter values from selected route.
 */
type RouteParamValue<R extends Route> = RouteParam<R>['type'] extends 'key' ? never : RouteParam<R>['value'];

/**
 * Object with dynamic route parameters as keys from selected route.
 */
type RouteParams<R extends Route> = { [Key in RouteParamValue<R>]: string };

const getPath = (route: Route) => MOCKED_ROUTES[route];

function to<T extends SimpleRoute>(route: T): string;
function to<T extends Route>(route: T, params: RouteParams<T>): string;
function to<T extends SimpleRoute | Route>(_route: T, _params?: RouteParams<T>): string {
  return '';
}

to('about');
to('aboutDetails');
to('profile', { id: '123' });
to('root');
to('user', { id: '123' });

export { route, key, param, getPath, to };
