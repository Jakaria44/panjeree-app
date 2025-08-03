"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { handleProfileUpdate } from "./actions"

export default function CompleteProfilePage() {
  const [state, formAction, isPending] = useActionState(handleProfileUpdate, null)

  return (
    <div className="flex flex-col items-center text-center space-y-6 bg-white p-8 rounded-lg shadow-sm">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
        <div className="bg-purple-600 text-white p-1 rounded-md">
          <X className="w-5 h-5" />
        </div>
        <span className="text-3xl">পাঞ্জেরী</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finish setting up your account</h1>
      </div>

      <form action={formAction} className="w-full space-y-4 text-left">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue="Muhidul Hasan" className="h-11 mt-1" required />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select name="level" defaultValue="hsc-25">
            <SelectTrigger id="level" className="h-11 mt-1">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ssc-25">SSC 25</SelectItem>
              <SelectItem value="hsc-25">HSC 25</SelectItem>
              <SelectItem value="hsc-26">HSC 26</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="version">Version</Label>
          <Select name="version" defaultValue="english">
            <SelectTrigger id="version" className="h-11 mt-1">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangla">Bangla</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="batch">Batch</Label>
          <Select name="batch" defaultValue="2025">
            <SelectTrigger id="batch" className="h-11 mt-1">
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 mt-4" disabled={isPending}>
          {isPending ? "Saving..." : "Continue"}
        </Button>
      </form>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
    </div>
  )
}
