import React from 'react'
import Link from "next/link";
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      // Here you would typically handle the login logic
      console.log('Login attempted:', formData)
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/clouds-background.jpg')",
        }}
      >
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-[#e8604c]">Chào Mừng Trở Lại</CardTitle>
        <CardDescription className="text-center">
          Nhập thông tin đăng nhập để truy cập tài khoản của bạn
        </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
            value={formData.email}
            onChange={handleInputChange}
          />
          </div>
          <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mật khẩu</Label>
          <div className="relative">
            <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
            value={formData.password}
            onChange={handleInputChange}
            />
            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          </div>
          <Button type="submit" className="w-full bg-[#e8604c] hover:bg-[#d55643] text-white">
          Đăng nhập
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">hoặc</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          type="button" 
          className="w-full"
          onClick={() => {
          // Add Google sign-in logic here
          console.log('Google sign-in clicked')
          }}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          </svg>
          Đăng nhập với Google
        </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
        <Button variant="link" className="text-[#e8604c] hover:text-[#d55643]">
          Quên mật khẩu?
        </Button>
        <p className="text-sm text-center text-gray-600">
          Bạn chưa có tài khoản?{' '}
          <Link href="/signup">
          <Button variant="link" className="p-0 text-[#e8604c] hover:text-[#d55643]">
            Đăng ký
          </Button>
          </Link>
        </p>
        </CardFooter>
      </Card>
      </div>
    )
}

