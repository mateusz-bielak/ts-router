type Key<K extends string> = { type: 'key'; value: K };
type Parameter<P extends string> = { type: 'parameter'; value: P };

type RouteParameter<T extends string> = Key<T> | Parameter<T>;

type Route = keyof typeof MOCKED_ROUTES;

const route = <T extends RouteParameter<string>[]>(...args: T) => args;
const key = <K extends string>(value: K): Key<K> => ({ type: 'key', value });
const param = <P extends string>(value: P): Parameter<P> => ({ type: 'parameter', value });

const MOCKED_ROUTES = {
  root: route(key('/')),
  profile: route(key('profile'), param('id')),
} as const;

export const getPath = (route: Route) => MOCKED_ROUTES[route];

export const to = <T extends Route>(_route: T, _params: typeof MOCKED_ROUTES[T]) => {
  return;
};

to('root', [{ type: 'key', value: '/' }]);
to('profile', [
  { type: 'key', value: 'profile' },
  { type: 'parameter', value: 'id' },
]);
