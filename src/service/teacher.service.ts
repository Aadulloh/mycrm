import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType, Teacher } from "@types";

export const TeacherService = {
  async getTeachers(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER,params);
    return res;
  },
  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },
  async updateTeacher(model: Teacher, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}`,
      model
    );
    return res;
  },
  async deleteTeacher(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },
  async getTeacherGroups() {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER_GROUPS);
    return res;
  },
  async getTeacherGroupById(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.TEACHER_GROUPS}/${id}/teacher`
    );
    return res;
  },
};
