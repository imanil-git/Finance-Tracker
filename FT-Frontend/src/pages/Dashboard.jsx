import { Container, Row, Col } from "react-bootstrap";
import { DashboardChart } from "../components/DashboardChart";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { ChatBox } from "../components/ChatBox";

const Dashboard = () => {
  const { transactions, getTransactions } = useUser();

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Container className="p-5">
        <Row className="bg-dark p-5 rounded gap-2">
          <Col md={6}>
            <h2>Dashboard</h2>
          </Col>
          <hr />
          <DashboardChart />
        </Row>
      </Container>

      <ChatBox />
    </>
  );
};

export default Dashboard;
