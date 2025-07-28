export interface Course {
  id?: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  lessons_in_a_week: string;
  lesson_duration: string;
}

export interface CourseModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Course) => void;
  editData?: Course;
  mode: "create" | "update";
  loading?: boolean;
}
