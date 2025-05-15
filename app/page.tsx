import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TimeZoneDemo } from "@/components/landing/time-zone-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Header */}
      <header>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span>TimeSync</span>
          </div>
          <div>
            <Link href="/dashboard">
              <Button>Synch your timezones</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div>
            <div>
              <div>
                <h1>
                  Stop Missing Meetings Across Timezones
                </h1>
                <p>
                  TimeSync helps teams across the globe find perfect meeting times. No more confusion, no more missed connecctions.
                </p>
                <div>
                  <Link href="/dashboard">
                    <Button>Try Demo</Button>
                  </Link>
                  <Button>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div>
                <TimeZoneDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Visuzlize Time Zones</h3>
              <p className="text-gray-500 dark:text-gray-400">
                See all your teams' timezones at a glance, with easy to understand visuals.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Find Optimal Meeting Times</h3>
              <p className="text-gray-500 dark:text-gray-400">Automatically find the best time for your team to meet, based on their timezones.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Share with Your Team</h3>
              <p className="text-gray-500 dark:text-gray-400">Send meeting invites that display in each recipient's local time.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 TimeSync
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A Portfolio project by Gerald M
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
