import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const About = () => {
  return (
    <Container fluid className='p-0 m-0' style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        className='bg-dark-gray'
      >
        <h1>ABOUT</h1>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderTop: '15px solid #A0A09F',
        }}
        className='bg-dark pt-4 pb-4'
      >
        <Row className='d-flex justify-content-center'>
          <Col className='col-4'>
            <p className='text-light'>
              Leverage agile frameworks to provide a robust synopsis for high level overviews.
              Iterative approaches to corporate strategy foster collaborative thinking to further
              the overall value proposition. Organically grow the holistic world view of disruptive
              innovation via workplace diversity and empowerment. Bring to the table win-win
              survival strategies to ensure proactive domination. At the end of the day, going
              forward, a new normal that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in real-time will have
              multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a
              ballpark value added activity to beta test. Override the digital divide with
              additional clickthroughs from DevOps. Nanotechnology immersion along the information
              highway will close the loop on focusing solely on the bottom line.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default About;
