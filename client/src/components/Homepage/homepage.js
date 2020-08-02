import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Row, Button, Col, Image } from "react-bootstrap";
import Col1 from "./col1";

import cc from "./homepage.module.css";

const Homepage = (props) => {
  return !props.open ? (
    <div className={cc.homepage}>
      <div className={cc.page1}>
        <Jumbotron className={cc.jumbo}>
          <Row>
            <Col md={(6, { order: "first" })} lg={(6, { order: "last" })}>
              <Image
                className={cc.heroImage}
                variant="top"
                src={require("../../Assets/heroImage.svg")}
              />
            </Col>
            <Col md={(6, { order: "last" })} lg={(6, { order: "first" })}>
              <h1>
                Empowering Farmers<br></br>Through ML/AI
              </h1>
              <p>By providing data and recommendation to maximize crop yield</p>
              <Button style={{ margin: "20px", background: "#28a745" }}>
                <Link
                  to="/farmerlogin"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Farmer Login
                </Link>
              </Button>
              <Button style={{ margin: "20px", background: "#28a745" }}>
                <Link
                  to="/govtlogin"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Govt. Login
                </Link>
              </Button>
              <div id="google_translate_element"></div>
            </Col>
          </Row>
        </Jumbotron>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#27a844"
            fillOpacity="1"
            d="M0,32L60,58.7C120,85,240,139,360,138.7C480,139,600,85,720,64C840,43,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg> */}
      </div>
      <Col1 />
    </div>
  ) : null;
};

export default Homepage;
