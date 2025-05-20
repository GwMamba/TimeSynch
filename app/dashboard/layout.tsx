import Link from 'next/link';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="font-bold text-xl">TimeSync</span>
          </Link>
          
          <nav className="flex gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/schedule">Schedule</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      
      <footer className="border-t p-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          TimeSync - Portfolio Project
        </div>
      </footer>
    </div>
  );
}
