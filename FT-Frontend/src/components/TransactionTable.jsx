import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaCirclePlus } from "react-icons/fa6";

export const TransactionTable = () => {
  const [displayTran, setDisplayTran] = useState([]);
  const { transactions, toogleModal } = useUser();
  useEffect(() => {
    setDisplayTran(transactions);
  }, [transactions]);
  const handleOnSearch = (e) => {
    const { value } = e.target;

    const filteredArg = transactions.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );

    setDisplayTran(filteredArg);
  };
  console.log(transactions);
  const balance = displayTran.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);
  return (
    <>
      <p className="fs-4 fw-bold">{displayTran.length} transaction(s) found!</p>
      <div className="d-flex justify-content-between pt-3 mb-4">
        <div>
          <Form.Control className="rounded-pill" onChange={handleOnSearch} />
        </div>
        <div className="text-center">
          <Button className="rounded-pill" onClick={() => toogleModal(true)}>
            <FaCirclePlus /> Add New Transactions
          </Button>
        </div>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Titile</th>
            <th>Out</th>
            <th>In</th>
          </tr>
        </thead>
        <tbody>
          {displayTran.length > 0 &&
            displayTran.map((t, i) => (
              <tr key={t._id}>
                <td>{i + 1}</td>
                <td>{t.createdAt.slice(0, 10)}</td>
                <td>{t.title}</td>
                {t.type === "expenses" && (
                  <>
                    <td className="out">-${t.amount}</td>
                    <td></td>
                  </>
                )}
                {t.type === "income" && (
                  <>
                    <td></td>
                    <td className="in">${t.amount}</td>
                  </>
                )}
              </tr>
            ))}
          <tr className="fw-bold text-center">
            <td colSpan={2}>Total</td>
            <td colSpan={3}>${balance}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
