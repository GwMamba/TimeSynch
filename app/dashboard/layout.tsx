import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-xl font-bold">
                TimeSync
              </span>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/dashboard/meetings" className="text-sm font-medium hover:underline">
              Meetings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">Your Name</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto">
          <p className="text-center text-sm text-gray-500">
            TimeSync Dashboard = Portfolio Project
          </p>
        </div>
      </footer>
    </div>
  )
}