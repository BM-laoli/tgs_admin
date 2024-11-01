import { BaseDTO, createRole, createUser, deleteRole, deleteUser, queryRolePage, updateRole, updateUser, userPage } from '@/services';
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
  Modal,
  Popconfirm,
  Tag,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

export interface RoleInfo extends BaseDTO {
  id?: number;
  name?: string;
  enable?: number;
  icon?: string;
  description?: string;
}
const Role = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance>();
  const columns: ProColumns<RoleInfo>[] = [
    {
      title: 'icon',
      dataIndex: 'avatar',
      valueType: 'text',
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '启用状态',
      dataIndex: 'enable',
      render: (_,record) => {
        return  <>
        {/* 都把状态显示出来吧 */}
        { record.enable === 0 && <Tag color="#f50">禁用</Tag> }
        { record.enable === 1 && <Tag color="#87d068">启用</Tag> }
        </>
      }
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createdAt',
    //   valueType: 'date',
    // },
    // {
    //   title: '更新时间',
    //   dataIndex: 'updatedAt',
    //   valueType: 'date',
    // },
    {
      title: '操作',
      dataIndex: '',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setModalVisible(true);
              setEditingRecord(record);
              form.setFieldsValue({
                ...record,
              });
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              updateStatus(record)
            }}
          >
            {record.enable ? '禁用' : '启用'}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteRoleById(record.id);
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
        console.log('editingRecord', editingRecord);
        console.log('value', values);
        if (editingRecord) {
          // 编辑操作逻辑
          await updateRoleReq({
            id: editingRecord.id,
            ...values,
            updatedAt: dayjs(Date.now()).toISOString()
          });
        } else {
          // 新增操作逻辑
          // 补全漏掉的参数
          const preData = {
            ...values,
            createdAt: dayjs(Date.now()).toISOString(),
            updatedAt: dayjs(Date.now()).toISOString(),
            enable:0 
          };
          await createRoleReq(preData);
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

  const deleteRoleById = async (id) => {
    await deleteRoleReq(id);
    message.success('操作成功！');
    actionRef.current?.reload();
  };

  const { run: createRoleReq } = useRequest((v) => createRole(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: deleteRoleReq } = useRequest((v) => deleteRole(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: updateRoleReq } = useRequest((v) => updateRole(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const updateStatus = async (v) => {
       // 编辑操作逻辑
       await updateRoleReq({
        id: v.id,
        ...v,
        enable:v.enable ? 0 : 1,
        updatedAt: dayjs(Date.now()).toISOString()
      });
      message.success('操作成功！');
      actionRef.current?.reload();
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '角色管理',
      }}
    >
      <ProTable<RoleInfo>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          // 获取社区数据的接口调用
          const data = await queryRolePage({
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
            <PlusOutlined /> 新建角色
          </a>,
        ]}
      />
      <Modal
        visible={modalVisible}
        title={editingRecord ? '编辑角色' : '新建角色'}
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
            name="name"
            label="角色名"
            rules={[{ required: true, message: '请输入角色名!' }]}
          />
          <ProFormText
            name="icon"
            label="ICON"
          />
          <ProFormText
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入具体描述!' }]}
          />
          {editingRecord && (
            <ProFormText
              name="id"
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

export default Role;
