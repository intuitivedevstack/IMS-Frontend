import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import config from "@/utils/config";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

const schema = yup
  .object({
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const Index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let token = router.query.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);

    data.password = data.password.trim();
    data.passwordConfirmation = data.passwordConfirmation.trim();

    axios
      .post(`${config.baseUrl}/auth/resetpassword/${token}`, data)
      .then(() => {
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 9000);
  }, [showAlert]);

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
          style={{ width: "35%", float: "right" }}
        >
          Congratulations, Your Password has been Reset Successfully !
          <RxCross1
            fontSize={20}
            color="red"
            style={{ marginLeft: "20", cursor: "pointer" }}
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}

      <main className="d-flex justify-content-center align-items-center mt-5">
        <Form
          style={{ width: "30%" }}
          onSubmit={handleSubmit(onSubmit)}
          className="form-reset"
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register("passwordConfirmation", {
                required: true,
              })}
            />
            <p style={{ color: "red" }}>
              {errors.passwordConfirmation?.message}
            </p>
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
