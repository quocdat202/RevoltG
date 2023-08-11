import React from 'react';
import '../../Css/Content.css'
import rdr2 from '../../images/rdr2.jpg'
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { UserOutlined, DesktopOutlined, ClockCircleOutlined, EyeOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { TreeSelect } from 'antd';
import { Empty } from 'antd'


function Content({ user, notification, addToCart }) {
    const history = useHistory();
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(12)
    const { Meta } = Card;
    const { Search } = Input;
    const [data, setData] = useState()

    const [valueSort, setValueSort] = useState();
    const onChange = (newValue) => {
        console.log(newValue);
        setValueSort(newValue);
    };
    const contentStyle = {
        minheight: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const treeData = [
        {
            value: "shooter",
            title: "Shooter",
        },
        {
            value: "moba",
            title: "MOBA",
        },
        {
            value: "fantasy",
            title: "Fantasy",
        },
        {
            value: "strategy",
            title: "Strategy",
        },
        {
            value: "sports",
            title: "Sports",
        },
        {
            value: "cardgame",
            title: "Card Game",
        },
        {
            value: "mmoarpg",
            title: "MMOARPG",
        },
        {
            value: "arpg",
            title: "Action Role-Playing Game",
        },
        {
            value: "fighting",
            title: "Fighting",
        },
        {
            value: "racing",
            title: "Racing",
        },

    ];



    const request = async (value) => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games${valueSort ? "?category=" + valueSort : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const resultRes = await response.json();
            const result = resultRes.slice(20, resultRes?.length)
            value ? setData(result.filter((item) => item?.title?.toLowerCase().includes(value.toLowerCase()))) : setData(result);
            console.log(result);
        } catch (error) {
            console.error(error);
            setData([])
        }
    }

    const handlePageChange = (page, pageSize) => {
        const newOffset = (page - 1) * pageSize;
        setOffset(newOffset);
        setLimit(pageSize);
    };

    useEffect(() => {
        request()
    }, [valueSort])
    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/671860/header.jpg?t=1686877598' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1691007781' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/1184140/header.jpg?t=1689199309' />
                    </h3>
                </div>

            </Carousel>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div className='statistic'>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Statistic title="Member" value={532375} prefix={<UserOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        <Statistic title="Games" value={1496} prefix={<DesktopOutlined style={{ padding: '5px', backgrounddivor: '#191b20', borderRadius: '10px' }} />} />
                        <Statistic title="Play time" value={10000000} prefix={<ClockCircleOutlined style={{ padding: '5px', backgrounddivor: '#191b20', borderRadius: '10px' }} />} />
                        <Statistic title="Online" value={3024} prefix={<EyeOutlined style={{ padding: '5px', backgrounddivor: '#191b20', borderRadius: '10px' }} />} />
                        <Statistic title="Playing" value={1169} prefix={<CaretRightOutlined style={{ padding: '5px', backgrounddivor: '#191b20', borderRadius: '10px' }} />} />
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '30px 0', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
                        <span style={{ color: 'white', paddingRight: 10 }}>Search Game</span>
                        <Search
                            placeholder="Enter name game"
                            onSearch={request}
                            style={{
                                width: 300,
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span style={{ color: 'white', paddingRight: 10 }}>Category</span>
                        <TreeSelect
                            style={{
                                minWidth: '200px',
                            }}
                            allowClear={true}
                            value={valueSort}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            treeData={treeData}
                            placeholder="Please select category game"
                            treeDefaultExpandAll
                            onChange={onChange}
                        />
                    </div>
                </div>



                <div className='gameList' >
                    {
                        data?.length > 0 ? data?.slice(offset, offset + limit)?.map((item) => {
                            return (
                                <Card
                                    hoverable
                                    className='btn-add-cart'
                                    style={{
                                        width: 320,
                                        height: 405,
                                        paddingBottom: 10,
                                        marginBottom: 20,
                                        marginRight: 20
                                    }}
                                    cover={
                                        <img alt={item?.thumbnail} src={item?.thumbnail} onClick={() => history.push(`/game/${item?.id}`)} />
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'white' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                        <button style={{ width: 'auto', color: 'white' }} onClick={() => addToCart(item)} >Add to cart</button>
                                    ]}
                                >
                                    <div >
                                        <Meta style={{ color: '#b1b1b5', fontWeight: 'bold', fontSize: 20 }} onClick={() => history.push(`/game/${item?.id}`)}
                                            title={item?.title}
                                        />
                                        <div className="card-description"
                                            style={{
                                                paddingTop: 20,
                                                height: '70px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                color: 'white'
                                            }}>
                                            {item?.short_description}
                                        </div>
                                    </div>
                                </Card>
                            )
                        }) : <Empty />
                    }
                </div>
                <div style={{ marginBottom: 50, color: '#b1b1b5' }}>
                    {
                        data?.length > 0 && (
                            <Pagination
                                className='pagination-content'
                                current={Math.floor(offset / limit) + 1}
                                pageSize={limit}
                                total={data.length}
                                showSizeChanger={false}
                                onChange={handlePageChange}
                            />
                        )
                    }
                </div>
                <p className='Footer'>Phát triển bởi © RevoltG</p>
                <FloatButton.BackTop visibilityHeight={100} />

            </div>
        </div>
    )

};
export default Content;