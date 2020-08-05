import React from "react";
import homeImg from "./../assets/house.png";
import { Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Row>
            <Col md="12">
              <h1 className="display-4"> {t("home.title")} </h1>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <img src={homeImg} className="img-fluid" />
            </Col>
          </Row>
          <Row></Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Home;
