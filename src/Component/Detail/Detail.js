import React from 'react';
import { useEffect, useState } from 'react'
import { StarFilled, TagFilled, InfoCircleFilled, CalendarFilled, PlaySquareOutlined } from '@ant-design/icons';
import '../../Css/Detail.css'
import { Button, Space } from 'antd';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';


function Detail({ match, user, notification, addToCart }) {
    // const contentStyle = {
    //     height: '160px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };
    // console.log(match);

    const contentStyle = {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const [data, setData] = useState([])
    useEffect(() => {
        request()
    }, [])

    const request = async () => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${match?.match?.params?.id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5515175e93mshdf277ee740991dap1eee52jsn20dd8885cdf1',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(data);

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ margin: '0', padding: '0 50px' }}>
            <h2 style={{ color: 'white' }}>{data?.title}</h2>

            <Row wrap={true}>
                <Col md={12} xxl={12} xs={24}>
                    <Carousel autoplay>
                        {
                            data?.screenshots?.map((item) => {
                                return (
                                    <div style={contentStyle}>
                                        <img src={item?.image} style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </Col>
                <Col md={12} xxl={12} xs={24} style={{ padding: '0 20px' }}>
                    <Row>
                        <Col span={24}>
                            <p style={{ color: 'grey', fontSize: '20px' }}>
                                {data.short_description}
                            </p>
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col span={12}>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={6} xs={24} xxl={12} >
                                    <CalendarFilled style={{ color: 'green', fontSize: '50px' }} />
                                </Col>
                                <Col span={12} xs={24} xxl={12} >
                                    <p style={{ color: 'green' }}>RELEASE DATE: </p>
                                    <p style={{ color: 'grey', fontSize: '15px' }}>{data.release_date}</p>
                                </Col>

                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={6} xs={24} xxl={12}>
                                    <InfoCircleFilled style={{ color: 'purple', fontSize: '50px' }} />
                                </Col>
                                <Col span={12} xs={24} xxl={12}>
                                    <p style={{ color: 'purple' }}>PLATFORM: </p>
                                    <p style={{ color: 'grey', fontSize: '15px' }}>{data.platform}</p>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={6} xs={24} xxl={12}>
                                    <TagFilled style={{ color: 'blue', fontSize: '50px' }} />
                                </Col>
                                <Col span={12} xs={24} xxl={12}>
                                    <p style={{ color: 'blue' }}>GENRE:</p>
                                    <p style={{ color: 'grey', fontSize: '15px' }}>{data.genre}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={6} xs={24} xxl={12}>
                                    <StarFilled style={{ color: 'yellow', fontSize: '50px' }} />
                                </Col>
                                <Col span={12} xs={24} xxl={12}>
                                    <p style={{ color: 'yellow' }}>PUBLISHER:</p>
                                    <p style={{ color: 'grey', fontSize: '15px' }}>{data.publisher}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button className='btn' type="primary" block onClick={() => addToCart(data)}>
                            <PlaySquareOutlined /> PLAY NOW
                        </Button>
                    </div>
                </Col>
                {/* </div> */}
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'grey', paddingTop: 30 }}>
                <h2>Description</h2>
                <Col span={16} xs={24} xxl={12}>
                    <p style={{ fontSize: '17px' }}>{data.description}</p>
                </Col>
            </Row>
            {/* <Carousel autoplay>
                {
                    data?.screenshots?.map((item) => {
                        console.log("===================", data);
                        return (
                            <div>
                                <img src={item?.image} style={{ width: '100%', height: 'auto' }} />
                            </div>


                        )
                    })
                }
            </Carousel>
            <div className='gameList'>
                <div>
                    <p>{data.description}</p>
                </div>
                <div>
                    <div>
                        <CalendarFilled />
                        <p style={{ color: 'green' }}>RELEASE DATE:</p>
                        <p>{data.release_date}</p>
                    </div>
                    <div>
                        <InfoCircleFilled />
                        <p style={{ color: 'purple' }}>PLATFORM: </p>
                        <p>{data.platform}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <TagFilled />
                        <p style={{ color: 'blue' }}>GENRE:</p>
                        <p>{data.genre}</p>
                    </div>
                    <div>
                        <StarFilled />
                        <p style={{ color: 'yellow' }}>PUBLISHER:</p>
                        <p>{data.publisher}</p>
                    </div>
                </div>
                <Button className='btn' type="primary" block>
                    <PlaySquareOutlined /> PLAY NOW
                </Button>
            </div> */}
            <p className='Footer'>Phát triển bởi © RevoltG</p>
        </div>
    )

};
export default Detail;