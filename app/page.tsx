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
      <section>

        <div>
          <h1>
            Stop Wasting Time on Timezone Conflicts
          </h1>
          <p>
            TimeSync is a tool that helps you find the best time to meet with your team.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer>
        <div>
         <p>© 2025 TimeSync</p>
        </div>
      </footer>

    </div>
  );
}
