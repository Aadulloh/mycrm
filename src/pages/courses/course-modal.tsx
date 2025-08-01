import React from "react";
import { Modal, Input, Form as AntForm, Button, Select } from "antd";
import { Formik, Form, ErrorMessage, useFormikContext, Field } from "formik";
import type { Course, CourseModalProps } from "@types";
import { validationSchema } from "@utility";

const { Option } = Select;

const FormikSelect = ({
  label,
  name,
  options,
}: {
  label: string;
  name: keyof Course;
  options: { value: string | number; label: string }[];
}) => {
  const { setFieldValue, values } = useFormikContext<Course>();
 
  return (
    <AntForm.Item label={label} labelCol={{ span: 24 }}>
      <Select
        value={values[name] || undefined}
        onChange={(value) => setFieldValue(name, value)}
        placeholder={`Select ${label.toLowerCase()}`}
        allowClear
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
      <ErrorMessage name={name}>
        {(msg) => <div style={{ color: "red", marginTop: 5 }}>{msg}</div>}
      </ErrorMessage>
    </AntForm.Item>
  );
};

const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  mode,
}) => {
  const initialValues: Course = editData || {
    title: "",
    description: "",
    price: "",
    duration: "",
    lessons_in_a_week: "",
    lesson_duration: "",
  };

  return (
    <Modal
      title={editData ? "Edit Course" : "Add Course"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <AntForm.Item label="Course Title" labelCol={{ span: 24 }}>
              <Field as={Input} name="title" placeholder="Enter course title" />
              <ErrorMessage name="title">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Price" labelCol={{ span: 24 }}>
              <Field
                as={Input}
                type="number"
                name="price"
                placeholder="Enter course price"
              />
              <ErrorMessage name="price">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <FormikSelect
              label="Duration"
              name="duration"
              options={[
                { value: "3 months", label: "3 months" },
                { value: "6 months", label: "6 months" },
                { value: "12 months", label: "12 months" },
              ]}
            />

            <FormikSelect
              label="Lessons per Week"
              name="lessons_in_a_week"
              options={[
                { value: 3, label: "3" },
                { value: 5, label: "5" },
              ]}
            />

            <FormikSelect
              label="Lesson Duration"
              name="lesson_duration"
              options={[
                { value: "2 hours", label: "2 hours" },
                { value: "4 hours", label: "4 hours" },
              ]}
            />

            <AntForm.Item label="Description" labelCol={{ span: 24 }}>
              <Field
                as={Input.TextArea}
                name="description"
                placeholder="Enter course description"
                rows={4}
              />
              <ErrorMessage name="description">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <Button type="primary" htmlType="submit" block>
              {mode === "update" ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CourseModal;
