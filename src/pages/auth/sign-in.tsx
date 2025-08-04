import { Link, useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { Button, Card, Input, Select, message, Typography } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "@hooks";
import { signInValidationSchema } from "@utility";

const { Option } = Select;
const { Title } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { email, password, role } = values;
      mutate(
        { data: { email, password }, role },
        {
          onSuccess: (res: any) => {
            if (res.status === 201) {
              setItem("access_token", res.data.access_token);
              setItem("role", role);
              navigate(`/${role}`);
            }
          },
        }
      );
    } catch (error) {
      message.error(`Login failed ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: 100 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Sign In
      </Title>

      <Formik
        initialValues={{ email: "", password: "", role: "" }}
        validationSchema={signInValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <Field
                as={Input}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Password</label>
              <Field
                as={Input.Password}
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Role</label>
              <Select
                placeholder="Select role"
                onChange={(val) => setFieldValue("role", val)}
                value={values.role || undefined}
                style={{ width: "100%" }}
              >
                <Option value="teacher">Teacher</Option>
                <Option value="student">Student</Option>
                <Option value="admin">Admin</Option>
                <Option value="lid">Lid</Option>
              </Select>
              {errors.role && touched.role && (
                <div style={{ color: "red", fontSize: 12 }}>{errors.role}</div>
              )}
            </div>

            <Button type="primary" htmlType="submit" block loading={isPending}>
              Sign In
            </Button>
            <Link className="flex justify-center mt-3" to={"forgot-password"}>
              Forgot password
            </Link>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SignIn;
