/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OriginalindexImport } from './routes/original_index'
import { Route as NavbarImport } from './routes/_navbar'
import { Route as NavbarAuthedImport } from './routes/_navbar/_authed'
import { Route as NavbarSignupIndexImport } from './routes/_navbar/signup/index'
import { Route as NavbarLogoutIndexImport } from './routes/_navbar/logout/index'
import { Route as NavbarLoginIndexImport } from './routes/_navbar/login/index'
import { Route as NavbarAuthedIndexImport } from './routes/_navbar/_authed/index'
import { Route as NavbarAuthedCalendarImport } from './routes/_navbar/_authed/calendar'
import { Route as NavbarAuthedModulesIndexImport } from './routes/_navbar/_authed/modules/index'
import { Route as NavbarAuthedModulesModuleIndexImport } from './routes/_navbar/_authed/modules/$module/index'
import { Route as NavbarAuthedModulesModuleActivityIndexImport } from './routes/_navbar/_authed/modules/$module/activity/index'
import { Route as NavbarAuthedModulesModuleActivityNewImport } from './routes/_navbar/_authed/modules/$module/activity/new'
import { Route as NavbarAuthedModulesModuleActivityIdIndexImport } from './routes/_navbar/_authed/modules/$module/activity/$id/index'
import { Route as NavbarAuthedModulesModuleActivityIdEditImport } from './routes/_navbar/_authed/modules/$module/activity/$id/edit'
import { Route as NavbarAuthedModulesModuleActivityIdBeginImport } from './routes/_navbar/_authed/modules/$module/activity/$id/begin'
import { Route as NavbarAuthedModulesModuleActivityIdQuizQuizEditImport } from './routes/_navbar/_authed/modules/$module/activity/$id/quiz.$quiz/edit'

// Create/Update Routes

const OriginalindexRoute = OriginalindexImport.update({
  path: '/original_index',
  getParentRoute: () => rootRoute,
} as any)

const NavbarRoute = NavbarImport.update({
  id: '/_navbar',
  getParentRoute: () => rootRoute,
} as any)

