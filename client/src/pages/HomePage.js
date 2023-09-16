import React from "react";
import { Container } from "react-bootstrap";
import Panel from "../common/Panel";
import { Col, Row } from "react-bootstrap";

function HomePage() {
  return (
    <div className="col-lg-12">
      <center>
        <div className="container pt-5">
          <h1 color="blue">Online Library</h1>
        </div>
        <div className="container pt-5">
          <Container>
            <center>
              <Row className="px-2 my-2">
                
                <Col>
                  <Panel
                    header="Login"
                    tittle="Login to"
                    desc="Login to your account"
                    href="/login"
                    button="Go!"
                  />
                </Col>
              </Row>
            </center> 
          </Container>
        </div>
      </center>
    </div>
  );
}

export default HomePage;
