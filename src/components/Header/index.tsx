import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Grid, Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();

  const items = [
    {
      label: (
        <Link to="/" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
          Главная
        </Link>
      ),
      key: "home",
    },
    {
      label: "Войти",
      key: "login",
      style: { marginLeft: "auto" },
      onClick: () => {},
    },
  ];

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header>
      {screens.sm ? (
        <Menu theme="dark" mode="horizontal" items={items} />
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
        onClick={onClose}
        onClose={onClose}
        open={visible}
      >
        <Menu theme="light" mode="vertical" items={items} />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
