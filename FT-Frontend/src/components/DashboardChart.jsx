import { Row, Col } from "react-bootstrap";
import { CustomKPI } from "./CustomKPI";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { formatChartData } from "../../helpers/chartDataHelpers";
import balanceIcon from "../assets/balance.png";
import expenseIcon from "../assets/expense.png";
import incomeIcon from "../assets/income.png";
import DoughnutChart from "./chart/DoughnutChart";

export const DashboardChart = () => {
  const { transactions, getTransactions } = useUser();

  const [dashboardData, setDashboardData] = useState(formatChartData([]));

  useEffect(() => {
    const recordsToShow = 10;

    setDashboardData(formatChartData(transactions.slice(-1 * recordsToShow)));
  }, [transactions]);
  return (
    <>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={4}>
              <CustomKPI
                bgColor="warning"
                iconSrc={balanceIcon}
                kpiType="Balance"
                kpiValue={dashboardData.balance.amount}
              />
            </Col>
            <Col md={4}>
              <CustomKPI
                bgColor="success"
                iconSrc={incomeIcon}
                kpiType="Income"
                kpiValue={dashboardData.income.amount}
              />
            </Col>
            <Col md={4}>
              <CustomKPI
                bgColor="danger"
                iconSrc={expenseIcon}
                kpiType="Expense"
                kpiValue={dashboardData.expense.amount}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col
              md={4}
              className="bg-dark p-2 d-flex align-items-center justify-content-center"
            >
              <DoughnutChart data={dashboardData.balance.chartData} />
            </Col>
            <Col
              md={4}
              className="bg-dark p-2 d-flex align-items-center justify-content-center"
            ></Col>
            <Col
              md={4}
              className="bg-dark p-2 d-flex align-items-center justify-content-center"
            ></Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
