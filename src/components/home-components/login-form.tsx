"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Input } from "antd"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", username, password)
  }

  return (
    <div className="game-panel mb-6">
      <div className="game-panel-header">
        <h2 className="text-center text-amber-300 font-bold text-lg">ĐĂNG NHẬP</h2>
      </div>
      <div className="game-panel-content p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="username" className="text-amber-200 w-24">
              TÀI KHOẢN:
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/50 border-amber-900 text-amber-100 focus:border-amber-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="password" className="text-amber-200 w-24">
              MẬT KHẨU:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-amber-900 text-amber-100 focus:border-amber-500"
            />
          </div>
          <div className="flex justify-center pt-2">
            <button type="submit" className="relative game-button">
              <Image src="/images/button-bg.png" alt="Login button" width={150} height={40} />
              <span className="absolute inset-0 flex items-center justify-center text-amber-300 font-bold">
                ĐĂNG NHẬP
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
