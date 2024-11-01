// 运行时配置
import { history, RequestConfig, RunTimeLayoutConfig } from '@umijs/max';

import { HomeOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { USER_INFO_KEY } from './constants';

async function getInitialState() {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}');
  if (!userInfo.token) {
    history.push('/login');
    return;
  }

  return userInfo;
}

const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    title: 'Tgs_Admin',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      title: 'Tgs_Admin',
      locale: false,
      params: {
        userId: initialState?.currentUser?.userid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await fetchMenuData();
        return menuData;
      },
    },
    // 403
    unAccessible: <div>'unAccessible'</div>,
    // 404
    noFound: <div>'noFound'</div>,
    rightRender: () => {
      return <div>h2</div>;
    },
  };
};

const fetchMenuData = () => {
  return new Promise((resolve) => {
    resolve([
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页2',
        path: '/home',
        component: './Home',
        icon: <HomeOutlined />,
      },
      {
        name: '权限演示2',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
        access: 'canEdit',
      },
      {
        path: '/access2',
        name: 'access2',
        layout: false,
        routes: [
          { path: '/access2/list', component: '@/pages/Access2/List' },
          { path: '/access2/admin', component: '@/pages/Access2/Admin' },
        ],
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
      },
    ]);
  });
};

enum ErrorShowType {
  AUTH_FAIL = 401,
}

// 运行时配置
const request: RequestConfig = {
  baseURL:'http://localhost:5102',
  timeout: 5000,
  errorConfig: {
    errorHandler(res: any) {
      console.log('----> error',res)
      const { success, data, message: messageText, code } = res;
      if (!success) {
        //res.response?.data  是service 定义的
        message.error(res.response?.data?.message);

        switch (res.response.status) {
          case ErrorShowType.AUTH_FAIL:
            history.replace('/login');
            localStorage.removeItem(USER_INFO_KEY);
            break;
          default:
            break;
        }
      }
    },
    errorThrower() {},
  },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      console.log('----> requestInterceptors', config)

      // 拦截请求配置，进行个性化处理。
      const userInfo = JSON.parse(
        localStorage.getItem(USER_INFO_KEY) || '{}',
      ) as any;
      console.log('userInfo', config);
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: userInfo?.token,
        },
      };
    },
  ],
};

export {
  getInitialState,
  // layout,
  request,
};
