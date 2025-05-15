import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header>
        <div>
          <div>
            <Link>
              <span>
                TimeSync
              </span>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div>
            <MobileNav />
          </div>

          {/* Desktop Nav */}
          <nav>
            <Link>
              Dashboard
            </Link>
            <Link>
              Meetings
            </Link>
          </nav>

          <div>
            <ThemeToggle />
            <Button>Your Name</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div>
          {children}
        </div>
      </main>

      
    </div>
  )
}