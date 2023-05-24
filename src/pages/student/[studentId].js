import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import config from "@/utils/config";
import Image from "next/image";
import profile from "../../assests/profile.png";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import Footer from "@/components/footer.jsx";

let decoded;
if (typeof window !== "undefined") {
  decoded = JSON.parse(localStorage.getItem("user"));
}

const AdminDashboard = () => {
  const { push } = useRouter();
  const router = useRouter();

  let id = router.query.studentId;

  const [hasMounted, setHasMounted] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [isUpload, setIsUploaded] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    push("/");
  };

  useEffect(() => {
    axios
      .get(
        `${config.baseUrl}/api/getstudentsById?userid=${decoded._id}&&studentId=${id}`
      )
      .then((res) => {
        setStudentData(res.data.findData);
        setData(res.data.findData?.photo?.data);
      });
  }, [id, isUpload, studentData?.studentName == undefined]);

  const handleUpload = (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    axios
      .post(
        `${config.imgUrl}/api/uploadphoto?userid=${decoded._id}&&studentId=${id}`,
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
            <ul className="sidebar-links">
              <li onClick={() => push("/admindashboard")} className="mx-auto">
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.6399 11.3087L15.0322 0.701416C14.5802 0.249146 13.9791 0 13.3398 0C12.7005 0 12.0994 0.248947 11.6471 0.701218L1.04675 11.3014C1.04318 11.305 1.03961 11.3087 1.03604 11.3123C0.107693 12.246 0.10928 13.7609 1.0406 14.6922C1.46609 15.1179 2.02806 15.3645 2.6289 15.3903C2.6533 15.3927 2.6779 15.3939 2.70269 15.3939H3.12541V23.1989C3.12541 24.7434 4.38205 26 5.92691 26H10.0763C10.4968 26 10.838 25.659 10.838 25.2383V19.1191C10.838 18.4144 11.4113 17.8411 12.1161 17.8411H14.5635C15.2683 17.8411 15.8415 18.4144 15.8415 19.1191V25.2383C15.8415 25.659 16.1825 26 16.6033 26H20.7527C22.2975 26 23.5541 24.7434 23.5541 23.1989V15.3939H23.9461C24.5852 15.3939 25.1863 15.1449 25.6388 14.6926C26.5711 13.7597 26.5715 12.2422 25.6399 11.3087Z"
                    fill="white"
                  />
                </svg>
              </li>
            </ul>
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
                    {data != null ? (
                      <Image
                        src={`data:image;base64,${data.toString("base64")}`}
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
                    <span> {studentData?.studentName}</span>
                  </div>

                  <div>
                    <strong>Class</strong>
                    <span> {studentData?.class}</span>
                  </div>

                  <div>
                    <strong>Roll No.</strong>
                    <span> {studentData?.rollNumber}</span>
                  </div>

                  <div>
                    <strong>Parent Name</strong>
                    <span> {studentData?.parentName}</span>
                  </div>
                </div>

                <div>
                  <div>
                    <strong>Student Number</strong>
                    <span> {studentData?.studentNumber}</span>
                  </div>
                  <div>
                    <strong>Parent Number</strong>
                    <span> {studentData?.parentNumber}</span>
                  </div>

                  <div>
                    <strong>Address</strong>
                    <span> {studentData?.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
