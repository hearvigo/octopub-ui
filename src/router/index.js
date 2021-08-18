import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/app',
    component: Layout,
    redirect: '/app/list',
    name: 'App',
    meta: { title: '应用管理', icon: 'publish' },
    children: [
      {
        path: 'pod',
        name: 'Pod',
        component: () => import('@/views/pod/index'),
        meta: { title: 'Pod', icon: 'tree' }
      },
      {
        path: 'list',
        name: 'AppList',
        component: () => import('@/views/app/index'),
        meta: { title: 'APP', icon: 'table' }
      },
      {
        path: 'create',
        name: 'AppCreate',
        hidden: true,
        component: () => import('@/views/app/edit/index'),
        meta: { title: 'APP', icon: 'table' }
      },
      {
        path: 'edit/:appId',
        name: 'AppEdit',
        hidden: true,
        component: () => import('@/views/app/edit/index'),
        meta: { title: 'APP', icon: 'table' }
      }
    ]
  },

  {
    path: '/publish',
    component: Layout,
    redirect: '/publish/list',
    name: 'Publish',
    meta: { title: '发布管理', icon: 'publish' },
    children: [
      {
        path: 'list',
        name: 'PublishList',
        component: () => import('@/views/publish/index'),
        meta: { title: 'Publish', icon: 'table' }
      },
      {
        path: 'detail/:publishId',
        name: 'PublishDetail',
        hidden: true,
        component: () => import('@/views/publish/detail/index'),
        meta: { title: 'PublishDetail', icon: 'table' }
      }
    ]
  },

  {
    path: '/dev',
    component: Layout,
    redirect: '/dev/jenkins',
    name: 'Dev',
    meta: { title: '研发内部平台', icon: 'develop' },
    children: [
      {
        path: 'jenkins',
        component: Layout,
        children: [
          {
            path: 'https://jenkins.nonda.io',
            meta: { title: 'Jenkins', icon: 'jenkins' }
          }
        ]
      },

      {
        path: 'kibana',
        component: Layout,
        children: [
          {
            path: 'https://kibana.nonda.io',
            meta: { title: '日志中心', icon: 'log' }
          }
        ]
      },

      {
        path: 'rabbit',
        component: Layout,
        children: [
          {
            path: 'https://rabbit.nonda.io',
            meta: { title: 'RabbitMQ(生产)', icon: 'rabbitmq' }
          }
        ]
      },

      {
        path: 'rabbit-qa',
        component: Layout,
        children: [
          {
            path: 'https://rabbit-qa.nonda.io',
            meta: { title: 'RabbitMQ(测试)', icon: 'rabbitmq' }
          }
        ]
      },

      {
        path: 'config',
        component: Layout,
        children: [
          {
            path: 'https://config.nonda.io',
            meta: { title: '配置中心', icon: 'config' }
          }
        ]
      },

      {
        path: 'octojob',
        component: Layout,
        children: [
          {
            path: 'https://octojob.nonda.io',
            meta: { title: '调度中心', icon: 'octopus' }
          }
        ]
      },

      {
        path: 'grafana',
        component: Layout,
        children: [
          {
            path: 'https://grafana.nonda.io',
            meta: { title: '监控平台', icon: 'monitor' }
          }
        ]
      },

      {
        path: 'mock',
        component: Layout,
        children: [
          {
            path: 'https://mock.nonda.io',
            meta: { title: 'Mock平台', icon: 'mock' }
          }
        ]
      },

      {
        path: 'aws',
        component: Layout,
        children: [
          {
            path: 'https://699713854440.signin.aws.amazon.com/console',
            meta: { title: 'AWS控制台', icon: 'aws' }
          }
        ]
      },

      {
        path: 'wiki',
        component: Layout,
        children: [
          {
            path: 'https://wiki.nondagroup.com',
            meta: { title: 'Wiki', icon: 'confluence' }
          }
        ]
      },

      {
        path: 'jira',
        component: Layout,
        children: [
          {
            path: 'https://jira.nondagroup.com',
            meta: { title: 'Jira', icon: 'jira' }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
