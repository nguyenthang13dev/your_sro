import BannerGame from "@/components/home-components/BannerGame";
import GameServerNotice from "@/components/home-components/GameServerNotice";
import { LoginForm } from "@/components/home-components/login-form";
import RankingTable from "@/components/home-components/rank-mini";
import { Rankings } from "@/components/home-components/rankings";
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
        {/* Banner */}

        {/* News Section */}

        <div className="container mx-auto px-4 py-8 bg-news relative">
          {/* <NewsSection /> */}
          <div className="absolute position-zalo">
            <div
              style={{
                minWidth: "120px",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "13px",
                  marginBottom: "5px",
                }}
              >
                Quét QR code để gia nhập cộng đồng
              </p>
              <Image
                src="/img/zl-nhom.jpg"
                alt="Zalo"
                width={100}
                height={100}
                style={{ display: "block", borderRadius: "5px" }} // Ensures image is centered and doesn't cause layout issues
              />

              <p style={{ margin: "8px 0 0", fontSize: "13px" }}>
                Vào nhóm nhận GIFTCODE khủng
              </p>
            </div>
          </div>

          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center game-container">
            <div className="server-info">
              <ServerInfor />
            </div>
            <div className="relative align-center px-5 play-button-div">
              <div className="play-button-container">
                <Link href="/auth/login" className="btn-play">
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
            </div>
            <div className="login-form">
              <LoginForm />
            </div>
          </div> */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center game-container">
            <div className="server-info">
              <ServerInfor />
            </div>
            <div className="relative align-center px-5 play-button-div">
              <div className="play-button-container">
                <Link href="/auth/login" className="btn-play">
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
            </div>
            <div className="login-form">
              <LoginForm />
            </div>
          </div>
        </div>

        <div>
          <GameServerNotice />
        </div>

        {/* <div className="container mx-auto px-8 py-10 ">
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <div>
                <RankingTable />
              </div>
            </Col>

            <Col span={16}>
              <BannerGame />
            </Col>
          </Row>
        </div>
        <div className="container mx-auto px-8 py-10 ">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div>
                <Rankings />
              </div>
            </Col>
          </Row>
        </div> */}

        {/* Footer */}
      </div>
    </main>
  );
}
