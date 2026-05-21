import React from "react";
import { Row, Col } from "react-bootstrap";

export const CustomKPI = ({
  bgColor = "white",
  iconSrc,
  kpiType,
  kpiValue,
}) => {
  return (
    <>
      <Row className={"bg-" + bgColor + " rounded text-black p-3 g-2"}>
        <Col md={4}>
          <img className="img-fluid" src={iconSrc} alt={kpiType} />
        </Col>
        <Col md={7} className="ms-2">
          <div className="border-bottom border-dark border-2">
            <h6>{kpiType}</h6>
          </div>

          <div>
            <h1>{kpiValue}</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};
