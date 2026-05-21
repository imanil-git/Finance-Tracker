import { Row, Col } from "react-bootstrap";
import { CustomKPI } from "./CustomKPI";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { formatChartData } from "../../helpers/chartDataHelpers";
import balanceIcon from "../assets/balance.png";
import expenseIcon from "../assets/expense.png";
import incomeIcon from "../assets/income.png";
import DoughnutChart from "./chart/DoughnutChart";
import LineChart from "./chart/LineChart";
import BarChart from "./chart/BarChart";

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
            >
              <LineChart
                data={dashboardData.income.lineData}
                options={dashboardData.income.options}
              />
            </Col>
            <Col
              md={4}
              className="bg-dark p-2 d-flex align-items-center justify-content-center"
            >
              <LineChart
                data={dashboardData.expense.lineData}
                options={dashboardData.expense.options}
              />
            </Col>
          </Row>
          <Row>
            <Col className="bg-dark rounded p-4">
              <BarChart
                data={dashboardData.combined.data}
                options={dashboardData.combined.options}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
