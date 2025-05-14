import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TimeZoneDemo } from "@/components/landing/time-zone-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Header */}
      <header>
        <div>
          <span>TimeSync</span>
        </div>
      </header>

      <section>

        <div>
          <h1>
            Stop Wasting Time on Timezone Conflicts
          </h1>
          <p>
            TimeSync is a tool that helps you find the best time to meet with your team.
          </p>
          <Button>
            Synch your timezones
          </Button>
        </div>

      </section>

      <footer>
        <div>
         <p>© 2025 TimeSync</p>
        </div>
      </footer>

    </div>
  );
}
