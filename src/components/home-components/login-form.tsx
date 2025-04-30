"use client"

import type React from "react"

import { Input } from "antd"
import Password from "antd/es/input/Password"
import { useState } from "react"
import './login.css'

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", username, password)
  }

  return (
    <div className="card-items bottom-0 absolute">
      <div className="game-panel-content body-card ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 form-items">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-amber-100 bg-white/10"
              placeholder="Tài khoản"
            />
          </div>
          <div className="flex items-center gap-2  form-items">
            <Password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-amber-100 passwod-input"
              placeholder="Nhân mật khẩu"
            />
          </div>

          <div className="flex items-center gap-2 form-items justify-between">
            <label htmlFor="remember" className="text-amber-200 w-24">
              <input type="checkbox" id="remember" className="mr-2" />
              Ghi nhớ tài khoản
            </label>

            <label>
              <a href="#" className="text-amber-200 hover:text-amber-300 transition-colors underline">
                Quên mật khẩu?
              </a>
            </label>
          </div>

          <div className="flex justify-center pt-2">
             <button type="submit" className="relative btn-submit absolute inset-0 flex items-center justify-center text-amber-300 text-xs font-medium border-2 border-amber-300 bg-amber-500 hover:bg-amber-600 hover:border-amber-400 transition-all duration-200 py-2 px-4 rounded-lg">
              <span className="btn">
                ĐĂNG NHẬP
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
