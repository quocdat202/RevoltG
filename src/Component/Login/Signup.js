import { useEffect, useState } from 'react'
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../../Css/Login.css'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Carousel, Form, Input, Card } from 'antd';
import { Col, Row } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";



const Signup = ({ notification, setReload }) => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

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
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    const history = new useHistory();

    const onFinish = async (value) => {
        console.log('Saved:', value);
        if (value?.password.length < 6) {
            notification('error', 'Password must be atleast 6 characters!')
            return false;
        }
        else if (value?.confirmPassword !== value?.password) {
            notification('error', 'Password does not match!')
            return false;
        } else {
            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);

                // Cập nhật thông tin người dùng với tên đăng nhập
                await result.user.updateProfile({
                    displayName: value?.username,
                    // photoURL
                });

                notification('success', 'Signed up successfully!')
                history.push("/")
                setReload(true)
            } catch (error) {
                notification('error', error.message)
                // console.log(error.message);
            }
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

                <Card style={{ width: 500 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1 style={{ color: 'white', fontSize: 40 }}>Signup</h1>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Enter input your username"
                            />
                        </Form.Item>

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
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Enter input your email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}

                        >

                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter input your password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your confirm password!',
                                },
                            ]}

                        >

                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter confirm your password" />

                        </Form.Item>



                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
                                Sign up
                            </Button>
                            {/* <Button type="primary" icon={<ArrowLeftOutlined />} style={{ marginTop: 10 }} onClick={() => history.push("/login")} ghost>
                         Back
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
                                    <a type="primary" style={{ marginTop: 10, color: 'black', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/login")}>
                                        Login
                                    </a>
                                </Col>

                            </Row>

                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
        //     <div style={{height: screenHeight -70}}>
        //         <Form
        //             name="basic"
        //             labelCol={{
        //                 span: 8,
        //             }}
        //             wrapperCol={{
        //                 span: 16,
        //             }}
        //             style={{
        //                 maxWidth: 550,
        //             }}
        //             initialValues={{
        //                 remember: true,
        //             }}
        //             onFinish={onFinish}
        //             onFinishFailed={onFinishFailed}
        //             autoComplete="off"
        //         >
        //             <Form.Item
        //                 label="Username"
        //                 name="username"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your username!',
        //                     },
        //                 ]}
        //             >
        //                 <Input />
        //             </Form.Item>

        //             <Form.Item
        //                 label="Password"
        //                 name="password"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your password!',
        //                     },
        //                 ]}

        //             >

        //                 <Input.Password />
        //             </Form.Item>

        //             <Form.Item
        //                 label="Confirm password"
        //                 name="confirmPassword"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your confirm password!',
        //                     },
        //                 ]}

        //             >

        //                 <Input.Password />
        //             </Form.Item>

        //             <Form.Item
        //                 label="Email"
        //                 name="email"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your email!',
        //                     },
        //                 ]}
        //             >
        //                 <Input />
        //             </Form.Item>

        //             {/* <Form.Item
        //                 label="Phone number"
        //                 name="sdt"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your phone number!',
        //                     },
        //                 ]}
        //             >
        //                 <Input />
        //             </Form.Item> */}

        //             {/* <Form.Item
        //   name="remember"
        //   valuePropName="checked"
        //   wrapperCol={{
        //     offset: 8,
        //     span: 16,
        //   }}
        // >
        //   <Checkbox>Auto log in</Checkbox>
        // </Form.Item> */}

        //             <Form.Item
        //                 wrapperCol={{
        //                     offset: 8,
        //                     span: 16,
        //                 }}
        //             >
        //                 <Button type="primary" htmlType="submit">
        //                     Sign up
        //                 </Button>
        //                 {/* <Button type="primary" icon={<ArrowLeftOutlined />} style={{ marginTop: 10 }} onClick={() => history.push("/login")} ghost>
        //                 Back
        //             </Button> */}
        //                 <Row>

        //                     <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
        //                         Google
        //                     </a></Col>
        //                     <Col span={8}><p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
        //                     <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/login")}>
        //                         Login
        //                     </a></Col>

        //                 </Row>
        //             </Form.Item>
        //         </Form>
        //     </div>
    )

}


export default Signup;