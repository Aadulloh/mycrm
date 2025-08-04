import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { Link, useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { useState } from "react";
import AddTeacherorStudentModal from "../../components/group/modal";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function SingleGroup() {
  const { id } = useParams<{ id: string }>();
  const { lessons, students, teachers } = useGroup(
    { page: 1, limit: 10 },
    Number(id)
  );
  console.log(students?.data);

  const [open, setOpen] = useState(false);
  const [addingTeacher, setAddingTeacher] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div>
      <div className="flex justify-between m-5">
        {" "}
        <Link to={`/admin/group`}>Back</Link>
        {open && (
          <AddTeacherorStudentModal
            open={open}
            toggle={toggle}
            addingTeacher={addingTeacher}
            groupId={+id!}
          />
        )}
        <div className=" flex flex-wrap gap-5">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setOpen(true);
              setAddingTeacher(true);
            }}
          >
            {" "}
            Add Teacher
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setAddingTeacher(false);
              setOpen(true);
            }}
          >
            Add Student
          </Button>
        </div>
      </div>
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
