import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p>This is a simple dashboard for TimeSync.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">New York</h2>
          <div className="text-2xl">Current time here</div>
        </div>
        
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">London</h2>
          <div className="text-2xl">Current time here</div>
        </div>
        
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Tokyo</h2>
          <div className="text-2xl">Current time here</div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link href="/dashboard/schedule" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Schedule a Meeting
        </Link>
      </div>
    </div>
  );
}
