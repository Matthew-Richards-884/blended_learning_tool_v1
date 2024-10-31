/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OriginalindexImport } from './routes/original_index'
import { Route as NavbarImport } from './routes/_navbar'
import { Route as NavbarIndexImport } from './routes/_navbar/index'
import { Route as NavbarAuthedImport } from './routes/_navbar/_authed'
import { Route as NavbarSignupIndexImport } from './routes/_navbar/signup/index'
import { Route as NavbarLoginIndexImport } from './routes/_navbar/login/index'
import { Route as NavbarAuthedModulesIndexImport } from './routes/_navbar/_authed/modules/index'
import { Route as NavbarAuthedModulesModuleIndexImport } from './routes/_navbar/_authed/modules/$module/index'
import { Route as NavbarAuthedModulesModuleActivityIndexImport } from './routes/_navbar/_authed/modules/$module/activity/index'
import { Route as NavbarAuthedModulesModuleActivityIdIndexImport } from './routes/_navbar/_authed/modules/$module/activity/$id/index'
import { Route as NavbarAuthedModulesModuleActivityIdBeginImport } from './routes/_navbar/_authed/modules/$module/activity/$id/begin'

// Create/Update Routes

const OriginalindexRoute = OriginalindexImport.update({
  path: '/original_index',
  getParentRoute: () => rootRoute,
} as any)

const NavbarRoute = NavbarImport.update({
  id: '/_navbar',
  getParentRoute: () => rootRoute,
} as any)

