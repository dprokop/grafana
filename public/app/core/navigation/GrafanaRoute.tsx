import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import NgController from './NgController';

export interface GrafanaLegacyRouteDescriptor {
  path?: string;
  exact?: boolean;
  templateUrl?: string;
  template?: string;
  controller?: string;
  reloadOnSearch?: boolean;
  pageClass?: string;
  controllerAs?: string;
  resolve?: { [key: string]: Function };
}

export interface GrafanaLegacyRouteProps extends RouteProps, GrafanaLegacyRouteDescriptor {
  injector: {};
  mountContainer: HTMLElement;
  // TODO: remove render props as those are handled by the component itself
}

interface GrafanaRouteProps extends GrafanaLegacyRouteProps {}

class GrafanaRoute extends React.Component<GrafanaRouteProps> {
  render() {
    const {
      template,
      templateUrl,
      controller,
      controllerAs,
      resolve,
      reloadOnSearch,
      pageClass,
      mountContainer,
      injector,
      ...otherProps
    } = this.props;

    return (
      <Route
        render={routeProps => {
          return (
            <NgController
              injector={injector}
              mountContainer={mountContainer}
              controller={controller}
              controllerAs={controllerAs}
              templateUrl={templateUrl}
              template={template}
              resolve={resolve}
              pageClass={pageClass}
              reloadOnSearch={reloadOnSearch}
              {...routeProps}
            />
          );
        }}
        {...otherProps}
      />
    );
  }
}

export default GrafanaRoute;
