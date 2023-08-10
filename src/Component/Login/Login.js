// import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
// import { Button, Input, Space } from 'antd';

// import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../Css/Login.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Col, Row } from 'antd';

import { Form, Input, Button, Checkbox, Card, Carousel } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = ({ notification }) => {

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const history = new useHistory();
    const contentStyle = {
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            notification('success', 'Login success !')
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    const onFinish = async (values) => {
        // console.log('Saved:', values);
        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
            notification('success', 'Login success !')
            history.push("/")
        } catch (error) {
            console.log(error)
            notification('error', "Email or password incorrect")
            // notification("error", "Login failed! Please check your Email and Password!")
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
        <div >
            <div style={{ opacity: 0.5, position: 'relative' }}>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={{ width: '100%', minHeight: '800px' }} src='https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-game-4k-1.jpg' />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={{ width: '100%', minHeight: '800px' }} src='https://gameviet.mobi/wp-content/uploads/2020/03/Hinh-Nen-Lien-Quan-Mobile-Wallpaper-Cho-Iphone-Android-1280x640.jpg' />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={{ width: '100%', minHeight: '800px' }} src='https://demoda.vn/wp-content/uploads/2022/10/hinh-nen-game-4k.jpg' />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={{ width: '100%', minHeight: '800px' }} src='https://allimages.sgp1.digitaloceanspaces.com/tipeduvn/2022/09/1662058151_20_Top-hinh-nen-game-dep-chat-luong-full-HD-khong.jpg' />
                        </h3>
                    </div>
                </Carousel>
            </div>

            <div className='card-container'
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: '0',
                    left: '0',
                    bottom: '0',
                    right: '0',

                }}>

                <Card style={{ minWidth: 390 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1 style={{ color: 'white', fontSize: 40 }}>Login</h1>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <a
                            style={{ float: "right", fontWeight: 'bold' }}
                            className="login-form-forgot"
                            href="#"
                        // onClick={handleForgotPassword}
                        >
                            Forgot password
                        </a>
                        {/* </Form.Item> */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ color: 'black !important', fontWeight: 'bold', }}>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            {/* <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/signup")} ghost>
           Sign up
         </Button> */}

                            <Row>
                                <Col span={8}>
                                    <a type="primary" style={{ marginTop: 10, color: 'black', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
                                        Google
                                    </a>
                                </Col>
                                <Col span={8}>
                                    <p style={{ marginTop: 10, color: 'black', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
                                <Col span={8}>
                                    <a type="primary" style={{ marginTop: 10, color: 'black', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/signup")}>
                                        Sign up
                                    </a>
                                </Col>

                            </Row>

                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
        // <div style={{ height: screenHeight - 70 }}>

        //     <Form
        //         name="basic"
        //         // labelCol={{
        //         //   span: 8,
        //         // }}
        //         style={{
        //             width: '100%',
        //             padding: '0 30px',
        //             height: '600px'
        //         }}
        //         initialValues={{
        //             remember: true,
        //         }}
        //         onFinish={onFinish}
        //         onFinishFailed={onFinishFailed}
        //         autoComplete="off"
        //     >
        //         <div style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //             <Form.Item
        //                 label="Email"
        //                 name="email"
        //                 style={{
        //                     display: 'flex',
        //                     justifyContent: 'space-around',
        //                     alignItems: 'center'
        //                 }}
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your email!',
        //                     },
        //                 ]}
        //             >
        //                 <Input style={{ width: '250px' }} />
        //             </Form.Item>

        //             <Form.Item
        //                 label="Password"
        //                 name="password"
        //                 style={{
        //                     display: 'flex',
        //                     justifyContent: 'space-around',
        //                     alignItems: 'center'
        //                 }}
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your password!',
        //                     },
        //                 ]}>
        //                 <Input.Password style={{ width: '300px' }} />
        //             </Form.Item>

        //             <Form.Item style={{
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center'
        //             }}
        //                 name="remember"
        //                 valuePropName="checked">
        //                 <Checkbox>Auto login</Checkbox>
        //             </Form.Item>
        //         </div>


        //         <Form.Item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        //             <Button type="primary" htmlType="submit">
        //                 Login
        //             </Button>
        //             {/* <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/signup")} ghost>
        //   Sign up
        // </Button> */}

        //             <Row>
        //                 <Col span={8}>
        //                     <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
        //                         Google
        //                     </a>
        //                 </Col>
        //                 <Col span={8}>
        //                     <p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
        //                 <Col span={8}>
        //                     <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/signup")}>
        //                         Sign up
        //                     </a>
        //                 </Col>

        //             </Row>

        //         </Form.Item>
        //     </Form>
        // </div>
    )
}


// const Login = () => {
//     const [passwordVisible, setPasswordVisible] = React.useState(false);
//     return (
//         <Space direction="vertical">

//             <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
//             <Input.Password
//                 placeholder="Mật khẩu"
//                 iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//             />
//         </Space>
//     );
// };

export default Login;