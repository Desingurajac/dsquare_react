import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import './HomeBanner.css';
import Card from 'react-bootstrap/Card';
// import SplitPane from 'react-split-pane';


const HomeBanner = () => {


    return (
        <Container>
            <Row>
                <Col className='login-card'>
                <h2 className='text-primary fw-bold '>Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </Col>
                <Col>
              
                    <Carousel >
                        <Carousel.Item className='caruosel1'>
                            <Image className='gallery'
                                src={require('/DesingRaja/ReactApp/dkart/src/asserts/images/Image1.jpg')}
                                alt='First Slide'></Image>
                         
                        </Carousel.Item>
                        <Carousel.Item className='caruosel1'>
                            <Image className='gallery'
                                src={require('/DesingRaja/ReactApp/dkart/src/asserts/images/Image2.jpg')}
                                alt='Second Slide'></Image>
                           
                        </Carousel.Item>
                        <Carousel.Item className='caruosel1'>
                            <Image className='gallery'
                                src={require('/DesingRaja/ReactApp/dkart/src/asserts/images/Image3.jpg')}
                                alt='Third Slide' ></Image>
                           
                        </Carousel.Item>
                        <Carousel.Item className='caruosel1'>
                            <Image className='gallery'
                                src={require('/DesingRaja/ReactApp/dkart/src/asserts/images/Image4.jpg')}
                                alt='Fourth Slide' ></Image>
                       
                        </Carousel.Item>
                        <Carousel.Item className='caruosel1'>
                            <Image className='gallery'
                                src={require('/DesingRaja/ReactApp/dkart/src/asserts/images/Image5.jpg')}
                                alt='Fourth Slide' ></Image>
                           
                        </Carousel.Item>
                    </Carousel>
                      
                </Col>
            </Row>


        </Container>
    )
}

export default HomeBanner