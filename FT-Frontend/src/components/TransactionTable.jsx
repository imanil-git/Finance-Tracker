import React from "react";
import Table from "react-bootstrap/Table";

export const TransactionTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Titile</th>
          <th>Out</th>
          <th>In</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Salary</td>
          <td></td>
          <td>$1500</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Shopping</td>
          <td>-$200</td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Interest</td>
          <td>$300</td>
          <td></td>
        </tr>
        <tr className="fw-bold text-center">
          <td colSpan={2}>Total</td>
          <td colSpan={2}>$1600</td>
        </tr>
      </tbody>
    </Table>
  );
};
