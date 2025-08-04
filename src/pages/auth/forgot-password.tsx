import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, message } from "antd";
import { useForgotPassword, useVerifyOtp, useNewPassword } from "@hooks";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState<"sendOtp" | "verifyOtp" | "newPassword">(
    "sendOtp"
  );

  const { mutate: sendOtp, isPending: isSendingOtp } = useForgotPassword();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useNewPassword();

  const handleSendOtp = (values: any) => {
    const { email, role } = values;
    sendOtp(
      { email, role },
      {
        onSuccess: (res: any) => {
          if (res?.status === 201) {
            localStorage.setItem("resetEmail", email); // store temporarily
            setStep("verifyOtp");
          }
        },
      }
    );
  };

  const handleVerifyOtp = (values: any) => {
    const otpNumber = Number(values.otp);

    if (!values.otp || isNaN(otpNumber)) {
      message.error("Please enter a valid numeric OTP");
      return;
    }

    verifyOtp(
      { otp: otpNumber },
      {
        onSuccess: (res: any) => {
          if (res?.status === 200) {
            message.success("OTP verified");
            setStep("newPassword");
          }
        },
      }
    );
  };

  const handleResetPassword = (values: any) => {
    const { password, confirm_password } = values;
    if (password !== confirm_password) {
      message.error("Passwords do not match");
      return;
    }

    resetPassword(
      { password, confirm_password },
      {
        onSuccess: (res: any) => {
          if (res?.status === 200) {
            message.success("Password reset successfully");
            setStep("sendOtp");
            localStorage.removeItem("resetEmail");
          }
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {step === "sendOtp" && (
        <Form
          name="send-otp"
          onFinish={handleSendOtp}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              prefix={<UserOutlined className="text-gray-400" />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              size="large"
              placeholder="Select role"
              className="rounded-md"
            >
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="lid">Lid</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isSendingOtp}
              className="rounded-md bg-blue-600 hover:bg-blue-700 font-medium"
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      )}

      {step === "verifyOtp" && (
        <Form
          name="verify-otp"
          onFinish={handleVerifyOtp}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Verify OTP
          </h2>

          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter OTP" }]}
          >
            <Input
              size="large"
              type="number"
              placeholder="Enter OTP code"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isVerifyingOtp}
              className="rounded-md bg-blue-600 hover:bg-blue-700 font-medium"
            >
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      )}

      {step === "newPassword" && (
        <Form
          name="new-password"
          onFinish={handleResetPassword}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Set New Password
          </h2>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter new password" }]}
          >
            <Input.Password
              size="large"
              placeholder="New password"
              prefix={<LockOutlined className="text-gray-400" />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm password"
              prefix={<LockOutlined className="text-gray-400" />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isResettingPassword}
              className="rounded-md bg-blue-600 hover:bg-blue-700 font-medium"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ForgotPassword;
