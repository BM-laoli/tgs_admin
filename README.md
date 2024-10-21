# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

# 具体的介绍和使用说明

## 关于 JWT 和具体的权限控制器

1.你需要把 .umirc.ts 2.你需要把 app.tsx 中动态的配置一起改

以上两个都需要一起弄 只配置一个是不行的

- Roter 从 API 获取
- 权限也从 API 获取

```ts
// 登录表单
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
      {/*more info*/}
      </Form>
  )
}

//  admin 程序入口处
async function getInitialState() {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}');
  if (!userInfo) {
    history.push('/login');
    return;
  }

  return userInfo;
}

```

## 把 husky 去掉

git commit --no-verify -m
