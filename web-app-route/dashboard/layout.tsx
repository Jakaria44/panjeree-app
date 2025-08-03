"use client"

import { DashboardSidebar } from "@/components/features/dashboard/dashboard-sidebar"
import { Bell, Menu } from "lucide-react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <DashboardSidebar onLinkClick={() => setSheetOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        </header>
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 flex-1"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
