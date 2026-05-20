import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { useUser } from "../context/UserContext";
import { CustomModal } from "../components/CustomModal";

const Transaction = () => {
  const { getTransactions } = useUser();
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col>
          <CustomModal>
            <TransactionForm />
          </CustomModal>
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
