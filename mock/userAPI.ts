import Mock from 'mockjs';


// const mockCommunityList = Mock.mock({
//   'data|10': [
//     {
//       'id|+1': 1,
//       name: '@cword(3, 5)社区',
//       district_code: '@county(true)', // 模拟省市区地址
//       address: '@county(true) @ctitle(5, 10)路 @natural(1, 200)号',
//       state: '@integer(1, 2)', // 1: 正常运营, 2: 整改中
//       business_start_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
//       business_end_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
//       deliver_start_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
//       deliver_end_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
//       deliver_type: '@integer(1, 2)', // 1: 社区点自提, 2: 送货上门
//       payment_type: '@integer(1, 3)', // 1: 微信支付, 2: 支付宝支付, 3: 现金
//       content: '@cparagraph(1, 3)', // 社区备注信息
//       banner_product_Ids: '@natural(1, 100),@natural(1, 100),@natural(1, 100)', // Banner商品ID
//       admin_id: '@natural(1, 100)', // 社区团长ID
//     },
//   ],
// });
const mockCommunityList = {data:
  [
    {
      "id": 1,
      "name": "幸福社区",
      "district_code": "北京市 朝阳区",
      "address": "北京市 朝阳区 建国路 89号",
      "state": 1,
      "business_start_time": "08:00:00",
      "business_end_time": "18:00:00",
      "deliver_start_time": "09:00:00",
      "deliver_end_time": "17:00:00",
      "deliver_type": 1,
      "payment_type": 2,
      "content": "幸福社区是一个新型社区，拥有完善的配套设施。",
      "banner_product_Ids": "23,45,78",
      "admin_id": 12
    },
    {
      "id": 2,
      "name": "和谐社区",
      "district_code": "上海市 浦东新区",
      "address": "上海市 浦东新区 张江路 125号",
      "state": 1,
      "business_start_time": "08:30:00",
      "business_end_time": "17:30:00",
      "deliver_start_time": "10:00:00",
      "deliver_end_time": "16:00:00",
      "deliver_type": 2,
      "payment_type": 1,
      "content": "和谐社区提供无接触配送，安全便捷。",
      "banner_product_Ids": "13,57,90",
      "admin_id": 34
    },
    {
      "id": 3,
      "name": "繁荣社区",
      "district_code": "广州市 天河区",
      "address": "广州市 天河区 体育西路 77号",
      "state": 2,
      "business_start_time": "09:00:00",
      "business_end_time": "17:00:00",
      "deliver_start_time": "10:00:00",
      "deliver_end_time": "16:00:00",
      "deliver_type": 1,
      "payment_type": 3,
      "content": "繁荣社区目前正在进行改造升级。",
      "banner_product_Ids": "21,37,84",
      "admin_id": 21
    },
    {
      "id": 4,
      "name": "友谊社区",
      "district_code": "深圳市 福田区",
      "address": "深圳市 福田区 车公庙路 88号",
      "state": 1,
      "business_start_time": "08:00:00",
      "business_end_time": "18:00:00",
      "deliver_start_time": "09:30:00",
      "deliver_end_time": "17:30:00",
      "deliver_type": 2,
      "payment_type": 2,
      "content": "友谊社区注重邻里关系和谐发展。",
      "banner_product_Ids": "19,25,67",
      "admin_id": 56
    },
    {
      "id": 5,
      "name": "绿茵社区",
      "district_code": "成都市 武侯区",
      "address": "成都市 武侯区 武侯大道 99号",
      "state": 1,
      "business_start_time": "08:00:00",
      "business_end_time": "19:00:00",
      "deliver_start_time": "10:00:00",
      "deliver_end_time": "18:00:00",
      "deliver_type": 1,
      "payment_type": 1,
      "content": "绿茵社区环境优美，绿化覆盖率高。",
      "banner_product_Ids": "33,42,88",
      "admin_id": 67
    }
  ]
}

const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

const wrap  = (data) => {
  return {
    success: true,
    data: data,
    code: 401,
    message:'登录失败'
  }
}

/** @关于mock user 相关的信息 */
const getUserInfo = () => {
  return {
    baseInfo: {
      name: '张三',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      phone: '13800138000',
    },
    authInfo: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJuYW1lIjoiZGVtbyIsImlhdCI6MTYwMzI4OTY1MiwibmJmIjoxNjAzMjg5NjUyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    menuInfo: [
      {
        name: '首页',
        path: '/home',
        icon: 'home',
        routes: [
          {
            name: '仪表盘',
            path: '/home/dashboard',
            icon: 'dashboard',
            component: 'DashboardComponent',
          },
        ],
      },
      {
        name: '用户管理',
        path: '/user',
        icon: 'user',
        routes: [
          {
            name: '用户列表',
            path: '/user/list',
            icon: 'list',
            component: 'UserListComponent',
          },
          {
            name: '用户详情',
            path: '/user/detail',
            icon: 'detail',
            component: 'UserDetailComponent',
          },
        ],
      },
    ],
    roleInfo: ['admin', 'editor'],
  };
};

