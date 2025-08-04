export class ApiUrls {
  //Auth
  public static AUTH: string = "/log-in";

  //groups
  public static GROUPS: string = "/group";

  //course
  public static COURSE: string = "/courses";

  //teacher
  public static TEACHER: string = "/teacher";

  //student
  public static STUDENT: string = "/students";

  //barnch
  public static BRANCH: string = "/branches";

  //room
  public static ROOM: string = "/rooms";

  //admin
  public static ADMIN_PROFILE: string = "/admin/profile";
  public static UPDATE_ADMIN = (id: number) => `/admin/${id}`;
  public static ADMIN_CHANGE_PASSWORD = (id: number) =>
    `/admin/change-password/${id}`;

  //lessons
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group";
  public static UPDATE_LESSONS_STATUS_AND_NOTES = (id: number): string =>
    `${this.LESSONS}/${id}/status`;

  // group teachers
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string =
    this.GROUP_TEACHERS + "/by-group";
  public static GET_GROUP_DETAILS_FOR_TEACHER = (id: number) =>
    `${this.GROUPS}/${id}/teacher`;
  public static TEACHER_GROUPS = "/group-teachers/my-groups";

  // group students
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string =
    this.GROUP_STUDENTS + "/by-group";

  //attendance
  public static ATTENDANCE: string = "/attendance";
  public static ATTENDANCE_BULK_UPDATE = `${this.ATTENDANCE}/bulk-update`;
  public static GET_ALL_ATTENDANCE_BY_LESSON_ID = (id: number) =>
    `${this.ATTENDANCE}/lesson/${id}`;

  //forgot password
  public static FORGOT_PASSWORD: string = "/admin/forget-password";
  public static VERIFY_OTP: string = "/admin/verify-otp";
  public static SET_NEW_PASSWORD: string = "/admin/new-password";
}