const NavbarAuthedRoute = NavbarAuthedImport.update({
  id: '/_authed',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarSignupIndexRoute = NavbarSignupIndexImport.update({
  path: '/signup/',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarLogoutIndexRoute = NavbarLogoutIndexImport.update({
  path: '/logout/',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarLoginIndexRoute = NavbarLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarAuthedIndexRoute = NavbarAuthedIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarAuthedRoute,
} as any)

const NavbarAuthedCalendarRoute = NavbarAuthedCalendarImport.update({
  path: '/calendar',
  getParentRoute: () => NavbarAuthedRoute,
} as any)

const NavbarAuthedModulesIndexRoute = NavbarAuthedModulesIndexImport.update({
  path: '/modules/',
  getParentRoute: () => NavbarAuthedRoute,
} as any)

const NavbarAuthedModulesModuleIndexRoute =
  NavbarAuthedModulesModuleIndexImport.update({
    path: '/modules/$module/',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIndexRoute =
  NavbarAuthedModulesModuleActivityIndexImport.update({
    path: '/modules/$module/activity/',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityNewRoute =
  NavbarAuthedModulesModuleActivityNewImport.update({
    path: '/modules/$module/activity/new',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIdIndexRoute =
  NavbarAuthedModulesModuleActivityIdIndexImport.update({
    path: '/modules/$module/activity/$id/',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIdEditRoute =
  NavbarAuthedModulesModuleActivityIdEditImport.update({
    path: '/modules/$module/activity/$id/edit',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIdBeginRoute =
  NavbarAuthedModulesModuleActivityIdBeginImport.update({
    path: '/modules/$module/activity/$id/begin',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute =
  NavbarAuthedModulesModuleActivityIdQuizQuizEditImport.update({
    path: '/modules/$module/activity/$id/quiz/$quiz/edit',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_navbar': {
      id: '/_navbar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NavbarImport
      parentRoute: typeof rootRoute
    }
    '/original_index': {
      id: '/original_index'
      path: '/original_index'
      fullPath: '/original_index'
      preLoaderRoute: typeof OriginalindexImport
      parentRoute: typeof rootRoute
    }
    '/_navbar/_authed': {
      id: '/_navbar/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NavbarAuthedImport
      parentRoute: typeof NavbarImport
    }
    '/_navbar/_authed/calendar': {
      id: '/_navbar/_authed/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof NavbarAuthedCalendarImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/': {
      id: '/_navbar/_authed/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof NavbarAuthedIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/login/': {
      id: '/_navbar/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof NavbarLoginIndexImport
      parentRoute: typeof NavbarImport
    }
    '/_navbar/logout/': {
      id: '/_navbar/logout/'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof NavbarLogoutIndexImport
      parentRoute: typeof NavbarImport
    }
    '/_navbar/signup/': {
      id: '/_navbar/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof NavbarSignupIndexImport
      parentRoute: typeof NavbarImport
    }
    '/_navbar/_authed/modules/': {
      id: '/_navbar/_authed/modules/'
      path: '/modules'
      fullPath: '/modules'
      preLoaderRoute: typeof NavbarAuthedModulesIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/': {
      id: '/_navbar/_authed/modules/$module/'
      path: '/modules/$module'
      fullPath: '/modules/$module'
      preLoaderRoute: typeof NavbarAuthedModulesModuleIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/new': {
      id: '/_navbar/_authed/modules/$module/activity/new'
      path: '/modules/$module/activity/new'
      fullPath: '/modules/$module/activity/new'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityNewImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/': {
      id: '/_navbar/_authed/modules/$module/activity/'
      path: '/modules/$module/activity'
      fullPath: '/modules/$module/activity'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/$id/begin': {
      id: '/_navbar/_authed/modules/$module/activity/$id/begin'
      path: '/modules/$module/activity/$id/begin'
      fullPath: '/modules/$module/activity/$id/begin'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIdBeginImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/$id/edit': {
      id: '/_navbar/_authed/modules/$module/activity/$id/edit'
      path: '/modules/$module/activity/$id/edit'
      fullPath: '/modules/$module/activity/$id/edit'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIdEditImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/$id/': {
      id: '/_navbar/_authed/modules/$module/activity/$id/'
      path: '/modules/$module/activity/$id'
      fullPath: '/modules/$module/activity/$id'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIdIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
    '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit': {
      id: '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit'
      path: '/modules/$module/activity/$id/quiz/$quiz/edit'
      fullPath: '/modules/$module/activity/$id/quiz/$quiz/edit'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIdQuizQuizEditImport
      parentRoute: typeof NavbarAuthedImport
    }
  }
}

// Create and export the route tree

interface NavbarAuthedRouteChildren {
  NavbarAuthedCalendarRoute: typeof NavbarAuthedCalendarRoute
  NavbarAuthedIndexRoute: typeof NavbarAuthedIndexRoute
  NavbarAuthedModulesIndexRoute: typeof NavbarAuthedModulesIndexRoute
  NavbarAuthedModulesModuleIndexRoute: typeof NavbarAuthedModulesModuleIndexRoute
  NavbarAuthedModulesModuleActivityNewRoute: typeof NavbarAuthedModulesModuleActivityNewRoute
  NavbarAuthedModulesModuleActivityIndexRoute: typeof NavbarAuthedModulesModuleActivityIndexRoute
  NavbarAuthedModulesModuleActivityIdBeginRoute: typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  NavbarAuthedModulesModuleActivityIdEditRoute: typeof NavbarAuthedModulesModuleActivityIdEditRoute
  NavbarAuthedModulesModuleActivityIdIndexRoute: typeof NavbarAuthedModulesModuleActivityIdIndexRoute
  NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute: typeof NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute
}

const NavbarAuthedRouteChildren: NavbarAuthedRouteChildren = {
  NavbarAuthedCalendarRoute: NavbarAuthedCalendarRoute,
  NavbarAuthedIndexRoute: NavbarAuthedIndexRoute,
  NavbarAuthedModulesIndexRoute: NavbarAuthedModulesIndexRoute,
  NavbarAuthedModulesModuleIndexRoute: NavbarAuthedModulesModuleIndexRoute,
  NavbarAuthedModulesModuleActivityNewRoute:
    NavbarAuthedModulesModuleActivityNewRoute,
  NavbarAuthedModulesModuleActivityIndexRoute:
    NavbarAuthedModulesModuleActivityIndexRoute,
  NavbarAuthedModulesModuleActivityIdBeginRoute:
    NavbarAuthedModulesModuleActivityIdBeginRoute,
  NavbarAuthedModulesModuleActivityIdEditRoute:
    NavbarAuthedModulesModuleActivityIdEditRoute,
  NavbarAuthedModulesModuleActivityIdIndexRoute:
    NavbarAuthedModulesModuleActivityIdIndexRoute,
  NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute:
    NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute,
}

const NavbarAuthedRouteWithChildren = NavbarAuthedRoute._addFileChildren(
  NavbarAuthedRouteChildren,
)

interface NavbarRouteChildren {
  NavbarAuthedRoute: typeof NavbarAuthedRouteWithChildren
  NavbarLoginIndexRoute: typeof NavbarLoginIndexRoute
  NavbarLogoutIndexRoute: typeof NavbarLogoutIndexRoute
  NavbarSignupIndexRoute: typeof NavbarSignupIndexRoute
}

const NavbarRouteChildren: NavbarRouteChildren = {
  NavbarAuthedRoute: NavbarAuthedRouteWithChildren,
  NavbarLoginIndexRoute: NavbarLoginIndexRoute,
  NavbarLogoutIndexRoute: NavbarLogoutIndexRoute,
  NavbarSignupIndexRoute: NavbarSignupIndexRoute,
}

const NavbarRouteWithChildren =
  NavbarRoute._addFileChildren(NavbarRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof NavbarAuthedRouteWithChildren
  '/original_index': typeof OriginalindexRoute
  '/calendar': typeof NavbarAuthedCalendarRoute
  '/': typeof NavbarAuthedIndexRoute
  '/login': typeof NavbarLoginIndexRoute
  '/logout': typeof NavbarLogoutIndexRoute
  '/signup': typeof NavbarSignupIndexRoute
  '/modules': typeof NavbarAuthedModulesIndexRoute
  '/modules/$module': typeof NavbarAuthedModulesModuleIndexRoute
  '/modules/$module/activity/new': typeof NavbarAuthedModulesModuleActivityNewRoute
  '/modules/$module/activity': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/modules/$module/activity/$id/edit': typeof NavbarAuthedModulesModuleActivityIdEditRoute
  '/modules/$module/activity/$id': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
  '/modules/$module/activity/$id/quiz/$quiz/edit': typeof NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute
}

export interface FileRoutesByTo {
  '': typeof NavbarRouteWithChildren
  '/original_index': typeof OriginalindexRoute
  '/calendar': typeof NavbarAuthedCalendarRoute
  '/': typeof NavbarAuthedIndexRoute
  '/login': typeof NavbarLoginIndexRoute
  '/logout': typeof NavbarLogoutIndexRoute
  '/signup': typeof NavbarSignupIndexRoute
  '/modules': typeof NavbarAuthedModulesIndexRoute
  '/modules/$module': typeof NavbarAuthedModulesModuleIndexRoute
  '/modules/$module/activity/new': typeof NavbarAuthedModulesModuleActivityNewRoute
  '/modules/$module/activity': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/modules/$module/activity/$id/edit': typeof NavbarAuthedModulesModuleActivityIdEditRoute
  '/modules/$module/activity/$id': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
  '/modules/$module/activity/$id/quiz/$quiz/edit': typeof NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_navbar': typeof NavbarRouteWithChildren
  '/original_index': typeof OriginalindexRoute
  '/_navbar/_authed': typeof NavbarAuthedRouteWithChildren
  '/_navbar/_authed/calendar': typeof NavbarAuthedCalendarRoute
  '/_navbar/_authed/': typeof NavbarAuthedIndexRoute
  '/_navbar/login/': typeof NavbarLoginIndexRoute
  '/_navbar/logout/': typeof NavbarLogoutIndexRoute
  '/_navbar/signup/': typeof NavbarSignupIndexRoute
  '/_navbar/_authed/modules/': typeof NavbarAuthedModulesIndexRoute
  '/_navbar/_authed/modules/$module/': typeof NavbarAuthedModulesModuleIndexRoute
  '/_navbar/_authed/modules/$module/activity/new': typeof NavbarAuthedModulesModuleActivityNewRoute
  '/_navbar/_authed/modules/$module/activity/': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/_navbar/_authed/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/_navbar/_authed/modules/$module/activity/$id/edit': typeof NavbarAuthedModulesModuleActivityIdEditRoute
  '/_navbar/_authed/modules/$module/activity/$id/': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
  '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit': typeof NavbarAuthedModulesModuleActivityIdQuizQuizEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/original_index'
    | '/calendar'
    | '/'
    | '/login'
    | '/logout'
    | '/signup'
    | '/modules'
    | '/modules/$module'
    | '/modules/$module/activity/new'
    | '/modules/$module/activity'
    | '/modules/$module/activity/$id/begin'
    | '/modules/$module/activity/$id/edit'
    | '/modules/$module/activity/$id'
    | '/modules/$module/activity/$id/quiz/$quiz/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/original_index'
    | '/calendar'
    | '/'
    | '/login'
    | '/logout'
    | '/signup'
    | '/modules'
    | '/modules/$module'
    | '/modules/$module/activity/new'
    | '/modules/$module/activity'
    | '/modules/$module/activity/$id/begin'
    | '/modules/$module/activity/$id/edit'
    | '/modules/$module/activity/$id'
    | '/modules/$module/activity/$id/quiz/$quiz/edit'
  id:
    | '__root__'
    | '/_navbar'
    | '/original_index'
    | '/_navbar/_authed'
    | '/_navbar/_authed/calendar'
    | '/_navbar/_authed/'
    | '/_navbar/login/'
    | '/_navbar/logout/'
    | '/_navbar/signup/'
    | '/_navbar/_authed/modules/'
    | '/_navbar/_authed/modules/$module/'
    | '/_navbar/_authed/modules/$module/activity/new'
    | '/_navbar/_authed/modules/$module/activity/'
    | '/_navbar/_authed/modules/$module/activity/$id/begin'
    | '/_navbar/_authed/modules/$module/activity/$id/edit'
    | '/_navbar/_authed/modules/$module/activity/$id/'
    | '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  NavbarRoute: typeof NavbarRouteWithChildren
  OriginalindexRoute: typeof OriginalindexRoute
}

const rootRouteChildren: RootRouteChildren = {
  NavbarRoute: NavbarRouteWithChildren,
  OriginalindexRoute: OriginalindexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_navbar",
        "/original_index"
      ]
    },
    "/_navbar": {
      "filePath": "_navbar.tsx",
      "children": [
        "/_navbar/_authed",
        "/_navbar/login/",
        "/_navbar/logout/",
        "/_navbar/signup/"
      ]
    },
    "/original_index": {
      "filePath": "original_index.tsx"
    },
    "/_navbar/_authed": {
      "filePath": "_navbar/_authed.tsx",
      "parent": "/_navbar",
      "children": [
        "/_navbar/_authed/calendar",
        "/_navbar/_authed/",
        "/_navbar/_authed/modules/",
        "/_navbar/_authed/modules/$module/",
        "/_navbar/_authed/modules/$module/activity/new",
        "/_navbar/_authed/modules/$module/activity/",
        "/_navbar/_authed/modules/$module/activity/$id/begin",
        "/_navbar/_authed/modules/$module/activity/$id/edit",
        "/_navbar/_authed/modules/$module/activity/$id/",
        "/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit"
      ]
    },
    "/_navbar/_authed/calendar": {
      "filePath": "_navbar/_authed/calendar.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/": {
      "filePath": "_navbar/_authed/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/login/": {
      "filePath": "_navbar/login/index.tsx",
      "parent": "/_navbar"
    },
    "/_navbar/logout/": {
      "filePath": "_navbar/logout/index.tsx",
      "parent": "/_navbar"
    },
    "/_navbar/signup/": {
      "filePath": "_navbar/signup/index.tsx",
      "parent": "/_navbar"
    },
    "/_navbar/_authed/modules/": {
      "filePath": "_navbar/_authed/modules/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/": {
      "filePath": "_navbar/_authed/modules/$module/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/new": {
      "filePath": "_navbar/_authed/modules/$module/activity/new.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/": {
      "filePath": "_navbar/_authed/modules/$module/activity/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/begin": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/begin.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/edit": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/edit.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/quiz.$quiz/edit.tsx",
      "parent": "/_navbar/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
