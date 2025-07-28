import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
  // InputNumber,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import { MaskedInput } from "antd-mask-input";
import type { FieldProps } from "formik";
import { studentValidationSchema } from "@utility";
import type { Student, StudentModalProps } from "@types";

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  const isEdit = !!editData;

  const initialValues: Student = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    password_hash: "",
    confirm_password: "",
    gender: editData?.gender || "",
    date_of_birth: editData?.date_of_birth || "",
    // lidId: editData?.lidId || 0,
  };

  return (
    <Modal
      title={isEdit ? "Edit Student" : "Add Student"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={studentValidationSchema(isEdit)}
        onSubmit={(values) => {
          const { ...data } = values;
          return onSubmit(data as Student);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="first_name" placeholder="First name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="last_name" placeholder="Last name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email" labelCol={{ span: 24 }}>
              <Field as={Input} name="email" placeholder="Email address" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field name="phone">
                {({ field, form }: FieldProps) => (
                  <MaskedInput
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      form.setFieldValue("phone", e.target.value)
                    }
                    onBlur={field.onBlur}
                    mask="+998 (00) 000-00-00"
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <>
                <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="password_hash"
                    placeholder="Password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password_hash" />
                  </div>
                </AntForm.Item>

                <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="confirm_password"
                    placeholder="Confirm your password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <AntForm.Item label="Gender" labelCol={{ span: 24 }}>
              <Field name="gender">
                {({ field }: FieldProps) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("gender", value)}
                    style={{ width: "100%" }}
                    placeholder="Select gender"
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Date of Birth" labelCol={{ span: 24 }}>
              <DatePicker
                format="YYYY-MM-DD"
                value={
                  values.date_of_birth ? dayjs(values.date_of_birth) : null
                }
                onChange={(_, dateString) =>
                  setFieldValue("date_of_birth", dateString)
                }
                style={{ width: "100%" }}
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="date_of_birth" />
              </div>
            </AntForm.Item>

            {/* <AntForm.Item label="Lid ID" labelCol={{ span: 24 }}>
              <Field name="lidId">
                {({ field }: FieldProps) => (
                  <InputNumber
                    {...field}
                    value={values.lidId}
                    onChange={(val) => setFieldValue("lidId", val)}
                    style={{ width: "100%" }}
                    min={0}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" />
              </div>
            </AntForm.Item> */}

            <Button type="primary" htmlType="submit" block loading={loading}>
              {mode === "update" ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentModal;
