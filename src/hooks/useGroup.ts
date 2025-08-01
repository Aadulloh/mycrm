import { GroupService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Group, type ParamsType } from "@types";
import { useNavigate } from "react-router-dom";

export const useGroup = (params: ParamsType, id?: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    enabled: !id,
    queryKey: ["groups", params],
    queryFn: async () => GroupService.getGroups(params),
  });

  const groupStudentsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-students"],
    queryFn: async () => GroupService.getGroupsStudent(id!),
  });
  const students = groupStudentsQuery.data;

  const groupLessonsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-lessons"],
    queryFn: async () => GroupService.getGroupsLessons(id!),
  });
  const lessons = groupLessonsQuery.data;

  const groupTeachersQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-teachers"],
    queryFn: async () => GroupService.getGroupsTeachers(id!),
  });
  const teachers = groupTeachersQuery.data;

  const handlePagination = (pagination: any, setParams: any) => {
    const { current, pageSize } = pagination;
    setParams({
      page: current!,
      limit: pageSize!,
    });
    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });
  };

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: Group) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Group; id: number }) =>
        GroupService.updateGroup(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => GroupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupAddStudent = () => {
    return useMutation({
      mutationFn: async (data: any) => GroupService.addStudentToGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group-student"] });
      },
    });
  };

  const useGroupAddTeacher = () => {
    return useMutation({
      mutationFn: async (data: any) => GroupService.addTeacherToGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups", "add-teacher"] });
      },
    });
  };

  return {
    data,
    lessons,
    teachers,
    students,
    useGroupCreate,
    useGroupDelete,
    useGroupUpdate,
    handlePagination,
    useGroupAddStudent,
    useGroupAddTeacher,
  };
};
