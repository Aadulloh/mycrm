import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { clearStorage } from "@helpers";
const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  {
    key: "/teacher/my-groups",
    icon: React.createElement(TeamOutlined),
    label: <Link to="/teacher/my-groups">Groups</Link>,
  },
  {
    key: "/teacher/students",
    icon: React.createElement(UserOutlined),
    label: <Link to="/teacher/students">Students</Link>,
  },
];

const Teacher: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    clearStorage();
    navigate("/");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div
          style={{
            height: 64,
            margin: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Teacher Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Button
            type="primary"
            style={{ margin: "16px" }}
            onClick={() => logout()}
          >
            Log out
            <LogoutOutlined />
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Teacher;
