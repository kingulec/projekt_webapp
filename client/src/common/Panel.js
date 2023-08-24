import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Card from "react-bootstrap/Card"
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

function Panel(props) {
  return (

      <Col lg={3}>
        <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.image_src} />
          <Card.Header>{props.header}</Card.Header>
          <Card.Body>
            <Card.Title>
              <h6>{props.title}</h6>
            </Card.Title>

            <Card.Text>
              {props.desc}
            </Card.Text>

            <Button variant="danger" size="lg" href={props.href}>{props.button}</Button>
          </Card.Body>

        </Card>
      </Col>

  );
}

export default Panel;
