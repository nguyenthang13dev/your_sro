import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/home-components/login-form"
import { ServerStatus } from "@/components/home-components/server-status"
import { NewsEvents } from "@/components/home-components/news-events"
import { Rankings } from "@/components/home-components/rankings"
import { UpcomingEvents } from "@/components/home-components/upcoming-events"
import { ItemShop } from "@/components/home-components/item-shop"
import { MainNavigation } from "@/components/home-components/main-navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-amber-100 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.png" alt="Game background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <MainNavigation />

        {/* Hero Section with Character */}
        <div className="relative flex justify-center items-center py-8">
          <Image
            src="/images/hero-character.png"
            alt="Hero character"
            width={500}
            height={400}
            className="absolute z-10"
          />

          {/* Main Action Buttons */}
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 pt-[300px] md:pt-[350px]">
            <Link href="/download" className="game-button w-full md:w-auto">
              <Image src="/images/button-bg.png" alt="Button background" width={200} height={60} className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-amber-300 font-bold text-xl">
                TẢI GAME
              </span>
            </Link>

            <Link href="/shop" className="game-button w-full md:w-auto">
              <Image src="/images/button-bg.png" alt="Button background" width={200} height={60} className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-amber-300 font-bold text-xl">
                WEB SHOP
              </span>
            </Link>

            <Link href="/register" className="game-button w-full md:w-auto">
              <Image src="/images/button-bg.png" alt="Button background" width={200} height={60} className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-amber-300 font-bold text-xl">
                ĐĂNG KÝ
              </span>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ServerStatus />
            <UpcomingEvents />
            <ItemShop />
          </div>

          {/* Center Column */}
          <div>
            <LoginForm />
            <NewsEvents />
          </div>

          {/* Right Column */}
          <div>
            <Rankings />
          </div>
        </div>

        {/* Bottom Character */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="/images/bottom-character.png"
            alt="Warrior character"
            width={500}
            height={400}
            className="absolute bottom-0 left-0"
          />
        </div>
      </div>
    </main>
  )
}
