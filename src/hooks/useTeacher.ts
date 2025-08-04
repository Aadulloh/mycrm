import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@service";
import type { ParamsType, Teacher } from "@types";
import { message } from "antd";

// GET ALL TEACHERS
export const useTeachers = (params: ParamsType) => {
  return useQuery({
    queryKey: ["teacher", params],
    queryFn: async () => {
      const res = await TeacherService.getTeachers(params);
      return res;
    },
  });
};

export const useGetTeacherGroup = (id: number = 0) => {
  const { data: teacherGroupsData } = useQuery({
    enabled: !id,
    queryKey: ["teacher-groups"],
    queryFn: () => TeacherService.getTeacherGroups(),
  });

  const teacherGroups = teacherGroupsData?.data || [];
  return teacherGroups;
};

export const useDetailsForTeacher = (params: ParamsType | {}, id: number = 0) => {
  const { data: groupDetailsForTeacher } = useQuery({
    enabled: !!id,
    queryKey: ["groupDetailsForTeacher", id],
    queryFn: async () => TeacherService.getGroupDetailsForTeacher(id),
  });
  return groupDetailsForTeacher;
};

// CREATE TEACHER
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Teacher) => TeacherService.createTeacher(data),
    onSuccess: () => {
      message.success("Teacher created");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to create teacher");
    },
  });
};

// UPDATE TEACHER
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ model, id }: { model: Teacher; id: number }) =>
      TeacherService.updateTeacher(model, id),
    onSuccess: () => {
      message.success("Teacher updated");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to update teacher");
    },
  });
};

// DELETE TEACHER
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => TeacherService.deleteTeacher(id),
    onSuccess: () => {
      message.success("Teacher deleted");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to delete teacher");
    },
  });
};
