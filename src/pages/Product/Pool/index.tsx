import React, { useState, useRef, useEffect } from 'react';
import { ActionType, PageContainer, ProColumns, ProColumnType, ProTable } from '@ant-design/pro-components';
import { Modal, Form, Input, Select, DatePicker, message, Divider, Button, Tree, Tabs } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { fetchCommunityTableInfo } from '@/services';
import { FormInstance } from 'antd';

import './index.less'
import { getProductAll } from '@/services/product';
const { TextArea } = Input;
const { Option } = Select;

interface ProductType {
  id: number;
  name: string;
  main_image_url: string;
  additional_image_urls: string; // JSON array format for additional images
  description: string;
  specifications: string;
  sku: string;
  barcode: string;
  brand: string;
  category_id: number;
  price: number;
  cost_price: number;
  retail_price: number;
  stock: number;
  tags?: string; // comma-separated string of tags
  status: number; // 1: 上架, 2: 下架
  origin?: string;
  attributes?: string; // JSON for attributes
  expiry_date?: string;
  slogan?: string;
  rating?: number; // Rating from 0.00 to 5.00
  review_count?: number;
  content?: string; // Rich media content
  available_from?: string;
  available_until?: string;
}


interface CategoryType {
  id: number;
  name: string;
  parentId: number | null;
  children?: CategoryType[];
}

const ProductManagement = () => {
  const [editingRecord, setEditingRecord] = useState<ProductType | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [categoryForm] = Form.useForm();
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
   // 新增的 Tab 状态
   const [activeTabKey, setActiveTabKey] = useState<string>('selling');

   const tabs = [
     { key: 'selling', label: `销售中 (${5})` }, // 示例数据，可以动态更新
     { key: 'soldOut', label: `已售完 (${0})` },
     { key: 'warehouse', label: `仓库 (${0})` },
   ];

   // 当切换 Tab 时更新状态
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    actionRef.current?.reload(); // 切换 Tab 时重新加载数据
  };

  // 初始化分类数据
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    // 模拟请求获取分类数据
    const categoryData = [
      {
        id: 1,
        name: '电子产品',
        parentId: null,
        children: [
          { id: 2, name: '手机', parentId: 1 },
          { id: 3, name: '电脑', parentId: 1 },
        ],
      },
      {
        id: 4,
        name: '家居用品',
        parentId: null,
        children: [
          { id: 5, name: '家具', parentId: 4 },
          { id: 6, name: '家电', parentId: 4 },
        ],
      },
    ];
    setCategories(categoryData);
  };

  // 处理分类选择
  const handleCategorySelect = (selectedKeys: any) => {
    const categoryId = selectedKeys[0];
    setSelectedCategoryId(categoryId);
    actionRef.current?.reload(); // 重新加载商品数据
  };

  // 处理分类的新增和编辑
  const handleAddOrEditCategory = () => {
    categoryForm
      .validateFields()
      .then((values) => {
        if (modalType === 'edit' && editingCategory) {
          // 编辑分类逻辑
          message.success('分类编辑成功！');
        } else {
          // 新增分类逻辑
          message.success('分类新增成功！');
        }
        fetchCategoryData(); // 刷新分类数据
        setCategoryModalVisible(false);
        categoryForm.resetFields();
      })
      .catch((info) => {
        console.log('验证失败:', info);
      });
  };

  // 删除分类
  const handleDeleteCategory = (category: CategoryType) => {
    Modal.confirm({
      title: '确定删除该分类吗？',
      onOk: () => {
        // 删除分类逻辑
        message.success('分类删除成功！');
        fetchCategoryData(); // 刷新分类数据
      },
    });
  };


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
        setEditingRecord(null);
        form.resetFields();
        message.success('操作成功！');
        actionRef.current?.reload();
      })
      .catch((info) => {
        console.log('验证失败:', info);
      });
  };

  const columns: ProColumns<ProductType>[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      valueType: 'money',
    },
    {
      title: '库存数量',
      dataIndex: 'stock',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '上架', status: 'Success' },
        2: { text: '下架', status: 'Error' },
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '有效期',
      dataIndex: 'expiry_date',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditingRecord(record);
              form.setFieldsValue(record);
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
      title: '商品池商品管理',
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

    {/* 页面布局：左侧分类树，右侧商品表格 */}
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 分类树形图 */}
      <div style={{ width: '250px', marginRight: '12px', background: '#fff', padding: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button
            type="primary"
            onClick={() => {
              setModalType('create');
              setCategoryModalVisible(true);
              setEditingCategory(null);
              categoryForm.resetFields();
            }}
          >
            <PlusOutlined /> 新增分类
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
                    setModalType('edit');
                    setEditingCategory(nodeData);
                    categoryForm.setFieldsValue({ name: nodeData.name });
                    setCategoryModalVisible(true);
                  }}
                />
                <DeleteOutlined onClick={() => handleDeleteCategory(nodeData)} />
              </div>
            </div>
          )}
        />
      </div>

      {/* 商品表格 */}
      <div style={{  flex:1}}>
        <ProTable<ProductType>
          columns={columns}
          actionRef={actionRef}
          request={async (params) => {
            // 根据分类ID获取商品数据的接口调用
            if (selectedCategoryId) {
              const data = await getProductAll(selectedCategoryId, params);
              return {
                data: data.data, // 当前分类下的商品数据
                total: data.data.length,
                success: true,
              };
            }
            return { data: [], success: true };
          }}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
          }}
          toolBarRender={() => [
            <a
              key="add"
              onClick={() => {
                setEditingRecord(null);
                form.resetFields();
              }}
            >
              <PlusOutlined /> 新增商品
            </a>,
          ]}
          search={{
            filterType:'query',
            className:'tool-bar-wrap',
          }}
        />
      </div>
    </div>

    {/* 分类新增/编辑 Modal */}
    <Modal
      visible={categoryModalVisible}
      title={modalType === 'edit' ? '编辑分类' : '新增分类'}
      onCancel={() => setCategoryModalVisible(false)}
      onOk={handleAddOrEditCategory}
    >
      <Form form={categoryForm} layout="vertical">
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    </Modal>
  </PageContainer>
  );
};

export default ProductManagement;
