import { StudentService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType, Student } from "@types";

export const useStudent = (params: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["student", params],
    queryFn: async () => StudentService.getStudents(params!),
  });
  const useStudentCreate = () => {
    return useMutation({
      mutationFn: async (data: Student) => StudentService.createStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };
  const useStudentUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Student; id: number }) =>
        StudentService.updateStudent(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };
  const useStudentDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => StudentService.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };
  return {
    data,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  };
};