const NavbarIndexRoute = NavbarIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarAuthedRoute = NavbarAuthedImport.update({
  id: '/_authed',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarSignupIndexRoute = NavbarSignupIndexImport.update({
  path: '/signup/',
  getParentRoute: () => NavbarRoute,
} as any)

const NavbarLoginIndexRoute = NavbarLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => NavbarRoute,
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

const NavbarAuthedModulesModuleActivityIdIndexRoute =
  NavbarAuthedModulesModuleActivityIdIndexImport.update({
    path: '/modules/$module/activity/$id/',
    getParentRoute: () => NavbarAuthedRoute,
  } as any)

const NavbarAuthedModulesModuleActivityIdBeginRoute =
  NavbarAuthedModulesModuleActivityIdBeginImport.update({
    path: '/modules/$module/activity/$id/begin',
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
    '/_navbar/': {
      id: '/_navbar/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof NavbarIndexImport
      parentRoute: typeof NavbarImport
    }
    '/_navbar/login/': {
      id: '/_navbar/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof NavbarLoginIndexImport
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
    '/_navbar/_authed/modules/$module/activity/$id/': {
      id: '/_navbar/_authed/modules/$module/activity/$id/'
      path: '/modules/$module/activity/$id'
      fullPath: '/modules/$module/activity/$id'
      preLoaderRoute: typeof NavbarAuthedModulesModuleActivityIdIndexImport
      parentRoute: typeof NavbarAuthedImport
    }
  }
}

// Create and export the route tree

interface NavbarAuthedRouteChildren {
  NavbarAuthedModulesIndexRoute: typeof NavbarAuthedModulesIndexRoute
  NavbarAuthedModulesModuleIndexRoute: typeof NavbarAuthedModulesModuleIndexRoute
  NavbarAuthedModulesModuleActivityIndexRoute: typeof NavbarAuthedModulesModuleActivityIndexRoute
  NavbarAuthedModulesModuleActivityIdBeginRoute: typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  NavbarAuthedModulesModuleActivityIdIndexRoute: typeof NavbarAuthedModulesModuleActivityIdIndexRoute
}

const NavbarAuthedRouteChildren: NavbarAuthedRouteChildren = {
  NavbarAuthedModulesIndexRoute: NavbarAuthedModulesIndexRoute,
  NavbarAuthedModulesModuleIndexRoute: NavbarAuthedModulesModuleIndexRoute,
  NavbarAuthedModulesModuleActivityIndexRoute:
    NavbarAuthedModulesModuleActivityIndexRoute,
  NavbarAuthedModulesModuleActivityIdBeginRoute:
    NavbarAuthedModulesModuleActivityIdBeginRoute,
  NavbarAuthedModulesModuleActivityIdIndexRoute:
    NavbarAuthedModulesModuleActivityIdIndexRoute,
}

const NavbarAuthedRouteWithChildren = NavbarAuthedRoute._addFileChildren(
  NavbarAuthedRouteChildren,
)

interface NavbarRouteChildren {
  NavbarAuthedRoute: typeof NavbarAuthedRouteWithChildren
  NavbarIndexRoute: typeof NavbarIndexRoute
  NavbarLoginIndexRoute: typeof NavbarLoginIndexRoute
  NavbarSignupIndexRoute: typeof NavbarSignupIndexRoute
}

const NavbarRouteChildren: NavbarRouteChildren = {
  NavbarAuthedRoute: NavbarAuthedRouteWithChildren,
  NavbarIndexRoute: NavbarIndexRoute,
  NavbarLoginIndexRoute: NavbarLoginIndexRoute,
  NavbarSignupIndexRoute: NavbarSignupIndexRoute,
}

const NavbarRouteWithChildren =
  NavbarRoute._addFileChildren(NavbarRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof NavbarAuthedRouteWithChildren
  '/original_index': typeof OriginalindexRoute
  '/': typeof NavbarIndexRoute
  '/login': typeof NavbarLoginIndexRoute
  '/signup': typeof NavbarSignupIndexRoute
  '/modules': typeof NavbarAuthedModulesIndexRoute
  '/modules/$module': typeof NavbarAuthedModulesModuleIndexRoute
  '/modules/$module/activity': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/modules/$module/activity/$id': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
}

export interface FileRoutesByTo {
  '/original_index': typeof OriginalindexRoute
  '': typeof NavbarAuthedRouteWithChildren
  '/': typeof NavbarIndexRoute
  '/login': typeof NavbarLoginIndexRoute
  '/signup': typeof NavbarSignupIndexRoute
  '/modules': typeof NavbarAuthedModulesIndexRoute
  '/modules/$module': typeof NavbarAuthedModulesModuleIndexRoute
  '/modules/$module/activity': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/modules/$module/activity/$id': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_navbar': typeof NavbarRouteWithChildren
  '/original_index': typeof OriginalindexRoute
  '/_navbar/_authed': typeof NavbarAuthedRouteWithChildren
  '/_navbar/': typeof NavbarIndexRoute
  '/_navbar/login/': typeof NavbarLoginIndexRoute
  '/_navbar/signup/': typeof NavbarSignupIndexRoute
  '/_navbar/_authed/modules/': typeof NavbarAuthedModulesIndexRoute
  '/_navbar/_authed/modules/$module/': typeof NavbarAuthedModulesModuleIndexRoute
  '/_navbar/_authed/modules/$module/activity/': typeof NavbarAuthedModulesModuleActivityIndexRoute
  '/_navbar/_authed/modules/$module/activity/$id/begin': typeof NavbarAuthedModulesModuleActivityIdBeginRoute
  '/_navbar/_authed/modules/$module/activity/$id/': typeof NavbarAuthedModulesModuleActivityIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/original_index'
    | '/'
    | '/login'
    | '/signup'
    | '/modules'
    | '/modules/$module'
    | '/modules/$module/activity'
    | '/modules/$module/activity/$id/begin'
    | '/modules/$module/activity/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/original_index'
    | ''
    | '/'
    | '/login'
    | '/signup'
    | '/modules'
    | '/modules/$module'
    | '/modules/$module/activity'
    | '/modules/$module/activity/$id/begin'
    | '/modules/$module/activity/$id'
  id:
    | '__root__'
    | '/_navbar'
    | '/original_index'
    | '/_navbar/_authed'
    | '/_navbar/'
    | '/_navbar/login/'
    | '/_navbar/signup/'
    | '/_navbar/_authed/modules/'
    | '/_navbar/_authed/modules/$module/'
    | '/_navbar/_authed/modules/$module/activity/'
    | '/_navbar/_authed/modules/$module/activity/$id/begin'
    | '/_navbar/_authed/modules/$module/activity/$id/'
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
        "/_navbar/",
        "/_navbar/login/",
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
        "/_navbar/_authed/modules/",
        "/_navbar/_authed/modules/$module/",
        "/_navbar/_authed/modules/$module/activity/",
        "/_navbar/_authed/modules/$module/activity/$id/begin",
        "/_navbar/_authed/modules/$module/activity/$id/"
      ]
    },
    "/_navbar/": {
      "filePath": "_navbar/index.tsx",
      "parent": "/_navbar"
    },
    "/_navbar/login/": {
      "filePath": "_navbar/login/index.tsx",
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
    "/_navbar/_authed/modules/$module/activity/": {
      "filePath": "_navbar/_authed/modules/$module/activity/index.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/begin": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/begin.tsx",
      "parent": "/_navbar/_authed"
    },
    "/_navbar/_authed/modules/$module/activity/$id/": {
      "filePath": "_navbar/_authed/modules/$module/activity/$id/index.tsx",
      "parent": "/_navbar/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
