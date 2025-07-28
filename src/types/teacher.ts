export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  branchId: number[];
}

export interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Teacher) => Promise<void>;
  editData?: Teacher;
  mode: "create" | "update";
}
