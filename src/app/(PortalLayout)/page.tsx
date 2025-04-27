import { LoginForm } from "@/components/home-components/login-form"
import NewsSection from "@/components/home-components/NewsSection"
import { Rankings } from "@/components/home-components/rankings"
import ServerStatus from "@/components/home-components/server-status"
import { Col, Row } from "antd"
import Link from "next/link"

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

        
        <div className="container mx-auto px-4 py-8 bg-news mb-10">
              <NewsSection />
              {/* Hero Section with Character */}
          <div className="container relative">
            <hr />
              {/* Main Action Buttons */}
              <div className="container flex justify-around items-center flex-row ">
                {/* Section 1: Hướng dẫn nạp Silk */}
                <div className="relative block-item__banner bg-guide">
                  <Link href="/guide" className="game-button w-full md:w-auto bounce-text">
                    HƯỚNG DẪN NẠP SILK
                  </Link>
                </div>

                {/* Section 2: Lịch hoạt động sự kiện */}
                <div className="relative block-item__banner bg-schedule">
                  <Link href="/schedule" className="game-button w-full md:w-auto text-schedule text-glow bounce-text">
                    LỊCH HOẠT ĐỘNG SỰ KIỆN
                  </Link>
                </div>

                {/* Section 3: Cắm năng tần thù */}
                <div className="relative block-item__banner bg-energy">
                  <Link href="/energy" className="game-button w-full md:w-auto text-energy text-glow bounce-text">
                    CẮM NĂNG TẦN THÙ
                  </Link>
                </div>

                {/* Section 4: FAQ */}
                <div className="relative block-item__banner bg-faq">
                  <Link href="/faq" className="game-button w-full md:w-auto text-faq text-glow bounce-text">
                    FAQ
                  </Link>
                </div>
              </div>
      </div>

        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-8 py-10 ">
        <Row gutter={[24, 24]}>
            <Col span={8}>
                <ServerStatus />
            </Col>
            <Col span={8}>
             <div>
            <LoginForm />
          </div>
            
            </Col>

            
            <Col span={8}>
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
