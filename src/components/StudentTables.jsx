import Table from "react-bootstrap/Table";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import Pagination from "react-bootstrap/Pagination";

const StudentTables = ({
  handleDeleteShow,
  page,
  studentData,
  totalStudent,
  setPage,
}) => {
  const hanldePage = (page) => {
    setPage(page);
  };

  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(totalStudent / 10); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => hanldePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Table striped bordered hover className="mt-4" responsive="md">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Parent Name</th>
            <th>Class</th>
            <th>View Student Details</th>
            <th>Fees Statement</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentData?.map((ele) => (
            <tr key={ele._id}>
              <td>{ele.studentName}</td>
              <td>{ele.parentName}</td>
              <td>{ele.cls}</td>
              <td>
                <Link href={`/student/${ele._id}`} style={{ color: "#6b88d6" }}>
                  View Student Details
                </Link>
              </td>
              <td>
                <Link href={`/fees/${ele._id}`} style={{ color: "#6b88d6" }}>
                  View Fees Statement
                </Link>
              </td>
              <td>
                <BsFillTrashFill
                  cursor={"pointer"}
                  onClick={() => handleDeleteShow(ele._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination size="sm">{items}</Pagination>
      </div>
    </>
  );
};

export default StudentTables;
