import { useState } from "react";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import Pagination from "react-bootstrap/Pagination";

const FeeTables = ({ handleDeleteShow, feeData }) => {
  const [page, setPage] = useState(1);

  const resultantData = feeData?.slice((page - 1) * 10, page * 10);

  const hanldePage = (page) => {
    setPage(page);
  };

  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(feeData?.length / 10); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => hanldePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Table striped bordered hover className="mt-4" responsive="md">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultantData?.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.tuition_fee + " rs"}</td>
              <td>{ele.transport_fee != "" && ele.transport_fee + " rs"}</td>
              <td>
                {ele.examination_fee != "" && ele.examination_fee + " rs"}
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
              <td>
                <BsFillTrashFill
                  cursor={"pointer"}
                  onClick={() => handleDeleteShow(ele.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination size="sm">{items}</Pagination>
      </div>
    </>
  );
};

export default FeeTables;
