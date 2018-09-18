// const context = require.context('./', true, /_specs\.ts/);
// context.keys().forEach(context);
// module.exports = context;

import 'babel-polyfill';
import 'jquery';
import angular from 'angular';
import 'angular-mocks';
import 'app/app';

// configure enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

angular.module('grafana', []);
angular.module('grafana.services', ['$strap.directives']);
angular.module('grafana.panels', []);
angular.module('grafana.controllers', []);
angular.module('grafana.directives', []);
angular.module('grafana.filters', []);
angular.module('grafana.routes', []);

const context = (require as any).context('../', true, /specs\.(tsx?|js)/);
for (const key of context.keys()) {
  context(key);
}
