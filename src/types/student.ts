export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash?: string;
  confirm_password?: string;
  gender: string;
  date_of_birth: string;
}

export interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
  mode: "create" | "update";
  loading?: boolean;
}
