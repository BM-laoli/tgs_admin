import { USER_INFO_KEY } from '@/constants';
import { userLogin } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { FC } from 'react';
import './login.less';

const LoginForm: FC = () => {
  const [form] = Form.useForm();

  const onLogin = async () => {
    const loginInfo = await userLogin(1);
    if (!loginInfo.success) {
      message.error(loginInfo.message || '系统异常! 请稍后再试');
      return;
    }
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(loginInfo?.data));
    history.replace('/');
  };

  return (
    <div className="login-layout" id="login-layout">
      <div className="logo-box">
        <span className="logo-name">请登录</span>
      </div>
      <Form
        form={form}
        initialValues={{ username: 'admin', password: '123456' }}
        className="login-form"
        name="login-form"
        onFinish={onLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            placeholder="密码"
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            htmlType="submit"
            size="large"
            type="primary"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { LoginForm };