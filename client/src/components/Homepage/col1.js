import React from "react";
import { Container, CardDeck, Card } from "react-bootstrap";
import cc from "./homepage.module.css";
const cols = () => {
  return (
    <Container>
      <CardDeck expand="lg" className={cc.deck1}>
        <Card className={cc.infoBox}>
          <Card.Body>
            <Card.Img
              className={cc.infoCards}
              variant="top"
              src={require("../../Assets/production.svg")}
            />
            <Card.Title>Production</Card.Title>
            <Card.Text className={cc.muted}>
              Recieve AI-generated data for crop production
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className={cc.infoBox}>
          <Card.Body>
            <Card.Img
              className={cc.infoCards}
              variant="top"
              src={require("../../Assets/connection.svg")}
            />
            <Card.Title>Connectivity</Card.Title>
            <Card.Text className={cc.muted}>
              A gateway for farmers to connect with the authorities
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className={cc.infoBox}>
          <Card.Body>
            <Card.Img
              className={cc.infoCards}
              variant="top"
              src={require("../../Assets/efficiency.svg")}
            />
            <Card.Title>Efficiency</Card.Title>
            <Card.Text className={cc.muted}>
              Get recommedation on what to plant through AI generated data
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </Container>
  );
};

export default cols;
