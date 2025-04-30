import GameServerNotice from "@/components/home-components/GameServerNotice"
import { LoginForm } from "@/components/home-components/login-form"
import { Rankings } from "@/components/home-components/rankings"
import ServerStatus from "@/components/home-components/server-status"
import { Col, Row } from "antd"

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

        
        <div className="container mx-auto px-4 py-8 bg-news ">
              {/* <NewsSection /> */}
        
          
  <Col span={8}>
             <div>
            <LoginForm />
          </div>
            
        </Col>
        </div>

        
        
        
        <div>
          <GameServerNotice />
        </div>

            

        {/* Main Content Grid */}
        <div className="container mx-auto px-8 py-10 ">
        <Row gutter={[24, 24]}>
            <Col span={12}>
                <ServerStatus />
            </Col>
         

            
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
