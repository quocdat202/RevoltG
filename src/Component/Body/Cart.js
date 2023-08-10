import React from 'react';
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import emptyCart from "../../images/emptyCart.png"

function Cart({ user }) {
    const history = useHistory();

    const [dataCart, setDataCart] = useState([])
    const { Meta } = Card;

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const totalMoney = () => {
        let totalMoney = 0
        if (dataCart.length > 0) {
            dataCart.forEach(element => {
                totalMoney += (element.id * 23)
            });
        }
        return totalMoney
    }


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

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        if (inCart) {
            setDataCart(JSON.parse(inCart));
        }
    }, [])

    return (
        <div style={{ minHeight: screenHeight }}>
            {
                dataCart?.length > 0 ? <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <h1 style={{ color: 'white' }}>Your cart</h1>
                        <div>
                            <h2 style={{ color: 'white' }}>Total money:&nbsp;{totalMoney().toLocaleString()}$</h2>
                        </div>
                    </div>
                    <div>
                        <Button style={{ backgroundColor: 'transparent', width: 'auto', color: 'white' }} >Add to cart</Button>
                    </div>
                </div> : ''
            }

            <div className='gameList' >

                {
                    dataCart?.length > 0 ? dataCart?.map((item) => {
                        return (
                            <Card
                                hoverable
                                onClick={() => history.push(`/game/${item?.id}`)}
                                style={{
                                    width: 320,
                                    height: 289,
                                    paddingBottom: 10,
                                    marginBottom: 20,
                                    marginRight: 20,
                                    color: "#9e9ea3",
                                }}
                                cover={
                                    <img alt={item?.thumbnail} src={item?.thumbnail} />
                                }
                                actions={[
                                    <span style={{ fontWeight: '500', color: 'white' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                ]}
                            >
                                <div >
                                    <Meta
                                        title={item?.title}
                                    />
                                    {/* <div className="card-description"
                                            style={{
                                                height: '70px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                            {item?.short_description}
                                        </div> */}
                                </div>
                            </Card>
                        )
                    }) : <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img style={{ width: 200 }} src={emptyCart} />
                        <h2 style={{ color: 'white' }}>Cart is empty</h2>
                    </div>
                }
            </div>
        </div>

    );
};

export default Cart;