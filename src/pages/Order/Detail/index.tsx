import React from 'react';
import {
  Button,
  Steps,
  Descriptions,
  Typography,
  Space,
} from 'antd';
import { PageContainer, ProCard, ProList } from "@ant-design/pro-components";

const { Title } = Typography;

const OrderDetail = () => {
  // 订单数据示例
  const orderInfo = {
    orderNumber: '253034234692347923749',
    externalOrderNumber: 'ODSFALDSH530234692347923749',
    orderTime: '2022年1月28日 18:41:21',
    paymentMethod: '微信支付',
    status: 1, // 1 表示已支付
    deliveryAddress: '广东省 深圳市 龙华区 民治街道锦绣湾一期B栋19单元343室',
    totalAmount: 1390.00,
    buyer: {
      name: '张三',
      phone: '18565683358',
      note: '干万别给我发错订单。',
    },
    items: [
      {
        productName: '华为 nova 7 6+256G',
        unitPrice: 1490.00,
        quantity: 1,
        discount: 100.00,
        subtotal: 1390.00,
      },
    ],
    orderStatusHistory: [
      {
        status: '待支付',
        time: '2022年1月28日 18:41:21',
      },
      {
        status: '已支付',
        time: '2022年1月28日 18:42:21',
      },
      {
        status: '配送中',
        time: '2022年1月29日 10:00:00',
      },
      {
        status: '交易完成',
        time: '预计 2022年1月28日 完成',
      },
    ],
  };

  // 订单状态的步骤
  const steps = [
    {
      title: '买家下单',
      description: orderInfo.orderTime,
    },
    {
      title: '买家已付款',
      description: '付款时间: 2022年1月28日 18:41:21',
    },
    {
      title: '商家发货',
      description: '预计配送时间: 2022年1月29日 10:00:00',
    },
    {
      title: '交易完成',
      description: '',
    },
  ];

  // 状态颜色映射
  const statusColorMap = {
    '待支付': 'orange',
    '已支付': 'blue',
    '配送中': 'purple',
    '交易完成': 'green',
  };

  return (
    <PageContainer
      ghost
      header={{
        title: "订单详情"
      }}
    >
      <ProCard >
        {/* 订单状态进度 */}
        <Steps current={1}>
          {steps.map((step, index) => (
            <Steps.Step key={index} title={step.title} description={step.description} />
          ))}
        </Steps>

        <Title level={4} style={{ margin: '16px 0' }}>订单信息</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="订单号">{orderInfo.externalOrderNumber}</Descriptions.Item>
          <Descriptions.Item label="支付方式">{orderInfo.paymentMethod}</Descriptions.Item>
          <Descriptions.Item label="配送地址">{orderInfo.deliveryAddress}</Descriptions.Item>
          <Descriptions.Item label="订单状态">
            <span style={{ color: orderInfo.status === 1 ? 'green' : 'red' }}>
              {orderInfo.status === 1 ? '已支付' : '待支付'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="备注">{orderInfo.buyer.note}</Descriptions.Item>
        </Descriptions>

        <Title level={4} style={{ margin: '16px 0' }}>买家信息</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="买家姓名">{orderInfo.buyer.name}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{orderInfo.buyer.phone}</Descriptions.Item>
        </Descriptions>

        <Title level={4} style={{ margin: '16px 0' }}>商品信息</Title>
        <ProList
          dataSource={orderInfo.items}
          rowKey="productName"
          pagination={false}
          metas={{
            title: {
              dataIndex: 'productName',
            },
            subTitle: {
              dataIndex: 'unitPrice',
              render: (text, record) => (
                <Space>
                  <span>{`单价：￥${text}`}</span>
                  <span>{`数量：${record.quantity}`}</span>
                  {/* <span>{`优惠：￥${record.discount}`}</span> */}
                  <span>{`小计：￥${record.subtotal}`}</span>
                </Space>
              ),
            },
          }}
        />

        <Title level={4} style={{ margin: '16px 0' }}>订单状态历史</Title>
        <ProList
          dataSource={orderInfo.orderStatusHistory}
          rowKey="time"
          pagination={false}
          metas={{
            title: {
              dataIndex: 'status',
              render: (text) => (
                <span style={{ color: statusColorMap[text] }}>{text}</span>
              ),
            },
            subTitle: {
              dataIndex: 'time',
            },
          }}
        />

        <div style={{ textAlign: 'right', fontSize: '16px', marginTop: '16px' }}>
          <strong>实收金额：￥{orderInfo.totalAmount}</strong>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default OrderDetail;
