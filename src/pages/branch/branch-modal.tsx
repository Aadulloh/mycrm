import React from "react";
import { Modal, Input, Form as AntForm, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { Branch, BranchModalProps } from "@types";
import { MaskedInput } from "antd-mask-input";
import type { FieldProps } from "formik";
import { branchValidationSchema } from "@utility";

const BranchModal: React.FC<BranchModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  const initialValues: Branch = editData || {
    id: 0,
    name: "",
    address: "",
    call_number: "",
  };

  return (
    <Modal
      title={editData ? "Edit Branch" : "Add Branch"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={branchValidationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <AntForm.Item label="Branch Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="name" placeholder="Enter branch name" />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Address" labelCol={{ span: 24 }}>
              <Field as={Input} name="address" placeholder="Enter address" />
              <ErrorMessage name="address">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field name="call_number">
                {({ field }: FieldProps) => (
                  <MaskedInput
                    {...field}
                    value={field.value || ""}
                    mask="+998 (00) 000-00-00"
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="call_number" />
              </div>
            </AntForm.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {mode === "update" ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BranchModal;
