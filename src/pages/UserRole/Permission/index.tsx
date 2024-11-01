import { BaseDTO, createPermission, createRole, createUser, deletePermission, deleteRole, deleteUser, queryPermissionPage, queryPermissionTree, queryRolePage, updatePermission, updateRole, updateUser, userPage } from '@/services';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
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
  Tree,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';




//只有左边的区域
// const PermissionTreeInfo =  () => {

//   return (

//   )
// }


export interface PermissionInfo extends BaseDTO {
  name?: string;
  icon?: string;
  description?: string;
  type?: number;
  pageUrl?: string;
  apiList?: string;
  parentId?: number;
};

export interface PermissionInfoTree extends BaseDTO {
  name?: string;
  icon?: string;
  description?: string;
  type?: number;
  pageUrl?: string;
  apiList?: string;
  parentId?: number;
  children?:PermissionInfoTree[]
};

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance>();
  const columns: ProColumns<PermissionInfo>[] = [
    {
      title: 'icon',
      dataIndex: 'icon',
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
      title: 'pageUrl',
      dataIndex: 'pageUrl',
      valueType: 'text',
    },
    {
      title: 'apiList',
      dataIndex: 'apiList',
      valueType: 'text',
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
          await updatePermissionReq({
            id: editingRecord.id,
            ...values,
            updatedAt: dayjs(Date.now()).toISOString()
          });
        } else {
          // 新增操作逻辑
          const preData = {
            ...values,
            createdAt: dayjs(Date.now()).toISOString(),
            updatedAt: dayjs(Date.now()).toISOString(),
          };
          await createPermissionReq(preData);
        }
        setModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
        message.success('操作成功！');
        await loadTree()
        actionRef.current?.reload();
      })
      .catch((info) => {
        console.log('验证失败:', info);
      });
  };

  const deleteRoleById = async (id) => {
    await deletePermissionReq(id);
    message.success('操作成功！');
    actionRef.current?.reload();
  };

  const { run: createPermissionReq } = useRequest((v) => createPermission(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: deletePermissionReq } = useRequest((v) => deletePermission(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: updatePermissionReq } = useRequest((v) => updatePermission(v), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });
  const { run: updatePermissionTreeReq } = useRequest(() => queryPermissionTree(), {
    manual: true,
    onError: (e) => {
      console.log(e);
    },
  });

  // 获取某个分类下的 所有非菜单权限
  const [categories, setCategories] = useState<PermissionInfoTree[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleCategorySelect = (selectedKeys: any) => {
    const categoryId = selectedKeys[0];
    // setSelectedCategoryId(categoryId);
    actionRef.current?.reload(); // 重新加载商品数据
  };

  useEffect(() => {
    loadTree()
    return () => {
    };
  }, []);

  const loadTree = () => {
    updatePermissionTreeReq().then((res)=>{
      setCategories(res)
    })
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '权限管理',
      }}
    >
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '250px', marginRight: '12px', background: '#fff', padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Button
              type="primary"
              onClick={() => {
                setModalVisible(true);
                setEditingRecord(null);
                form.resetFields();
              }}
            >
              <PlusOutlined /> 新增菜单
            </Button>
            </div>
            <Tree
              treeData={categories}
              fieldNames={{ title: 'name', key: 'id', children: 'children' }}
              onSelect={handleCategorySelect}
              titleRender={(nodeData) => (
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <div>{nodeData.name}</div>
                  <div style={{marginLeft
                    :12
                  }}>
                    <EditOutlined
                      style={{ marginRight: 8 }}
                      onClick={() => {
                        setModalVisible(true);
                        setEditingRecord(nodeData);
                        form.setFieldsValue({ ...nodeData });
                      }}
                    />
                    <Popconfirm
            title="确认删除?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await deleteRoleById(nodeData.id);
              await loadTree()
            }}
          >
            <DeleteOutlined  />
          </Popconfirm>
                  </div>
                </div>
              )}
            />
          </div>
          <div style={{  flex:1}}>
          <ProTable<PermissionInfo>
              search={false}
              columns={columns}
              actionRef={actionRef}
              request={async (params) => {
                // 获取社区数据的接口调用
                const data = await queryPermissionPage({
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
                  <PlusOutlined /> 新建权限
                </a>,
              ]}
            />
          </div>
        </div>

      <Modal
        visible={modalVisible}
        title={editingRecord ? '编辑权限' : '新建权限'}
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
        <ProFormRadio.Group
            name="type"
            label="权限类型"
            options={[
              { label: '菜单级', value: 1 },
              { label: '按钮级', value: 2 },
            ]}
          />
          <ProFormText
            name="name"
            label="权限名称"
            rules={[{ required: true, message: '请输入权限名称!' }]}
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
         <ProFormText
            name="pageUrl"
            label="PageURL"
          />
          {/* APIList 可以单独做一个表头项 */}
          <ProFormTextArea
            name="apiList"
            label="ApiList-JSON"
          />
          {/* 隐藏项目 */}
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

export default Permission;
