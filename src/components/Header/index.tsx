import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Grid, Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const items = [
    {
      label: "Назад",
      key: "home",
      onClick: goBack,
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
          className="menu-button"
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
