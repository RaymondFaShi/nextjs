/* router modules */

/** static routes */
const staticRoutes: Router.BaseRoute[] = [];

/** dynamic routes */
const dynamicRoutes: Router.BaseRoute[] = [];

// router
const router = [ ...staticRoutes, ...dynamicRoutes ];

export default router;