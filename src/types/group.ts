import type { Lesson } from "./lessons";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

export interface GroupModalProps {
  open: boolean;
  toggle: () => void;
  update: Group | null;
  mode: "create" | "update";
}

export interface GroupLessonsType {
  lessons: Lesson[];
}

export interface GroupStudentType {
  lessons: Student[];
}

export interface GroupTeacherType {
  lessons: Teacher[];
}
