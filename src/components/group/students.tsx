import { Collapse, Avatar, Card, Space, Typography, Divider } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Text, Title } = Typography;

// Professional blue color palette
const blueColors = {
  primary: "#1890ff",
  light: "#69c0ff",
  dark: "#096dd9",
  darker: "#0050b3",
  background: "#f0f8ff",
  border: "#d6e7ff",
};

function GroupStudents({ students }: any) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div style={{ padding: "24px", background: "#fafafa", minHeight: "100vh" }}>
      <Card
        title={
          <Space>
            <TeamOutlined
              style={{ color: blueColors.primary, fontSize: "20px" }}
            />
            <Title level={3} style={{ margin: 0, color: blueColors.darker }}>
              Students Directory
            </Title>
          </Space>
        }
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(24, 144, 255, 0.15)",
          border: `1px solid ${blueColors.border}`,
        }}
        headStyle={{
          background: `linear-gradient(135deg, ${blueColors.background} 0%, #ffffff 100%)`,
          borderBottom: `2px solid ${blueColors.border}`,
        }}
      >
        <Collapse
          accordion
          expandIconPosition="end"
          style={{ background: "transparent" }}
          ghost
        >
          {students.map((item: any) => {
            const student = item.student;
            const fullName = `${student.first_name} ${student.last_name}`;
            const initials = getInitials(student.first_name, student.last_name);

            return (
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "8px 0",
                    }}
                  >
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: blueColors.primary,
                        fontWeight: "600",
                        fontSize: "16px",
                        border: `2px solid ${blueColors.light}`,
                      }}
                    >
                      {initials}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text
                        strong
                        style={{
                          fontSize: "18px",
                          color: blueColors.darker,
                          display: "block",
                        }}
                      >
                        {fullName}
                      </Text>
                      <Text
                        style={{
                          fontSize: "13px",
                          color: blueColors.dark,
                          fontWeight: "500",
                        }}
                      >
                        ID: {student.id}
                      </Text>
                    </div>
                  </div>
                }
                key={student.id}
                style={{
                  marginBottom: "12px",
                  border: `1px solid ${blueColors.border}`,
                  borderRadius: "8px",
                  background: "#ffffff",
                  boxShadow: "0 1px 4px rgba(24, 144, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: blueColors.background,
                    borderRadius: "6px",
                    margin: "-8px",
                  }}
                >
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    {/* Full Name */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueColors.primary,
                        }}
                      >
                        <UserOutlined
                          style={{ color: "#fff", fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Full Name
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueColors.darker,
                          }}
                        >
                          {fullName}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{
                        margin: "8px 0",
                        borderColor: blueColors.border,
                      }}
                    />

                    {/* Phone */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueColors.light,
                        }}
                      >
                        <PhoneOutlined
                          style={{ color: blueColors.darker, fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Phone Number
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueColors.darker,
                          }}
                        >
                          {student.phone || "Not provided"}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{
                        margin: "8px 0",
                        borderColor: blueColors.border,
                      }}
                    />

                    {/* Email */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueColors.dark,
                        }}
                      >
                        <MailOutlined
                          style={{ color: "#fff", fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Email Address
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueColors.darker,
                          }}
                        >
                          {student.email || "Not provided"}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </div>
              </Panel>
            );
          })}
        </Collapse>

        {students.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: blueColors.background,
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: blueColors.primary,
                marginBottom: "16px",
              }}
            >
              <TeamOutlined style={{ fontSize: "32px", color: "#fff" }} />
            </div>
            <br />
            <Title
              level={4}
              style={{ color: blueColors.dark, marginBottom: "8px" }}
            >
              No Students Found
            </Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              There are currently no students in this directory.
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}

export default GroupStudents;
