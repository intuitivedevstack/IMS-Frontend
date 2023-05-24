import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "@/utils/config";
import { Spinner } from "react-bootstrap";

let decoded;
if (typeof window !== "undefined") {
  decoded = JSON.parse(localStorage.getItem("user"));
}

console.log(decoded);

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    studentName: yup.string().required("Student Name is a required field"),
    parentName: yup.string().required("Parent Name is a required field"),
    studentNumber: yup
      .string()
      .trim()
      .required("Student Number is a required field")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),

    parentNumber: yup
      .string()
      .trim()
      .required("Parent Number is a required field")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
    class: yup.string().required("Class or Course Name is a required field"),
    rollNumber: yup.string().required("Roll Number is a required field"),
    address: yup.string().required("Address is a required field"),
  })
  .required();

const Index = ({
  handleClose,
  show,
  setShow,
  isStudentAdded,
  setIsStudentAdded,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    data.studentName = data.studentName.trim();
    data.parentNumber = data.parentNumber.trim();

    let resultant = { ...data };

    axios
      .post(`${config.baseUrl}/api/students`, {
        userid: decoded._id,
        studentdetails: resultant,
      })
      .then((res) => {
        reset();
        setShow(false);
        toast.success("Added Student !");
        setIsStudentAdded(!isStudentAdded);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && (
        <div className="loader">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Student Name"
                {...register("studentName")}
              />
              <p style={{ color: "red" }}>{errors.studentName?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Parent Name"
                {...register("parentName")}
              />
              <p style={{ color: "red" }}>{errors.parentName?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Parent Contact Number"
                {...register("parentNumber")}
              />
              <p style={{ color: "red" }}>{errors.parentNumber?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Student Contact Number"
                {...register("studentNumber")}
              />
              <p style={{ color: "red" }}>{errors.studentNumber?.message}</p>

              <p style={{ color: "#3c3973" }}>
                In case, student does not have personal number, you can type
                their parent number same as Above
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Class or Course Name"
                {...register("class")}
              />
              <p style={{ color: "red" }}>{errors.class?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Roll Number"
                {...register("rollNumber")}
              />
              <p style={{ color: "red" }}>{errors.rollNumber?.message}</p>
            </Form.Group>

            <FloatingLabel
              controlId="floatingTextarea2"
              className="mb-3"
              label="Enter Address"
            >
              <Form.Control
                as="textarea"
                placeholder="Enter Address"
                style={{ height: "100px" }}
                {...register("address")}
              />
              <p style={{ color: "red" }}>{errors.address?.message}</p>
            </FloatingLabel>

            <div className="mx-auto d-flex justify-content-center align-items-center">
              <Button variant="success" type="submit" className="mx-auto px-5">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Index;
