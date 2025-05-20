import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">TimeSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Try Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Stop Missing Meetings Across Time Zones
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                TimeSync helps teams across the globe find the perfect meeting times.
                No more confusion, no more missed connections.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard" className="inline-block px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Try Demo
                </Link>
                <Link href="#features" className="inline-block px-8 py-3 border rounded-md hover:bg-gray-50 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Current Time Across Time Zones</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded bg-gray-100">
                    <div>New York</div>
                    <div className="font-medium">Time here</div>
                  </div>
                  <div className="flex justify-between p-3 rounded bg-gray-100">
                    <div>London</div>
                    <div className="font-medium">Time here</div>
                  </div>
                  <div className="flex justify-between p-3 rounded bg-gray-100">
                    <div>Tokyo</div>
                    <div className="font-medium">Time here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Visualize Time Zones</h3>
              <p className="text-gray-500 dark:text-gray-400">
                See all your team's time zones at a glance, with easy-to-understand visuals.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Find Optimal Meeting Times</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Automatically discover the best times to meet that work for everyone.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Share with Your Team</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Send meeting invites that display in each recipient's local time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 TimeSync. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A portfolio project by [Your Name]
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
