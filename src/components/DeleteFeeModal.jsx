import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import config from "@/utils/config";

let decoded;
if (typeof window !== "undefined") {
  decoded = jwt_decode(localStorage.getItem("access_token"));
}

function Example({
  showDelete,
  handleDeleteClose,
  studentId,
  isFeeDeleted,
  setIsFeeDeleted,
  feeid,
}) {
  const handleDelete = () => {
    handleDeleteClose();

    axios
      .delete(
        `${config.baseUrl}/api/deletefeeById?userid=${decoded.id}&&studentId=${studentId}&&feeid=${feeid}`
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Deleted !");
        setIsFeeDeleted(!isFeeDeleted);
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
          <strong>Are You Sure, You Want to Delete This Fee Details ?</strong>
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
