import { useMutation, useQuery } from "@tanstack/react-query";
import { AttendanceService } from "@service";

export const useAttendance = (id: number = 0) => {
  const useAttendanceBulkUpdate = () => {
    return useMutation({
      mutationFn: (body: object) =>
        AttendanceService.bulkUpdateAttendance(body),
    });
  };
  const useAttendanceGetAllByLessonId = () => {
    return useQuery({
      queryKey: ["attendance", id],
      queryFn: () => AttendanceService.getAllAttendanceByLessonId(id),
    });
  };
  return {
    useAttendanceBulkUpdate,
    useAttendanceGetAllByLessonId,
  };
};
