import { Container, Row, Col } from "react-bootstrap";
import { DashboardChart } from "../components/DashboardChart";

const Dashboard = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded gap-2">
        <Col md={6}>
          <h2>Dashboard</h2>
        </Col>
        <hr />
        <DashboardChart />
      </Row>
    </Container>
  );
};

export default Dashboard;
