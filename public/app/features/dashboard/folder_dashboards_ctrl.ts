import { FolderPageLoader } from './folder_page_loader';
import locationUtil from 'app/core/utils/location_util';

export class FolderDashboardsCtrl {
  navModel: any;
  folderId: number;
  uid: string;

  /** @ngInject */
  constructor(private backendSrv, navModelSrv, private $route, $location) {
    if (this.$route.current.params.uid) {
      this.uid = $route.current.params.uid;

      const loader = new FolderPageLoader(this.backendSrv);

      loader.load(this, this.uid, 'manage-folder-dashboards').then(folder => {
        const url = locationUtil.stripBaseFromUrl(folder.url);

        if (url !== $location.path()) {
          $location.path(url).replace();
        }
      });
    }
  }
}