/** @关于mock 用户登录 */
const userLogin = () => {
  return getUserInfo()
}


const mockProducts = [
  {
    id: 1,
    name: 'Apple iPhone 14',
    main_image_url: 'https://example.com/images/iphone14-main.jpg',
    additional_image_urls: JSON.stringify([
      'https://example.com/images/iphone14-1.jpg',
      'https://example.com/images/iphone14-2.jpg',
    ]),
    description: '最新款苹果手机，搭载 A15 仿生芯片，支持 5G。',
    specifications: '颜色: 黑色; 容量: 128GB;',
    sku: 'APL-IPH-14-128B',
    barcode: '1234567890123',
    brand: 'Apple',
    category_id: 101,
    price: 6999.99,
    cost_price: 5999.99,
    retail_price: 7499.99,
    stock: 50,
    tags: '智能手机,苹果,5G',
    status: 1, // 上架
    origin: '中国',
    attributes: JSON.stringify({ waterproof: true, wirelessCharging: true }),
    expiry_date: null,
    slogan: '改变世界，再次。',
    rating: 4.8,
    review_count: 1500,
    content: '<h3>Apple iPhone 14 详细介绍</h3><p>iPhone 14 拥有强大的 A15 仿生芯片...</p>',
    available_from: '2024-01-01T08:00:00Z',
    available_until: null,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    main_image_url: 'https://example.com/images/s23-main.jpg',
    additional_image_urls: JSON.stringify([
      'https://example.com/images/s23-1.jpg',
      'https://example.com/images/s23-2.jpg',
    ]),
    description: '三星旗舰智能手机，超清摄像头，支持 8K 视频录制。',
    specifications: '颜色: 白色; 容量: 256GB;',
    sku: 'SMS-GAL-S23-256W',
    barcode: '1234567890124',
    brand: 'Samsung',
    category_id: 102,
    price: 5999.99,
    cost_price: 4999.99,
    retail_price: 6499.99,
    stock: 30,
    tags: '智能手机,三星,8K拍摄',
    status: 1,
    origin: '韩国',
    attributes: JSON.stringify({ waterproof: true, wirelessCharging: true }),
    expiry_date: null,
    slogan: '未来已来。',
    rating: 4.7,
    review_count: 1200,
    content: '<h3>Samsung Galaxy S23 亮点</h3><p>Galaxy S23 拥有 8K 视频录制功能...</p>',
    available_from: '2024-02-15T08:00:00Z',
    available_until: null,
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 无线耳机',
    main_image_url: 'https://example.com/images/wh1000xm5-main.jpg',
    additional_image_urls: JSON.stringify([
      'https://example.com/images/wh1000xm5-1.jpg',
      'https://example.com/images/wh1000xm5-2.jpg',
    ]),
    description: '高品质降噪无线耳机，长达 30 小时电池续航。',
    specifications: '颜色: 黑色;',
    sku: 'SON-WH1000XM5',
    barcode: '1234567890125',
    brand: 'Sony',
    category_id: 103,
    price: 1999.99,
    cost_price: 1499.99,
    retail_price: 2199.99,
    stock: 100,
    tags: '无线耳机,降噪,索尼',
    status: 1,
    origin: '日本',
    attributes: JSON.stringify({ noiseCancelling: true, bluetooth: true }),
    expiry_date: null,
    slogan: '沉浸于纯净之声。',
    rating: 4.9,
    review_count: 800,
    content: '<h3>Sony WH-1000XM5 功能介绍</h3><p>这款耳机拥有先进的降噪技术...</p>',
    available_from: '2024-03-10T08:00:00Z',
    available_until: null,
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    main_image_url: 'https://example.com/images/airmax270-main.jpg',
    additional_image_urls: JSON.stringify([
      'https://example.com/images/airmax270-1.jpg',
      'https://example.com/images/airmax270-2.jpg',
    ]),
    description: '耐克经典款运动鞋，舒适透气，适合长时间穿着。',
    specifications: '颜色: 红色; 尺码: 42;',
    sku: 'NKE-AIRMAX270-42R',
    barcode: '1234567890126',
    brand: 'Nike',
    category_id: 104,
    price: 799.99,
    cost_price: 599.99,
    retail_price: 899.99,
    stock: 200,
    tags: '运动鞋,耐克,舒适',
    status: 1,
    origin: '越南',
    attributes: JSON.stringify({ breathable: true, lightweight: true }),
    expiry_date: null,
    slogan: '跑步的艺术。',
    rating: 4.6,
    review_count: 500,
    content: '<h3>Nike Air Max 270 优势</h3><p>这双鞋采用了最新的气垫技术...</p>',
    available_from: '2024-04-01T08:00:00Z',
    available_until: null,
  },
  {
    id: 5,
    name: 'Dyson V12 吸尘器',
    main_image_url: 'https://example.com/images/dyson-v12-main.jpg',
    additional_image_urls: JSON.stringify([
      'https://example.com/images/dyson-v12-1.jpg',
      'https://example.com/images/dyson-v12-2.jpg',
    ]),
    description: '强效吸尘器，智能激光除尘，适合家庭清洁。',
    specifications: '颜色: 银色;',
    sku: 'DYS-V12-SLVR',
    barcode: '1234567890127',
    brand: 'Dyson',
    category_id: 105,
    price: 4999.99,
    cost_price: 3999.99,
    retail_price: 5299.99,
    stock: 80,
    tags: '吸尘器,戴森,家居清洁',
    status: 1,
    origin: '英国',
    attributes: JSON.stringify({ laserDustDetection: true, cordless: true }),
    expiry_date: null,
    slogan: '吸力无与伦比。',
    rating: 4.9,
    review_count: 600,
    content: '<h3>Dyson V12 吸尘器性能</h3><p>Dyson V12 采用了最新的激光除尘技术...</p>',
    available_from: '2024-05-01T08:00:00Z',
    available_until: null,
  }
];

