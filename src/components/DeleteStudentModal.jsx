import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import config from "@/utils/config";

function Example({
  showDelete,
  handleDeleteClose,
  studentId,
  setIsStudentDeleted,
  isStudentDeleted,
}) {
  const handleDelete = () => {
    handleDeleteClose();

    let decoded;
    if (typeof window !== "undefined") {
      decoded = JSON.parse(localStorage.getItem("user"));
    }

    axios
      .delete(
        `${config.baseUrl}/api/deletestudentById?userid=${decoded._id}&&studentId=${studentId}`
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Deleted !");
        setIsStudentDeleted(!isStudentDeleted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <strong>
            Are You Sure, You Want to Delete This Student Details ?
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
