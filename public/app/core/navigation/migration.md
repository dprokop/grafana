# Angular routing -> react-router refactor analysis


## `ngRoute`
---
### API usage

* `ngView` (0 occurences)
* `$routeProvider` - (2 occurences) - used in ng routes definitions. Won't be used when routes migrated to React
* `$route`
  - Used in `BridgeSrv` to retrieve route params(`$route.current.params`). Can be easily refactored to `history`. https://docs.angularjs.org/api/ngRoute/service/$route#current
  - Used in `dashboard/history.ts`, `dashboars/settings.ts` to force reload `$route.reload()` dashboard. Needs figuring our how to force react router to reinstantiate controller. Maybe repacing history item is enough with some marking that reload is required
  - Used in `panel_ctrl.ts` when changing tab. `updateParams` can be refactored to `history.push`
  - Used in `playlist_edit_ctrl.ts` to retrieve current playlistId `id` from route params
  - Used in playlist routes definition to start playlist with correct `id`: `playlistSrv.start($route.current.params.id);`
  - In `ReactContainer.ts` is used to retrieve `locals` from route. TODO: Check roles instance creation in different controllers.
* `$routeParams`
  - Quite crazy. Used in so many places that it should be intercepted for params retrieval. Need to figure out how to make sure it's updated in a correct moment.

### Events
- `$routeChangeStart`
- `$routeChangeSuccess` - where this should actually happen? When `NgController` is mounted? https://thinkster.io/egghead/route-life-cycle
- `$routeChangeError` - no usage
- `$routeUpdate` - broadcasted on NgController props change

## `$location` service
---

### API usage
### Events
- `$locationChangeStart` - used in dashboard change tracker, TODO
- `$locationChangeSuccess` - used in dashboard change tracker, TODO

$~$

### Notes
- App injector should be available on the app via context API
- Should strive to eliminate all location sources but one. Redux store could be the only source for that.  Right now there is $route, $routeParams and redux being used as source for current location data.


