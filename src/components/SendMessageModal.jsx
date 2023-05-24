import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Select from "react-select";
import axios from "axios";
import config from "@/utils/config";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

function Example({ showMsg, handleCloseMsg, setShowMsg }) {
  const [totalStudentData, setTotalStudentData] = useState([]);
  const [classVal, setClassVal] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  let options = [{ value: "All", label: "All" }];

  totalStudentData?.map((ele) => {
    options.push({ value: ele.class, label: ele.class });
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

  const handleSelectChange = (val) => {
    setClassVal(val.value);
  };

  useEffect(() => {
    let decoded;
    if (typeof window !== "undefined") {
      decoded = JSON.parse(localStorage.getItem("user"));
    }
    axios
      .get(`${config.baseUrl}/api/getstudentsByUserId?userid=${decoded._id}`)
      .then((res) => {
        setTotalStudentData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMsgSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let decoded;
    if (typeof window !== "undefined") {
      decoded = JSON.parse(localStorage.getItem("user"));
    }

    axios
      .post(`${config.baseUrl}/api/postmsg?userid=${decoded._id}`, {
        classVal,
        msg,
      })
      .then(() => {
        setShowMsg(false);
        toast.success("Successfully Sent Message !");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    setClassVal("");
    setMsg("");
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <Modal show={showMsg} onHide={handleCloseMsg}>
        <Modal.Header closeButton>
          <Modal.Title>Send Notice Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={unique}
            placeholder="Select Class"
            onChange={handleSelectChange}
            className="mb-3"
          />

          <Form>
            <FloatingLabel
              controlId="floatingTextarea2"
              className="mb-3"
              label="Enter Notice Messages"
            >
              <Form.Control
                as="textarea"
                placeholder="Enter Notice Messages"
                style={{ height: "250px" }}
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
            </FloatingLabel>

            <div className="mx-auto d-flex justify-content-center align-items-center">
              <Button
                variant="success"
                type="submit"
                className="mx-auto px-5"
                onClick={handleMsgSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
