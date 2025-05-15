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

      {/* Feature Section */}
      <section className="flex-1">

        <div className="container mx-auto px-4 py-12 md:py-24">
          <h1>
            Stop Wasting Time on Timezone Conflicts
          </h1>
          <p>
            TimeSync is a tool that helps you find the best time to meet with your team.
          </p>
          <div>
            <Link href="/dashboard">
              <Button>Synch your timezones</Button>
            </Link>
            <Button>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <div>
            <TimeZoneDemo />
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
