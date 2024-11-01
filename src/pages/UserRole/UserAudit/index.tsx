import { createUser, deleteUser, updateUser, userPage } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProFormDatePicker,
  ProFormSelect,
  ProFormSwitch,
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
  Tag,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { ApproveStatus, Userinfo } from '../User';

const UserAudit = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
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
      title: '审批状态',
      dataIndex: 'approveStatus',
      render: (_,record) => {
        return  <>
        {/* 都把状态显示出来吧 */}
        { record.approveStatus === ApproveStatus.NotApprove && <Tag color="#f50">无操作</Tag> }
        { record.approveStatus === ApproveStatus.ApproveReject && <Tag color="#2db7f5">审核失败</Tag> }
        { record.approveStatus === ApproveStatus.ApproveSuccess && <Tag color="#87d068">审核通过</Tag> }
        </>
      }
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
            审核
          </Button>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  const handleEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // 编辑操作逻辑
        await updateUserReq({
          id: editingRecord.id,
          userInfo: { ...editingRecord, updatedAt: dayjs(Date.now()).toISOString(),
            approveStatus: values.approveStatus,
            approveRejectReason: values.approveRejectReason
           },
        });

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
        title: '用户信息审核',
      }}
    >
      <ProTable<Userinfo>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
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
      />
      <Modal
        visible={modalVisible}
        title="审核用户信息"
        onCancel={() => {
          setModalVisible(false);
          setEditingRecord(null);
        }}
        onOk={handleEdit}
        style={{
          width: 800,
        }}
        width={800}
        className="ctx-modal"
      >
        <Form form={form} layout="vertical">
          {/* 一个 Switch 通过/拒绝 */}
           <ProFormSelect
            name="approveStatus"
            label="通过与否"
            options={[
              { label: '未操作', value: 0 },
              { label: '通过', value: 2 },
              { label: '拒绝', value: 3 },
              // 可以根据实际角色添加更多选项
            ]}
          />
          <ProFormText
            name="approveRejectReason"
            label="备注和原因"
            rules={[{ required: true, message: '请输入原因和备注' }]}
          />
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UserAudit;