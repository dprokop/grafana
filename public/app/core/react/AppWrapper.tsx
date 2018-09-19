import * as React from 'react';
import { Router } from 'react-router-dom';
import { GrafanaApp } from '../../app';
import angular from 'angular';
import { each, extend } from 'lodash';
import { grafanaHistory } from '../navigation/LocationService';
import { legacyRoutes } from '../../routes/routes';
import GrafanaRoute from '../navigation/GrafanaRoute';

interface AppWrapperProps {
  app: GrafanaApp;
}
interface AppWrapperState {
  ngInjector: any;
}

export default class AppWrapper extends React.Component<AppWrapperProps, AppWrapperState> {
  container: HTMLElement;

  constructor(props: AppWrapperProps) {
    super(props);

    this.state = {
      ngInjector: null,
    };

    this.setContainerRef = this.setContainerRef.bind(this);
  }

  componentDidMount() {
    if (this.container) {
      this.bootstrapNgApp();
    } else {
      throw new Error('Failed to boot angular app, no container to attach to');
    }
  }

  bootstrapNgApp() {
    const { app } = this.props;
    const invoker = angular.bootstrap(document, app.ngModuleDependencies);

    this.setState(
      { ngInjector: invoker },
      invoker.invoke(() => {
        each(app.preBootModules, module => {
          extend(module, app.registerFunctions);
        });
        app.preBootModules = null;
      })
    );
  }

  setContainerRef(c) {
    this.container = c;
  }

  renderRoutes() {
    return (
      <>
        {legacyRoutes.map((descriptor, i) => {
          return (
            <GrafanaRoute {...descriptor} injector={this.state.ngInjector} mountContainer={this.container} key={i} />
          );
        })}
      </>
    );
  }

  render() {
    // tslint:disable-next-line
    const appSeed =
      '<grafana-app class="grafana-app">' +
      '<sidemenu class="sidemenu"></sidemenu>' +
      '<div class="page-alert-list">' +
      '<div ng-repeat="alert in dashAlerts.list" class="alert-{{alert.severity}} alert">' +
      '<div class="alert-icon">' +
      '<i class="{{alert.icon}}"></i>' +
      '</div>' +
      '<div class="alert-body">' +
      '<div class="alert-title">{{alert.title}}</div>' +
      '<div class="alert-text" ng-bind="alert.text"></div>' +
      '</div>' +
      '<button type="button" class="alert-close" ng-click="dashAlerts.clear(alert)">' +
      '<i class="fa fa fa-remove"></i>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="main-view">' +
      '<div class="scroll-canvas" page-scrollbar>' +
      '<div id="ngRoot"></div>' +
      '</div>' +
      '</div>' +
      '</grafana-app>';

    return (
      <Router history={grafanaHistory()}>
        <>
          {this.state.ngInjector && this.container && this.renderRoutes()}
          <div
            ref={this.setContainerRef}
            dangerouslySetInnerHTML={{
              __html: appSeed,
            }}
          />
        </>
      </Router>
    );
  }
}
