import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (

            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">
                            Copyright &copy; <a href="https://github.com/kad1m/">Dmytro Lytvynenko</a>
                        </Col>
                    </Row>
                </Container>
            </footer>

    );
};

export default Footer;