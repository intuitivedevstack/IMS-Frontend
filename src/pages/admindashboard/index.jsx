import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import search from "../../assests/search.svg";
import StudentTables from "@/components/StudentTables";
import Button from "react-bootstrap/Button";
import AddStudentModal from "../../components/AddStudentModal";
import DeleteStudentModal from "../../components/DeleteStudentModal";
import axios from "axios";
import Select from "react-select";
import config from "@/utils/config";
import Footer from "@/components/footer";
import Link from "next/link";
import SideNav from "../../components/SideNav";
import Header from "@/components/Header";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

const AdminDashboard = () => {
  const { push } = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [isStudentAdded, setIsStudentAdded] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [isStudentDeleted, setIsStudentDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [studentData, setStudentData] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalStudentData, setTotalStudentData] = useState([]);
  const [BackupstudentData, setBackupStudentData] = useState([]);
  const [BackupLength, setBackupLength] = useState(0);

  let options = [{ value: "All", label: "All" }];

  totalStudentData?.map((ele) => {
    options.push({ value: ele.cls, label: ele.cls });
  });

  const uniqueIds = [];

  const unique = options.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.value);

    if (!isDuplicate) {
      uniqueIds.push(element.value);

      return true;
    }

    return false;
  });

  useEffect(() => {
    axios
      .get(
        `${config.baseUrl}/api/getstudentsByUserId?
        }&&limit=${10}&&page=${page}`
      )
      .then((res) => {
        setStudentData(res.data.resultantData);
        setBackupStudentData(res.data.resultantData);
        setTotalStudent(res.data.total);
        setBackupLength(res.data.total);
        setTotalStudentData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isStudentAdded, isStudentDeleted, page]);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (studentId) => {
    setShowDelete(true);
    setStudentId(studentId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectChange = (val) => {
    console.log(val.value);

    if (val.value == "All") {
      setStudentData(BackupstudentData);
      setTotalStudent(BackupLength);
    } else {
      const filteredData = totalStudentData.filter((ele) =>
        ele.cls.toLowerCase().includes(val.value.toLowerCase())
      );

      setStudentData(filteredData);
      setTotalStudent(filteredData.length);
    }
  };

  const handleLogout = () => {
    push("/");
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 1) {
      setStudentData(BackupstudentData);
      setTotalStudent(BackupLength);
    } else {
      const filteredData = totalStudentData.filter((ele) =>
        ele.studentName.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setStudentData(filteredData);
      setTotalStudent(filteredData.length);
    }
  };

  return (
    <>
      <SideNav />
      <div style={{ marginLeft: "18%" }} className="mt-2">
        <h1>Dashboard</h1>

        <main style={{ display: "flex" }}>
          <section
            style={{
              background: "#302E81",
              color: "white",
              width: "30%",
              padding: "25px 30px 25px 30px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              (Academic Year: 2023-2024)
            </div>
            <div>
              <h1 style={{ fontSize: "bold" }}>2434</h1>
              <p style={{ position: "relative", bottom: "10px" }}>
                Total Students Count In School
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  background: "#F0F9FE",
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <FaMale fontSize={60} style={{ color: "#1C4ED8" }} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "bold",
                      position: "relative",
                      top: "20px",
                    }}
                  >
                    1422
                  </p>
                  <p>Males</p>
                </div>
              </div>
              <div
                style={{
                  background: "#F0F9FE",
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <FaFemale fontSize={60} color="#FF007E" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "bold",
                      position: "relative",
                      top: "20px",
                    }}
                  >
                    1022
                  </p>
                  <p>Females</p>
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              background: "#302E81",
              color: "white",
              width: "30%",
              padding: "25px 30px 25px 30px",
              borderRadius: "8px",
              marginLeft: "18px",
              display: "",
            }}
          >
            <div className="mt-4">
              <h1 style={{ fontSize: "bold" }}>24</h1>
              <p style={{ position: "relative", bottom: "10px" }}>
                Total Course
              </p>
            </div>

            <div>
              <div class="goal-chakli">
                <div class="dot"></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
