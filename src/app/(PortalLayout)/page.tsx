"use clent";

import GameServerNotice from "@/components/home-components/GameServerNotice";
import LoginForm from "@/components/home-components/login-form";
import ServerInfor from "@/components/home-components/ServerInfor";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-amber-100 relative overflow-hidden">
      {/* Background image with overlay */}
      {/* <div className="fixed inset-0 z-0">
        <Image src="/images/background.png" alt="Game background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80"></div>
      </div> */}

      {/* Main content */}
      <div className="relative z-10">
        <div className="mx-auto px-4 py-8 bg-news relative overflow-hidden">
          {/* Video nền */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          >
            <source src="/video/QRcode.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>

          {/* Hiển thị QR Code*/}
          {/* <div className="absolute position-zalo">
            <div
              style={{
                minWidth: "7.5rem",
                maxWidth: "7.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: ".5rem 0 0",
                  fontSize: ".8125rem",
                  marginBottom: ".3125rem",
                }}
              >
                Quét QR code để gia nhập cộng đồng
              </p>
              <Image
                src="/img/zl-nhom.jpg"
                alt="Zalo"
                width={100}
                height={100}
                style={{ display: "block", borderRadius: ".3125rem" }} // Ensures image is centered and doesn't cause layout issues
              />

              <p style={{ margin: ".5rem 0 0", fontSize: ".8125rem" }}>
                Vào nhóm nhận GIFTCODE khủng
              </p>
            </div>
          </div> */}

          {/* <Row className="absolute left-0 right-0 justify-end main-banner-thong-tin">
            <Col className="server-info">
              <ServerInfor />
            </Col>
            <Col>
              <div className="play-button-container">
                <Link href="/auth/login" className="">
                  <div className="img-play-button flex justify-center items-center">
                    <Image
                      src="/img/start-game-CHOI-NGAY_487e4ae.png"
                      alt="Zalo"
                      width={300}
                      height={300}
                    />
                  </div>
                </Link>
              </div>
            </Col>
            <Col>
              <div className="login-form">
                <LoginForm />
              </div>
            </Col>
          </Row> */}
          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center game-container"></div> */}

          <div className="cha-main-layout-2 absolute bottom-0 py-10 left-0 right-0  text-white rounded-lg shadow-lg overflow-hidden">
          <div className="main-layout-2">
              <div className="">
              <Row gutter={8} align="bottom" style={{ minHeight: '320px' }}>
  <Col span={10} className="server-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    <Row gutter={12} style={{ flex: 1 }}>
      <Col span={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div className="border-zalo">
          <Image
            src="/img/zalo.jpg"
            alt="Zalo"
            width={300}
            height={300}
            className="logo-game"
          />
          <p style={{ margin: '.5rem 0 0', fontSize: '.8125rem' }}>
            Vào nhóm nhận GIFTCODE khủng
          </p>
        </div>
      </Col>

      <Col span={18} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <ServerInfor />
      </Col>
    </Row>
  </Col>

  <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    <div className="play-button-container" style={{ width: '100%' }}>
      <Link href="/auth/login" className="">
        <div className="img-play-button flex justify-center items-center">
          <Image
            src="/img/taiNgay.png"
            alt="Zalo"
            width={300}
            height={300}
          />
        </div>
      </Link>
    </div>
  </Col>

  <Col span={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    <LoginForm />
  </Col>
</Row>

           </div>

          </div>
          </div>
        </div>

        <div>
          <GameServerNotice />
        </div>
      </div>
    </main>
  );
}
