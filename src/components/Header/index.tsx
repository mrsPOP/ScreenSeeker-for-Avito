import { useState, useContext } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Grid, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthorizationProvider";

const { useBreakpoint } = Grid;
const { Header } = Layout;

export default function AppHeader() {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { isAuthorized } = useContext(AuthorizationContext);

  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Главная</Link>,
    },
    isAuthorized ? {
      key: "random-movie",
      label: (
        <Link data-testid="helpButton" to="/random-movie">
          Помочь с выбором
        </Link>
      ),
    } : null,
    {
      key: "auth",
      icon: <UserOutlined data-testid="AuthButton" />,
      style: { marginLeft: "auto" },
      onClick: () => {
        navigate("/auth");
      },
    },
  ];

  return (
    <Header>
      {screens.sm ? (
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      ) : (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
      )}
      <Drawer
        title="Меню"
        placement="left"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu theme="light" mode="vertical" items={menuItems} />
      </Drawer>
    </Header>
  );
}
