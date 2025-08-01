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

  //lessons
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group";

  // group teachers
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string =
    this.GROUP_TEACHERS + "/by-group";

  // group students
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string =
    this.GROUP_STUDENTS + "/by-group";

  public static TEACHER_GROUPS: string = "/group";
}
