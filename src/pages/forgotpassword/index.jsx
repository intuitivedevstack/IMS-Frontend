import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import config from "@/utils/config";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

const Index = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 9000);
  }, [showAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${config.baseUrl}/auth/resetpassword`, {
        email,
      })
      .then(() => {
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
        alert("User doesn't exists");
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
      {showAlert && (
        <Alert
          key={"success"}
          variant={"success"}
          style={{ width: "30%", float: "right" }}
        >
          Check Your Email, I have sent a link to Reset Password
          <RxCross1
            fontSize={20}
            color="red"
            style={{ marginLeft: "20", cursor: "pointer" }}
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}

      <main className="d-flex justify-content-center align-items-center mt-5">
        <Form style={{ width: "30%" }} className="form-reset">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Email address to Reset Password</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email "
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-column">
            <Button
              variant="success"
              type="submit"
              className="mx-auto"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Link href={"/"} className="mt-4">
              Back to Login ?
            </Link>
          </div>
        </Form>
      </main>
    </>
  );
};

export default Index;
