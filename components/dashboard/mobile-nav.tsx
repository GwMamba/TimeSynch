"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 bg-background border-b p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/meeting"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline"
            >
              Meetings
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}