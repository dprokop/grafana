import { match } from 'react-router';
import { Location } from 'history';
import parseKeyValue from './utils/parseKeyValue';

// MVP: Replacement for $route

class RouteProvider {
  // To be Angular $route API compliant...
  current = {
    params: {},
    locals: {},
  };

  $get() {
    return this;
  }

  updateRoute(match: match<any>, location: Location<any>) {
    const { params } = match;
    const { search } = location;
    const queryParams = parseKeyValue(search.slice(1));

    this.current = {
      params: {
        ...queryParams, // accoring to Angular docs: path params take precedence over search params
        ...params,
      },
      locals: {},
    };
  }

  updateRouteLocals(locals: {}) {
    this.current = {
      ...this.current,
      locals: { ...locals },
    };
  }
}

export default RouteProvider;
