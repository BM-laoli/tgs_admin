import { TagInput } from '@/components';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Card, Col, message, Row } from 'antd';
import { useState } from 'react';

const DetailPool = () => {
  const [formType, setFormType] = useState<'create' | 'edit' | 'detail'>(
    'create',
  );

  const handleSubmit = async (values: any) => {
    console.log(values);
    // 模拟保存数据的逻辑
    message.success(formType === 'edit' ? '商品编辑成功' : '商品创建成功');
  };

  return (
    <PageContainer
      ghost
      header={{
        title:
          formType === 'edit'
            ? '编辑商品'
            : formType === 'detail'
            ? '商品详情'
            : '创建商品',
      }}
    >
      <ProForm
        onFinish={async (values) => handleSubmit(values)}
        initialValues={{
          status: 1,
          rating: 0.0,
          review_count: 0,
        }}
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
      >
        {/* Section 1: 基础信息 */}
        <Card title="基础信息" bordered={false} style={{ marginBottom: 24 }}>
          <Row>
            <Col span={12}>
              <ProFormText
                name="name"
                label="商品名称"
                placeholder="请输入商品名称"
                rules={[{ required: true, message: '商品名称不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="category_id"
                label="商品分类"
                options={[
                  { label: '电子产品', value: 1 },
                  { label: '家居用品', value: 2 },
                ]}
                width={400}
                placeholder="请选择商品分类"
                rules={[{ required: true, message: '商品分类不能为空' }]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ProFormText
                name="brand"
                label="商品品牌"
                placeholder="请输入商品品牌"
                width={400}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <ProFormUploadButton
                name="main_image_url"
                label="商品主图"
                action="/upload.do"
                max={1}
                fieldProps={{ listType: 'picture-card' }}
                extra="支持上传1张主图"
              />
            </Col>
            <Col>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                }}
              >
                {[1, 2, 3, 4].map((item) => (
                  <ProFormUploadButton
                    key={item}
                    name={`additional_image_url_${item}`}
                    label={`附图 ${item}`}
                    action="/upload.do"
                    max={1}
                    width={400}
                    fieldProps={{ listType: 'picture-card' }}
                  />
                ))}
              </div>
            </Col>
          </Row>

          <ProFormTextArea
            name="description"
            label="商品描述"
            placeholder="请输入商品描述"
          />
        </Card>

        {/* Section 2: 库存信息和编码信息 */}
        <Card
          title="库存信息和编码信息"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={12}>
              <ProFormText
                name="sku"
                label="商品标识 (SKU)"
                placeholder="请输入商品SKU"
                rules={[{ required: true, message: 'SKU不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="barcode"
                label="商品条码 (EAN/UPC)"
                placeholder="请输入商品条码"
                width={400}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <ProFormDigit
                name="stock"
                label="商品库存数量"
                placeholder="请输入库存数量"
                min={0}
                rules={[{ required: true, message: '库存数量不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
              <ProFormMoney
                name="price"
                label="商品团购价"
                placeholder="请输入团购价"
                rules={[{ required: true, message: '价格不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
              <ProFormMoney
                name="cost_price"
                label="商品成本价"
                placeholder="请输入成本价"
                rules={[{ required: true, message: '成本价不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
              <ProFormMoney
                name="retail_price"
                label="商品零售价"
                placeholder="请输入零售价"
                rules={[{ required: true, message: '零售价不能为空' }]}
                width={400}
              />
            </Col>
            <Col span={12}>
            <ProForm.Item name="tags" label="商品标签">
              <TagInput
                // name="tags"
                // label="商品标签"
                // placeholder="请输入商品标签（用逗号分隔）"
                // width={400}
              />
            </ProForm.Item>
            </Col>
            <Col span={12}>
            <ProFormText
            name="origin"
            label="商品产地"
            placeholder="请输入商品产地"
            width={400}
          />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="status"
                label="商品状态"
                options={[
                  { label: '上架', value: 1 },
                  { label: '下架', value: 2 },
                ]}
                placeholder="请选择商品状态"
                rules={[{ required: true, message: '商品状态不能为空' }]}
                width={400}
              />
            </Col>
          </Row>

        </Card>

        {/* Section 3: 富文本编辑器 */}
        <Card title="富文本信息" bordered={false}>
          <ProFormTextArea
            name="content"
            label="商品媒体信息"
            placeholder="请输入商品媒体信息"
            rules={[{ required: true, message: '内容不能为空' }]}
          />
        </Card>
      </ProForm>
    </PageContainer>
  );
};

export default DetailPool;
