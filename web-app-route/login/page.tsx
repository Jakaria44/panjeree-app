"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { handleLogin } from "./actions"
import { GoogleIcon, FacebookIcon } from "@/components/shared/icons"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleLogin, null)

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
        <div className="bg-purple-600 text-white p-1 rounded-md">
          <X className="w-5 h-5" />
        </div>
        <span className="text-3xl">পাঞ্জেরী</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Log in to your account</h1>
        <p className="text-gray-600 mt-1">Welcome back! Please enter your details.</p>
      </div>

      <form action={formAction} className="w-full space-y-4">
        <Input name="phone" type="tel" placeholder="Enter your phone number" className="h-12 text-center" required />
        <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <div className="flex items-center w-full">
        <hr className="flex-grow border-gray-200" />
        <span className="px-4 text-sm text-gray-500">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <div className="w-full space-y-3">
        <Button variant="outline" className="w-full h-12 bg-white">
          <GoogleIcon className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full h-12 bg-white">
          <FacebookIcon className="w-5 h-5 mr-2" />
          Continue with Facebook
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium text-purple-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
