'use client';

import { useState, useEffect } from 'react';

interface ModelInfo {
  name: string;
  provider: string;
  status: 'active' | 'available' | 'offline';
}

interface CronJob {
  name: string;
  schedule: string;
  status: 'active' | 'paused';
}

interface Channel {
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Configuration data - in production this would come from API
  const models: ModelInfo[] = [
    { name: 'Claude Opus 4.5', provider: 'Anthropic', status: 'active' },
    { name: 'Kimi K2.5', provider: 'Moonshot', status: 'active' },
    { name: 'Kimi K2 Thinking', provider: 'Moonshot', status: 'available' },
    { name: 'Claude Sonnet 3.5', provider: 'Anthropic', status: 'available' },
    { name: 'Claude Haiku 3.5', provider: 'Anthropic', status: 'available' },
  ];

  const cronJobs: CronJob[] = [
    { name: 'Morning Briefing', schedule: '8:00 AM daily', status: 'active' },
    { name: 'Health Check', schedule: '10am & 4pm', status: 'active' },
    { name: 'Heartbeat Poll', schedule: 'Every 30min', status: 'active' },
    { name: 'Memory Backup', schedule: 'Daily 2am', status: 'active' },
    { name: 'Email Watch', schedule: 'Real-time', status: 'active' },
    { name: 'Update Check', schedule: 'Weekly', status: 'paused' },
  ];

  const channels: Channel[] = [
    { name: 'Telegram', type: 'Primary', status: 'connected' },
    { name: 'Discord', type: 'Community', status: 'connected' },
  ];

  const features = [
    'Auto Model Selection',
    'Memory Persistence',
    'Kanban Integration',
    'Browser Automation',
    'Skill System',
    'Cron Scheduling',
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OpenClaw — Personal AI Agent
            </h1>
            <p className="text-gray-400 mt-1">Full Configuration Overview</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-cyan-400">{currentTime.toLocaleTimeString()}</div>
            <div className="text-gray-500 text-sm">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="AI Models" value={models.length} icon="🧠" />
          <StatCard label="Cron Jobs" value={cronJobs.length} icon="⏰" />
          <StatCard label="Channels" value={channels.length} icon="📡" />
          <StatCard label="Session Life" value="365d" icon="♾️" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Model Stack */}
            <Section title="AI Model Stack" icon="🧠">
              <div className="space-y-2">
                {models.map((model, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-gray-500">{model.provider}</div>
                    </div>
                    <StatusBadge status={model.status} />
                  </div>
                ))}
              </div>
            </Section>

            {/* Automated Cron Jobs */}
            <Section title="Automated Cron Jobs" icon="⏰">
              <div className="grid grid-cols-2 gap-2">
                {cronJobs.map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div>
                      <div className="font-medium text-sm">{job.name}</div>
                      <div className="text-xs text-gray-500">{job.schedule}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${job.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Channels */}
            <Section title="Connected Channels" icon="📡">
              <div className="space-y-2">
                {channels.map((channel, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div>
                      <div className="font-medium">{channel.name}</div>
                      <div className="text-xs text-gray-500">{channel.type}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${channel.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {channel.status}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Key Features */}
            <Section title="Key Features" icon="⚡">
              <div className="flex flex-wrap gap-2">
                {features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                    {feature}
                  </span>
                ))}
              </div>
            </Section>

            {/* Claw Graphic */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 text-center">
              <div className="text-6xl mb-4">🦞</div>
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                OpenClaw
              </div>
              <div className="text-gray-500 text-sm mt-1">Personal AI Agent</div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-600">WINDOWS VPS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Components
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-2xl font-bold text-cyan-400">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    available: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    offline: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs border ${styles[status as keyof typeof styles] || styles.available}`}>
      {status}
    </span>
  );
}
