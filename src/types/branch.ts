export interface Branch {
  id?: number;
  name: string;
  address?: string;
  call_number?: string;
}

export interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Branch) => void;
  editData?: Branch;
  mode: "create" | "update";
  loading?: boolean;
}