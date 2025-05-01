import GameServerNotice from "@/components/home-components/GameServerNotice"
import { LoginForm } from "@/components/home-components/login-form"
import { Rankings } from "@/components/home-components/rankings"
import ServerInfor from "@/components/home-components/ServerInfor"
import { Col, Row } from "antd"
import Image from "next/image"

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
          
           <div className="absolute bottom-10 left-0 ">
              <Image
                src="/img/zalo.png"
                alt="Zalo"
                width={300}
                height={200}
              />

            </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            {/* Zalo */}
           

            <div>
               <ServerInfor />
            </div>            
            {/* Nút Chơi Ngay - Thiết kế giống hình */}
           <div className="relative align-center px-5">
      <div className="play-button-container">
        <button className="play-button">
          <div className="play-button-content">
            <span className="diamond-decoration">◆</span>
            <span className="button-text">CHƠI GAME NGAY</span>
            <span className="diamond-decoration">◆</span>
          </div>
        </button>
      </div>
    </div>
            <LoginForm />

         
          </div>
          
          
          
        </div>

        
        
        
        <div>
          <GameServerNotice />
        </div>

            

        {/* Main Content Grid */}
        <div className="container mx-auto px-8 py-10 ">
        <Row gutter={[24, 24]}>
            {/* <Col span={12}>
                <ServerStatus />
            </Col>
          */}

            
            <Col span={12}>
                <div>
                <Rankings />
                </div>
            </Col>

          </Row>
        </div>

        {/* Footer */}
      </div>
    </main>
  )
}
