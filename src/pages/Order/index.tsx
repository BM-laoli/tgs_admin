import React, { useState, useRef, useEffect } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, message, Divider, Select, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getOrderPage } from '@/services'; // 假设你有一个服务用于获取订单数据

// Order 基础信息接口
interface OrderBaseInfo {
  user_ids: number;                // 用户 ID，关联社区表
  community_id: number;            // 社区 ID，关联社区表
  order_number: string;            // 唯一订单号
  total_amount: number;            // 订单总金额
  status: 0 | 1 | 2 | 3 | 4;        // 订单状态
  payment_method?: 0 | 1 | 2 | 3;  // 支付方式
  delivery_address: string;        // 配送地址
  delivery_method: 0 | 1 | 2;      // 配送方式
  order_time: Date;                // 下单时间
  payment_time?: Date;             // 支付时间
  delivery_time?: Date;            // 预计配送时间
  complete_time?: Date;            // 订单完成时间
  note?: string;                   // 订单备注信息
}

// Order 状态信息接口
interface OrderStatusInfo {
  order_id: number;                // 订单 ID，关联订单表
  status: 0 | 1 | 2 | 3 | 4;        // 订单状态
  status_change_time: Date;        // 状态变更时间
  note?: string;                   // 状态变更的备注信息
}

// Order 支付信息接口
interface PaymentInfo {
  order_id: number;                // 订单 ID，关联订单表
  payment_method: 0 | 1 | 2 | 3;    // 支付方式
  transaction_id: string;          // 支付交易 ID
  amount: number;                  // 实际支付金额
  payment_time: Date;              // 支付时间
  status: 0 | 1 | 2;               // 支付状态
}

interface OrderType {
  orderId: number;
  orderNumber: string;
  externalOrderNumber: string;
  orderTime: string;
  paymentMethod: number; // 0: 未指定, 1: 微信支付, 2: 支付宝, 3: 现金
  deliveryAddress: string;
  totalAmount: number;
  paymentStatus: number; // 0: 未支付, 1: 支付成功, 2: 支付失败
}

const OrderManagement = () => {
  const [editingRecord, setEditingRecord] = useState<OrderType | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  // 新增的 Tab 状态
  const [activeTabKey, setActiveTabKey] = useState<string>('wait');

  const tabs = [
    { key: 'wait', label: `已发货 (${5})` }, // 示例数据，可以动态更新
    { key: 'done', label: `未发货 (${0})` },
  ];

  // 当切换 Tab 时更新状态
 const handleTabChange = (key: string) => {
   setActiveTabKey(key);
   actionRef.current?.reload(); // 切换 Tab 时重新加载数据
 };

  // 支付状态映射
  const paymentStatuses = {
    0: '未支付',
    1: '支付成功',
    2: '支付失败',
  };



  // 初始化订单数据
  useEffect(() => {
    actionRef.current?.reload();
  }, []);

  const handleAddOrEdit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          // 编辑操作逻辑
          message.success('编辑订单成功！');
        } else {
          // 新增操作逻辑
          message.success('新增订单成功！');
        }
        setEditingRecord(null);
        form.resetFields();
        actionRef.current?.reload();
      })
      .catch((info) => {
        console.log('验证失败:', info);
      });
  };

  const columns: ProColumns<OrderType>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      valueType: 'text',
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      valueType: 'dateTime',
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      valueEnum: {
        0: { text: '未指定', status: 'Default' },
        1: { text: '微信支付', status: 'Success' },
        2: { text: '支付宝', status: 'Success' },
        3: { text: '现金', status: 'Warning' },
      },
    },
    {
      title: '配送地址',
      dataIndex: 'deliveryAddress',
      valueType: 'text',
    },
    {
      title: '订单总金额',
      dataIndex: 'totalAmount',
      valueType: 'money',
    },
    {
      title: '支付状态',
      dataIndex: 'paymentStatus',
      valueEnum: paymentStatuses,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              // setEditingRecord(record);
              // form.setFieldsValue(record);
            }}
          >
            详情
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: '订单管理',
      }}
    >
       <Tabs
        activeKey={activeTabKey}
        onChange={handleTabChange}
        style={{ marginBottom: 24}}
      >
        {tabs.map((tab) => (
          <Tabs.TabPane key={tab.key} tab={tab.label} />
        ))}
      </Tabs>

      <div style={{ flex:1 }}>
      <ProTable<OrderType>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          const data = await getOrderPage(); // 假设你有一个函数用于获取订单数据
              return {
                data: data.data, // 当前分类下的商品数据
                total: data.data.length,
                success: true,
              };
        }}
        rowKey="orderId"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          filterType: 'query',
        }}
      />
      </div>
    </PageContainer>
  );
};

export default OrderManagement;
