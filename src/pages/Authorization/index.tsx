import { useState } from "react";
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthorizationContext } from "../../components/AuthorizationProvider";

const Authorized = () => {
  const { setIsAuthorized } = useContext(AuthorizationContext);
  return (
    <div>
      <Alert
        message="Вы авторизованы!"
        type="success"
        showIcon
        style={{ marginBlockStart: "150px", marginBlockEnd: "24px" }}
      />
      <Button type="primary" onClick={() => setIsAuthorized((prev) => !prev)}>
        Выйти
      </Button>
    </div>
  );
};

const LoginPage = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { isAuthorized, setIsAuthorized } = useContext(AuthorizationContext);

  const dummyUser = "user";
  const dummyPass = "password";
  const token = "1234";

  const handleSubmit = (values: { username: string; password: string }) => {
    const { username, password } = values;
    if (username === dummyUser && password === dummyPass) {
      localStorage.setItem("token", token);
      setIsLoginSuccess(true);
      setIsAuthorized(true);
    } else {
      setIsLoginSuccess(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100vh",
      }}
    >
      {!isAuthorized ? (
        <Card title="Login" style={{ width: 300, marginBlockStart: "150px" }}>
          <Form
            onFinish={handleSubmit}
            name="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="username"
              initialValue="user"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введеите логин!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              initialValue="password"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введеите пароль!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
          {isLoginSuccess && (
            <Alert message="Login Successful" type="success" showIcon />
          )}
          {isLoginSuccess === false && (
            <Alert message="Login Failed" type="error" showIcon />
          )}
        </Card>
      ) : (
        <Authorized />
      )}
    </div>
  );
};

export default LoginPage;
