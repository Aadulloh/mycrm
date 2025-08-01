import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Group, ParamsType } from "@types";

export const GroupService = {
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupsStudent(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  async getGroupsLessons(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
    return res;
  },

  async getGroupsTeachers(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  async createGroup(model: Group) {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },

  async updateGroup(model: Group, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    return res;
  },

  async deleteGroup(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },

  async addStudentToGroup(data: any) {
    const res = await apiConfig().postRequest(
      `${ApiUrls.GROUP_STUDENTS}`,
      data
    );
    return res;
  },
  async addTeacherToGroup(data: any) {
    const res = await apiConfig().postRequest(
      `${ApiUrls.GROUP_TEACHERS}`,
      data
    );
    return res;
  },
};
