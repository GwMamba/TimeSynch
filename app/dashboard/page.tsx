import { TimeZoneManager } from "@/components/dashboard/timezone-manager";

export default function DashboardPage() {
  return (
    <div>
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
    </div>
    <TimeZoneManager />
    </div>
  )
}