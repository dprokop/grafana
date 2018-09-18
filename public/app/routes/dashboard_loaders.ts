import coreModule from 'app/core/core_module';
import locationUtil from 'app/core/utils/location_util';

export class LoadDashboardCtrl {
  /** @ngInject */
  constructor($scope, dashboardLoaderSrv, backendSrv, $location, $browser, $route) {
    // $scope.appEvent('dashboard-fetch-start');
    if (!$route.current.params.uid && !$route.current.params.slug) {
      backendSrv.get('/api/dashboards/home').then(homeDash => {
        if (homeDash.redirectUri) {
          const newUrl = locationUtil.stripBaseFromUrl(homeDash.redirectUri);
          $location.path(newUrl);
        } else {
          const meta = homeDash.meta;
          meta.canSave = meta.canShare = meta.canStar = false;
          $scope.initDashboard(homeDash, $scope);
        }
      });
      return;
    }

    // if no uid, redirect to new route based on slug
    if (
      !($route.current.params.type === 'script' || $route.current.params.type === 'snapshot') &&
      !$route.current.params.uid
    ) {
      backendSrv.getDashboardBySlug($route.current.params.slug).then(res => {
        if (res) {
          $location.pathReplace(locationUtil.stripBaseFromUrl(res.meta.url));
        }
      });
      return;
    }

    dashboardLoaderSrv
      .loadDashboard($route.current.params.type, $route.current.params.slug, $route.current.params.uid)
      .then(result => {
        if (result.meta.url) {
          const url = locationUtil.stripBaseFromUrl(result.meta.url);

          if (url !== $location.path()) {
            // replace url to not create additional history items and then return so that initDashboard below isn't executed multiple times.
            // $location.pathReplace(url);
            // return;
          }
        }

        // result.meta.autofitpanels = $routeParams.autofitpanels;
        // result.meta.kiosk = $routeParams.kiosk;
        if ($route.current.params.autofitpanels) {
          result.meta.autofitpanels = true;
        }
        if ($route.current.params.kiosk) {
          result.meta.kiosk = true;
        }
        $scope.initDashboard(result, $scope);
      });
  }
}

export class NewDashboardCtrl {
  /** @ngInject */
  constructor($scope, $route) {
    $scope.initDashboard(
      {
        meta: {
          canStar: false,
          canShare: false,
          isNew: true,
          folderId: Number($route.current.params.folderId),
        },
        dashboard: {
          title: 'New dashboard',
          panels: [
            {
              type: 'add-panel',
              gridPos: { x: 0, y: 0, w: 12, h: 9 },
              title: 'Panel Title',
            },
          ],
        },
      },
      $scope
    );
  }
}

// coreModule.controller('LoadDashboardCtrl', LoadDashboardCtrl);
// coreModule.controller('NewDashboardCtrl', NewDashboardCtrl);