const mockOrderData  = [
  {
    orderId: 1,
    orderNumber: 'ORD-20241007-001',
    externalOrderNumber: 'EXT-20241007-001',
    orderTime: '2024-10-07T10:30:00Z', // ISO 8601 格式的时间
    paymentMethod: 1, // 微信支付
    deliveryAddress: '广西桂林市某某小区1栋101',
    totalAmount: 199.99,
    paymentStatus: 1, // 支付成功
  },
  {
    orderId: 2,
    orderNumber: 'ORD-20241007-002',
    externalOrderNumber: 'EXT-20241007-002',
    orderTime: '2024-10-07T11:00:00Z',
    paymentMethod: 2, // 支付宝
    deliveryAddress: '广西桂林市某某小区2栋202',
    totalAmount: 299.50,
    paymentStatus: 1, // 未支付 0
  },
  {
    orderId: 3,
    orderNumber: 'ORD-20241007-003',
    externalOrderNumber: 'EXT-20241007-003',
    orderTime: '2024-10-07T11:30:00Z',
    paymentMethod: 3, // 现金
    deliveryAddress: '广西桂林市某某小区3栋303',
    totalAmount: 89.90,
    paymentStatus: 1, // 支付失败 2
  },
  {
    orderId: 4,
    orderNumber: 'ORD-20241007-004',
    externalOrderNumber: 'EXT-20241007-004',
    orderTime: '2024-10-07T12:00:00Z',
    paymentMethod: 0, // 未指定
    deliveryAddress: '广西桂林市某某小区4栋404',
    totalAmount: 159.75,
    paymentStatus: 1, // 未支付
  },
  {
    orderId: 5,
    orderNumber: 'ORD-20241007-005',
    externalOrderNumber: 'EXT-20241007-005',
    orderTime: '2024-10-07T12:30:00Z',
    paymentMethod: 1, // 微信支付
    deliveryAddress: '广西桂林市某某小区5栋505',
    totalAmount: 349.00,
    paymentStatus: 1, // 支付成功
  },
];


export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v1/login': (req: any, res: any) => {
    res.json(wrap(userLogin()));
    // res.status(401).json(wrap(userLogin()));
  },
  'POST /api/v1/community/page': (req: any, res: any) => {
    res.json({
      success: true,
      data: mockCommunityList,
      code: 200,
      message:null
    });
  },
  'POST /api/v1/product/page': (req: any, res: any) => {
    res.json({
      success: true,
      data: mockProducts,
      code: 200,
      message:null
    });
  },
  'POST /api/v1/order/page': (req: any, res: any) => {
    res.json({
      success: true,
      data: mockOrderData,
      code: 200,
      message:null
    });
  },
};
