import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Link, useParams } from "react-router-dom";
import { useGroup } from "@hooks";

function SingleGroup() {
  const { id } = useParams<{ id: string }>();
  const { lessons, students, teachers } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );
  console.log(students?.data);

  return (
    <div>
      <Link to={`/admin/group`}>Back</Link>
      {teachers?.data.length > 0 && <GroupTeachers teachers={teachers?.data} />}
      {lessons?.data.lessons.length > 0 && (
        <GroupLessons lessons={lessons?.data.lessons} />
      )}
      {students?.data.length > 0 && (
        <GroupStudents students={students?.data} id={id} />
      )}
    </div>
  );
}

export default SingleGroup;
