import { TimeZoneManager } from "@/components/dashboard/timezone-manager";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
    <div className="flex flex-col gap-4 md:flex-row md: items-center md:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">
        Dashboard
      </h1>
    </div>
    <TimeZoneManager />
    </div>
  )
}