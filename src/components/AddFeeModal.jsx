import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "@/utils/config";
import { Spinner } from "react-bootstrap";
import { BsCalendarDate } from "react-icons/bs";
import DatePicker from "react-datepicker";

let decoded;
if (typeof window !== "undefined") {
  decoded = jwt_decode(localStorage.getItem("access_token"));
}

console.log(decoded);

const schema = yup
  .object({
    paid_amount: yup.string().required("Amount is a required field"),
    paid_month: yup.string().required("Paid Month is a required field"),
    deposited_date: yup.string().required("Deposited date is a required field"),
    payment_status: yup.string().required("payment status is a required field"),
  })
  .required();

const Index = ({
  handleClose,
  show,
  setShow,
  isFeeAdded,
  setisFeeAdded,
  studentId,
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

    function convert(str) {
      let date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join("-");
    }
    data.deposited_date = convert(data.deposited_date);
    console.log(data);

    reset();

    data.payment_status = `${data.payment_status}%`;

    axios
      .post(
        `${config.baseUrl}/api/postfee?userid=${decoded.id}&&studentId=${studentId}`,
        data
      )
      .then((res) => {
        reset();
        setShow(false);
        toast.success("Added Fee !");
        setisFeeAdded(!isFeeAdded);
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
          <Modal.Title>Add Fee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Amount Paid"
                {...register("paid_amount")}
              />
              <p style={{ color: "red" }}>{errors.paid_amount?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Paid Month"
                {...register("paid_month")}
              />
              <p style={{ color: "red" }}>{errors.paid_month?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Enter Payment Status, Example 100% or 50% or 25%"
                {...register("payment_status")}
              />
              <p style={{ color: "red" }}>{errors.payment_status?.message}</p>
            </Form.Group>

            {/* <Controller
              name="payment_status"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={options}
                  placeholder="Select Payment Status"
                  className="mb-3"
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.paid_status?.message}</p> */}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <p className="mt-2">Deposited Date</p>

              <label>
                <div className="d-flex align-items-center">
                  <Controller
                    control={control}
                    name="deposited_date"
                    render={({ field }) => (
                      <DatePicker
                        name="deposited_date"
                        placeholderText={"choose date"}
                        selected={field.value}
                        dateFormat="dd-MM-yyyy"
                        onChange={field.onChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        closeOnScroll={true}
                        disabledKeyboardNavigation
                      />
                    )}
                  />
                  <BsCalendarDate fontSize={32} cursor={"pointer"} />
                </div>
              </label>
              <p style={{ color: "red" }}>{errors.deposited_date?.message}</p>
            </Form.Group>

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
