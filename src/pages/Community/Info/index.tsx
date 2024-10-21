import React, { useState, useRef } from 'react';
import { ActionType, PageContainer, ProColumns, ProColumnType, ProTable } from '@ant-design/pro-components';
import { Modal, Form, Input, Select, DatePicker, message, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { fetchCommunityTableInfo } from '@/services';
import { FormInstance } from 'antd';

import './index.less'

const { TextArea } = Input;
const { Option } = Select;


interface CommunityType {
  id: number;
  name: string;
  district_code: string;
  address: string;
  state: number;
  business_start_time: string;
  business_end_time: string;
  deliver_start_time: string;
  deliver_end_time: string;
  deliver_type: number;
  payment_type: number;
  content?: string;
  banner_product_Ids?: string;
  admin_id: number;
}


const CommunityManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance>();

  const handleAddOrEdit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          // 编辑操作逻辑
          // updateRecord(values);
        } else {
          // 新增操作逻辑
          // addRecord(values);
        }
        setModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
        message.success('操作成功！');
        actionRef.current?.reload();
      })
      .catch((info) => {
        console.log('验证失败:', info);
      });
  };

  const columns: ProColumns<CommunityType>[] = [
    {
      title: '社区名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '社区归属地',
      dataIndex: 'district_code',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: '社区地址',
      dataIndex: 'address',
      valueType: 'text',
    },
    {
      title: '社区状态',
      dataIndex: 'state',
      valueEnum: {
        1: { text: '正常运营', status: 'Success' },
        2: { text: '整改中', status: 'Error' },
      },
    },
    {
      title: '营业时间',
      dataIndex: 'business_start_time',
      valueType: 'dateTimeRange',
      render: (_, record) => `${record.business_start_time} ~ ${record.business_end_time}`,
    },
    {
      title: '配送方式',
      dataIndex: 'deliver_type',
      valueEnum: {
        1: { text: '社区点自提' },
        2: { text: '送货上门' },
      },
    },
    {
      title: '支付方式',
      dataIndex: 'payment_type',
      valueEnum: {
        1: { text: '微信支付' },
        2: { text: '支付宝支付' },
        3: { text: '现金' },
      },
      hideInSearch:true,
    },
    {
      title: '备注信息',
      dataIndex: 'content',
      valueType: 'textarea',
      ellipsis:{showTitle:true},
      width:120,
      hideInSearch:true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
            }}
          >
          编辑
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];
  return (
    <PageContainer
    ghost
    header={{
      title: '社区管理',
    }}
    >
      <ProTable<CommunityType>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          // 获取社区数据的接口调用
          const data = await fetchCommunityTableInfo(params);
          console.log('data',data?.data.data)
          return {
            data: data.data.data,       // 当前页的数据
            total: data.data.data.length,     // 总数据条数
            success: true, // 是否成功
            pageSize: params.pageSize,  // 返回 pageSize
            current: params.current,    // 返回 current 当前页码
          }
        }}
        formRef={tableFormRef}
        rowKey="id"
        search={{
          filterType:'query',
          className:'tool-bar-wrap',
        }}
        form={{
          syncToUrl: true, // 保证表单搜索状态和 URL 同步
        }}
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <a
            key="add"
            onClick={() => {
              setModalVisible(true);
              setEditingRecord(null);
              form.resetFields();
            }}
          >
            <PlusOutlined /> 新建社区
          </a>,
        ]}
      />

      <Modal
        visible={modalVisible}
        title={editingRecord ? '编辑社区' : '新建社区'}
        onCancel={() => {
          setModalVisible(false);
          setEditingRecord(null);
        }}
        onOk={handleAddOrEdit}
        style={{
          width:800
        }}
        width={800}
        className="ctx-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="社区名称" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入社区名称" />
          </Form.Item>
          <Form.Item
            label="社区归属地"
            name="district_code"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入社区归属地" />
          </Form.Item>
          <Form.Item label="社区地址" name="address" rules={[{ required: true }]}>
            <Input placeholder="请输入社区地址" />
          </Form.Item>
          <Form.Item label="社区状态" name="state" initialValue={1}>
            <Select>
              <Option value={1}>正常运营</Option>
              <Option value={2}>整改中</Option>
            </Select>
          </Form.Item>
          <Form.Item label="社区营业时间">
            <Form.Item name="business_start_time">
              <DatePicker showTime placeholder="开始时间" />
            </Form.Item>
            <Form.Item name="business_end_time">
              <DatePicker showTime placeholder="结束时间" />
            </Form.Item>
          </Form.Item>
          <Form.Item label="社区配送时间">
            <Form.Item name="deliver_start_time">
              <DatePicker showTime placeholder="配送开始时间" />
            </Form.Item>
            <Form.Item name="deliver_end_time">
              <DatePicker showTime placeholder="配送结束时间" />
            </Form.Item>
          </Form.Item>
          <Form.Item label="配送方式" name="deliver_type" initialValue={1}>
            <Select>
              <Option value={1}>社区点自提</Option>
              <Option value={2}>送货上门</Option>
            </Select>
          </Form.Item>
          <Form.Item label="支付方式" name="payment_type" initialValue={1}>
            <Select>
              <Option value={1}>微信支付</Option>
              <Option value={2}>支付宝支付</Option>
              <Option value={3}>现金</Option>
            </Select>
          </Form.Item>
          <Form.Item label="社区团长ID" name="admin_id" rules={[{ required: true }]}>
            <Input placeholder="请输入社区团长ID" />
          </Form.Item>
          <Form.Item label="社区备注" name="content">
            <TextArea rows={3} placeholder="请输入社区备注" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default CommunityManagement;
