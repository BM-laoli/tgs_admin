import { createUser, deleteUser, updateUser, userPage } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  Modal,
  Popconfirm,
  Select,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

export enum ApproveStatus
{
 // 审核状态; 0=无审核申请, 1=审核中, 2=审核通过, 3=审核驳回
 NotApprove = 0,
 Approving = 1,
 ApproveSuccess = 2,
 ApproveReject = 3
}

export const ApproveStatusConst = {
  [ApproveStatus.NotApprove]:"无操作",
  [ApproveStatus.Approving]:"审核中",
  [ApproveStatus.ApproveSuccess]:"审核通过",
  [ApproveStatus.ApproveReject]:"审核驳回",
}
export interface Userinfo {
  username: string;
  phone: string;
  enable: number;
  approveStatus: number;
  roleId: number | null;
  communityId: number | null;
  avatar: string | null;
  provinceCode: string | null;
  cityCode: string | null;
  districtCode: string | null;
  streetCode: string | null;
  address: string | null;
  approveRejectReason: string | null;
  id: number;
  createdAt: string;
  updatedAt: string | null;
  creatorId: number;
  isDeleted: number;
}
const User = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance>();
  const columns: ProColumns<Userinfo>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'text',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      valueType: 'text',
    },
    {
      title: '启用状态',
      dataIndex: 'enable',
      valueType: 'switch',
    },
    {
      title: '审批状态',
      dataIndex: 'approveStatus',
      valueType: 'switch',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'date',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setModalVisible(true);
              console.log('record', record);
              setEditingRecord(record);
              form.setFieldsValue({
                ...record,
              });
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteUserInfo(record.id);
            }}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleAddOrEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (editingRecord) {
          // 编辑操作逻辑
          console.log('editingRecord', editingRecord);
          console.log('value', values);
          delete values.password;
          delete values.approveRejectReason;
          await updateUserReq({
            id: values.id,
            userInfo: { ...values, updatedAt: dayjs(Date.now()).toISOString() },
          });
        } else {
          // 新增操作逻辑
          // 补全漏掉的参数
          const preData = {
            ...values,
            createdAt: dayjs(Date.now()).toISOString(),
            updatedAt: dayjs(Date.now()).toISOString(),
            creatorId: 0,
            enable: 1,
            roleId: 0,
            communityId: 0,
            // 这个要接入 高德的SDK@TODO:
            avatar: '',
            provinceCode: '',
            cityCode: '',
            districtCode: '',
            streetCode: '',
            address: '',
          };
          await createUserReq(preData);
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

  const deleteUserInfo = async (id) => {
    await deleteUserReq(id);
    message.success('操作成功！');
    actionRef.current?.reload();
  };

  const { run: createUserReq } = useRequest((v) => createUser(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: deleteUserReq } = useRequest((v) => deleteUser(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: updateUserReq } = useRequest((v) => updateUser(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <PageContainer
      ghost
      header={{
        title: '社区管理',
      }}
    >
      <ProTable<Userinfo>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          // 获取社区数据的接口调用
          const data = await userPage({
            pageInfo: params,
          });
          return {
            data: data.data.data, // 当前页的数据
            total: data.data.totalCount, // 总数据条数
            success: true, // 是否成功
            pageSize: data.data.pageSize, // 返回 pageSize
            current: params.current, // 返回 current 当前页码
          };
        }}
        formRef={tableFormRef}
        rowKey="id"
        search={{
          filterType: 'query',
          className: 'tool-bar-wrap',
        }}
        form={{
          syncToUrl: true, // 保证表单搜索状态和 URL 同步
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 6,
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
        title={editingRecord ? '编辑用户' : '新建用户'}
        onCancel={() => {
          setModalVisible(false);
          setEditingRecord(null);
        }}
        onOk={handleAddOrEdit}
        style={{
          width: 800,
        }}
        width={800}
        className="ctx-modal"
      >
        <Form form={form} layout="vertical">
          <ProFormText
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          />
          <ProFormText
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话!' }]}
          />
          <ProFormText
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入具体的地址!' }]}
          />
          <ProFormText.Password
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码' }]}
          />
          <ProFormSelect
            name="roleId"
            label="选择角色"
            options={[
              { label: '管理员', value: 1 },
              { label: '编辑', value: 2 },
              { label: '访客', value: 3 },
              // 可以根据实际角色添加更多选项
            ]}
          />

          <ProFormSelect
            name="communityId"
            label="选择社区"
            options={[
              { label: '社区A', value: 1 },
              { label: '社区B', value: 2 },
              { label: '社区C', value: 3 },
              // 可以根据实际社区添加更多选项
            ]}
          />
          {/* 非 显示输入项 */}
          <ProFormText hidden name="avatar" label="头像" />
          <ProFormText hidden name="provinceCode" label="省份代码" />
          <ProFormText hidden name="cityCode" label="城市代码" />
          <ProFormText hidden name="districtCode" label="区县代码" />
          <ProFormText hidden name="streetCode" label="街道代码" />
          <ProFormText hidden name="address" label="详细地址" />
          <ProFormText hidden name="approveRejectReason" label="审批拒绝原因" />
          {editingRecord && (
            <ProFormText
              name="id"
              label="用户ID"
              hidden // 通常用户ID是系统生成的，不需要显示
            />
          )}
          <ProFormDatePicker
            hidden
            name="createdAt"
            label="创建时间"
            disabled
          />
          <ProFormDatePicker
            hidden
            name="updatedAt"
            label="更新时间"
            disabled
          />
          <ProFormText
            name="creatorId"
            label="创建者ID"
            hidden // 通常创建者ID是系统生成的，不需要显示
          />
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default User;
