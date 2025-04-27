"use client";
import RegisterForm from "@/components/auth-components/RegisterForm";
import { Card, Col, Row } from "antd";
import React from "react";

const backgroundStyle = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed", // Giữ background cố định
    height: "100vh", // Đảm bảo trang có độ cao đầy đủ
};

const Register: React.FC = () => {
    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0px",
                    marginBottom: "20px" // Đẩy lên cao 
                }}>
                    <div style={{ width: "100px" }}>
                        {/* <Image
                            className="img-fluid"
                            src="/img/image1329quoc-huy-viet-nam.png"
                            alt="Logo"
                            preview={false} /> */}
                    </div>
                    <div style={{
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        fontWeight: 'bold',
                        fontSize: 25,
                        textTransform: 'uppercase',
                        lineHeight: 1.5,
                        marginLeft: "10px"
                    }}>
                        <div>SILKROAD2006</div>
                    </div>
                </div>
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={8}>
                        <Card className="custom-card">
                            <div className="my-4">
                                {/* <div className="text-center">
                                    <Image
                                        className="img-fluid"
                                        src='/img/logo-header-gov-removebg-preview.png'
                                        alt="Logo"
                                        preview={false}
                                    />
                                    </div> */}
                                <Row justify="center">
                                    <p style={{
                                        color: "rgb(76 88 94)",
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                        textTransform: 'uppercase',
                                        marginBottom: 0,
                                    }}>Đăng ký tài khoản</p>
                                </Row>
                                <Row justify="center">
                                    <div style={{
                                        width: "90%",
                                        height: "2px",
                                        backgroundColor: "rgba(76, 88, 94, 0.1)",
                                        marginTop: "10px"
                                    }}></div>
                                </Row>
                                <Row justify="center">
                                    <Col xs={24} sm={24} md={20} lg={20}>
                                        <RegisterForm />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Register;
