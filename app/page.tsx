'use client';

import { useState, useEffect } from 'react';
import { ActivityFeed } from './components/ActivityFeed';
import { SystemStatus } from './components/SystemStatus';
import { TaskTracker } from './components/TaskTracker';
import { MemoryPanel } from './components/MemoryPanel';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎬</div>
          <div>
            <h1 className="text-2xl font-bold">Pacino Dashboard</h1>
            <p className="text-gray-400 text-sm">Real-time AI agent activity</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</div>
          <div className="text-gray-400 text-sm">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityFeed />
          <TaskTracker />
        </div>

        {/* Right Column - Status & Memory */}
        <div className="space-y-6">
          <SystemStatus />
          <MemoryPanel />
        </div>
      </div>
    </main>
  );
}
