import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const {login, isLoading, error} = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit =  async (e) => {
    e.preventDefault()
    await login(formData)
    navigate("/")
  }



  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-center">Login to your Account</CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription className="text-center">Enter your information to get started</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>
              {error && <p className="text-red-500 text-sm"> {error}</p>}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading? "Loading...": "Login"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter>
            <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 w-full">
              Do not have an account??{" "}
              <motion.a
                href="/signup"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
                whileHover={{ scale: 1.05 }}
              >
                Sign up
              </motion.a>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
