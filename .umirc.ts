import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'tgs_admin',
    locale: false,
  },
  routes: [
    // 演示用
    {
      path: '/',
      redirect: '/user-role/user-list',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: './Table',
      // access: 'canEdit',
    },
    // {
    //   name: '菜单1',
    //   path: '/node',
    //   component: './node/index',
    //   routes: [
    //     {
    //       name: '菜单1-group',
    //       path: 'group',
    //       component: '@/pages/node/group.tsx',
    //     }
    //   ]
    // },
    // 正式菜单
    {
      name: '用户和角色',
      path: '/user-role',
      icon: 'UserOutlined',
      // component: '', // 不需要统一布局
      routes: [
        {
          name: '用户列表',
          path: 'user-list',
          icon:'SnippetsOutlined',
          component: '@/pages/UserRole/User',
        },
        {
          name: '用户信息审核',
          path: 'user-audit',
          icon:'IssuesCloseOutlined',
          component: '@/pages/UserRole/UserAudit',
        },
        {
          name: '角色管理',
          path: 'role',
          icon:'ApartmentOutlined',
          component: '@/pages/UserRole/Role',
        },
        {
          name: '权限管理',
          path: 'permission',
          icon:'AuditOutlined',
          component: '@/pages/UserRole/Permission',
        },
      ]
    },
    {
      name: '社区管理',
      path: '/community',
      icon: 'UserOutlined',
      // component: '', // 不需要统一布局
      routes: [
        {
          name: '社区信息管理',
          path: 'community-info',
          component: '@/pages/Community/Info',
        },
        {
          name: '社区营销活动管理',
          path: 'community-campaigns',
          component: '@/pages/Community/Campaigns',
        },
      ]
    },
    {
      name: '商品管理',
      path: '/goods',
      icon: 'UserOutlined',
      // component: '', // 不需要统一布局
      routes: [
        {
          name: '商品池信息管理',
          path: 'goods-info-pool',
          component: '@/pages/Product/Pool',
        },
        {
          name: '社区商品信息管理', /** 仅社区团长可用 */
          path: 'goods-info-stores',
          component: '@/pages/Community/Campaigns',
        },
        {
          name: '商品评论管理',
          path: 'goods-info-stores-a1',
          component: '@/pages/Community/Campaigns',
        },
        {
          name: '商品详情',
          path: 'goods-info-stores-a2',
          component: '@/pages/Product/DetailPool',
          hideInMenu: true,
        },
      ]
    },
    {
      name: '订单管理',
      path: '/orders',
      icon: 'UserOutlined',
      // component: '', // 不需要统一布局
      routes: [
        {
          name: '订单列表',
          path: 'order-list',
          component: '@/pages/Order',
        },
        {
          name: '订单详情', /** 仅社区团长可用 */
          path: 'order-details',
          component: '@/pages/Order/Detail',
          hideInMenu: true,
        },
      ]
    },
    {
      name: ' 登录',
      path: '/login',
      component: './Login',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      menuHeaderRender: false,
      hideInMenu: true,
      hideInBreadcrumb: true,
    }
  ],
  npmClient: 'yarn',
});

