import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import profile from "../../assests/profile.png";
import axios from "axios";
import config from "@/utils/config";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import Footer from "@/components/footer.jsx";

const AdminDashboard = () => {
  const { push } = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [url, setUrl] = useState(null);
  const [isUpload, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  let studentData;
  let userid;
  if (typeof window !== "undefined") {
    studentData = JSON.parse(localStorage.getItem("studentData"));
    userid = JSON.parse(localStorage.getItem("userid"));
  }

  useEffect(() => {
    axios
      .get(
        `${config.baseUrl}/api/getstudentsById?userid=${userid}&&studentId=${studentData.id}`
      )
      .then((res) => {
        setUrl(res.data.findData?.photo?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studentData?.id, userid, isUpload]);

  const handleUpload = (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    axios
      .post(
        `https://imb.onrender.com/api/uploadphoto?userid=${userid}&&studentId=${studentData.id}`,
        formData
      )
      .then(() => {
        toast.success("Uploaded !");
        setIsUploaded(!isUpload);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <>
      {loading && (
        <div className="loader">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <div className="page-container">
        <div className="page-layout row">
          <div className="left-cnt col-1 mx-auto">
            <div className="logo">IM</div>
            <ul className="sidebar-links"></ul>
            <div className="bottom-link">
              <ul className="sidebar-links">
                <li onClick={handleLogout}>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.6939 20.5155V22.555C18.6939 24.8042 16.8641 26.634 14.6149 26.634H4.36628C2.11703 26.634 0.287231 24.8042 0.287231 22.555V4.60719C0.287231 2.35793 2.11703 0.528137 4.36628 0.528137H14.6149C16.8641 0.528137 18.6939 2.35793 18.6939 4.60719V6.64671C18.6939 7.20997 18.2374 7.66647 17.6742 7.66647C17.1109 7.66647 16.6544 7.20997 16.6544 6.64671V4.60719C16.6544 3.48266 15.7394 2.56766 14.6149 2.56766H4.36628C3.24175 2.56766 2.32676 3.48266 2.32676 4.60719V22.555C2.32676 23.6795 3.24175 24.5945 4.36628 24.5945H14.6149C15.7394 24.5945 16.6544 23.6795 16.6544 22.555V20.5155C16.6544 19.9522 17.1109 19.4957 17.6742 19.4957C18.2374 19.4957 18.6939 19.9522 18.6939 20.5155ZM25.6464 11.8294L23.3629 9.54586C22.9646 9.14752 22.3189 9.14752 21.9207 9.54586C21.5224 9.94401 21.5224 10.5897 21.9207 10.9879L23.545 12.6123H11.3007C10.7374 12.6123 10.2809 13.0688 10.2809 13.6321C10.2809 14.1953 10.7374 14.6518 11.3007 14.6518H23.545L21.9207 16.2763C21.5224 16.6744 21.5224 17.3202 21.9207 17.7183C22.1199 17.9175 22.3808 18.0171 22.6417 18.0171C22.9028 18.0171 23.1638 17.9175 23.3629 17.7183L25.6464 15.4348C26.6405 14.4407 26.6405 12.8234 25.6464 11.8294V11.8294Z"
                      fill="white"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>

          <section className="right-cnt col-11 row mx-auto">
            <div className="middle-sec col ms-md-3">
              <div className="box-student">
                <div>
                  <label htmlFor="file">
                    {url != null ? (
                      <Image
                        src={url}
                        alt="img"
                        style={{ borderRadius: "5%" }}
                        height={120}
                        width={120}
                      />
                    ) : (
                      <>
                        <Image
                          src={profile}
                          alt="img"
                          className="profile-img"
                        />
                      </>
                    )}

                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      name="image"
                      accept="image/*"
                      multiple=""
                      data-original-title="upload photos"
                      onChange={handleUpload}
                    />
                  </label>
                </div>
                <div>
                  <div>
                    <strong>Student Name: </strong>
                    <span> {studentData.studentName}</span>
                  </div>

                  <div>
                    <strong>Class</strong>
                    <span> {studentData.class}</span>
                  </div>

                  <div>
                    <strong>Roll No.</strong>
                    <span> {studentData.rollNumber}</span>
                  </div>

                  <div>
                    <strong>Parent Name</strong>
                    <span> {studentData.parentName}</span>
                  </div>
                </div>

                <div>
                  <div>
                    <strong>Student Number</strong>
                    <span> {studentData.studentNumber}</span>
                  </div>
                  <div>
                    <strong>Parent Number</strong>
                    <span> {studentData.parentNumber}</span>
                  </div>

                  <div>
                    <strong>Address</strong>
                    <span> {studentData.address}</span>
                  </div>
                </div>
              </div>

              <Table striped bordered hover responsive="md" className="mt-5">
                <thead>
                  <tr>
                    <th>Tuition Fee</th>
                    <th>Transport Fee</th>
                    <th>Examination Fee</th>
                    <th>Total Amount</th>
                    <th>Amount Paid</th>
                    <th>Amount Due</th>
                    <th>Paid Months</th>
                    <th>Payment Status</th>
                    <th>Deposited Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.fees?.map((ele) => (
                    <tr key={ele.id}>
                      <td>{ele.tuition_fee + " rs"}</td>
                      <td>
                        {ele.transport_fee != "" && ele.transport_fee + " rs"}
                      </td>
                      <td>
                        {ele.examination_fee != "" &&
                          ele.examination_fee + " rs"}
                      </td>
                      <td>
                        {Number(ele.tuition_fee) +
                          Number(ele.transport_fee) +
                          Number(ele.examination_fee) +
                          " rs"}
                      </td>

                      <td>{`${ele.paid_amount} rs`}</td>
                      <td>{ele.due + " rs"}</td>

                      <td>{ele.paid_month}</td>
                      <td className="d-flex align-items-center">
                        <div
                          style={
                            ele.payment_status.includes("100%")
                              ? { backgroundColor: "green" }
                              : { backgroundColor: "#fe86ae" }
                          }
                          className="span-status"
                        ></div>
                        <span className="ms-2">{ele.payment_status}</span>
                      </td>
                      <td>{ele.deposited_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
