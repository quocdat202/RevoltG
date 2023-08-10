import React from 'react';
import { Empty } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react'


const CS = () => {
    const [screenHeight, setScreenHeight] = useState();
    
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
        <div style={{ color: 'gray', paddingTop:'40px', paddingBottom:'40px', height:screenHeight }}>
            <NotificationOutlined style={{fontSize:'90px'}}/>
            <h1>Coming Soon</h1>
        </div>
    )
}

export default CS