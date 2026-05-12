import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";

const Transaction = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col>
          <TransactionForm />
          <hr />
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
