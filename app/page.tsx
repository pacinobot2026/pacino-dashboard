'use client';

import { useState, useEffect, useRef } from 'react';

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

interface ApiKey {
  provider: string;
  status: 'connected' | 'missing';
  masked: string;
}

interface Task {
  title: string;
  status: 'backlog' | 'in-progress' | 'done';
  priority?: 'high' | 'med' | 'low';
}

interface ApiSpend {
  provider: string;
  spent: number;
  limit: number;
  percent: number;
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);
      countRef.current = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
}

// Animated money counter
function useAnimatedMoney(end: number, duration: number = 2000) {
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = end * easeOutQuart;
      
      setAmount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return amount;
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // API Keys - AI Providers
  const aiApiKeys: ApiKey[] = [
    { provider: 'Anthropic', status: 'connected', masked: 'sk-ant-•••••hKTgAA' },
    { provider: 'Moonshot', status: 'connected', masked: 'sk-•••••3Kx9' },
    { provider: 'OpenAI', status: 'connected', masked: 'sk-•••••Qw2m' },
  ];

  // API Keys - 3rd Party Integrations
  const integrationKeys: ApiKey[] = [
    { provider: 'Zoom', status: 'connected', masked: 'eyJ•••••Rk2' },
    { provider: 'Vimeo', status: 'connected', masked: '8f3•••••a91' },
    { provider: 'MintBird / PopLinks', status: 'connected', masked: 'z12•••••huW' },
    { provider: 'Global Control', status: 'connected', masked: 'gc-•••••x7k' },
    { provider: 'Course Sprout', status: 'connected', masked: 'cs-•••••m3p' },
    { provider: 'Letterman', status: 'connected', masked: 'lm-•••••q2n' },
    { provider: 'SaaSOnboard', status: 'connected', masked: 'sob-•••••f4j' },
    { provider: 'AgentMail', status: 'connected', masked: 'am-•••••k8w' },
  ];

  // API Spend tracking
  const apiSpend: ApiSpend[] = [
    { provider: 'Anthropic', spent: 12.47, limit: 50, percent: 25 },
    { provider: 'Moonshot', spent: 3.20, limit: 20, percent: 16 },
    { provider: 'OpenAI', spent: 1.85, limit: 10, percent: 19 },
  ];

  // Tasks from Kanban
  const tasks: Task[] = [
    { title: 'OpenClaw containers (Gaurav & Pranay)', status: 'backlog', priority: 'high' },
    { title: 'Brian Anderson NDA offer', status: 'backlog', priority: 'high' },
    { title: 'OpenClaw ads', status: 'backlog', priority: 'high' },
    { title: 'OpenClaw webinar', status: 'in-progress', priority: 'high' },
    { title: 'JV script for Zoo launch', status: 'backlog', priority: 'med' },
    { title: 'Model switching command', status: 'done' },
    { title: 'Dashboard redesign', status: 'done' },
  ];

  // Configuration data
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

  const tasksByStatus = {
    backlog: tasks.filter(t => t.status === 'backlog'),
    inProgress: tasks.filter(t => t.status === 'in-progress'),
    done: tasks.filter(t => t.status === 'done'),
  };

  // Animated counters
  const modelCount = useAnimatedCounter(models.length);
  const integrationCount = useAnimatedCounter(integrationKeys.length);
  const cronCount = useAnimatedCounter(cronJobs.length);
  const channelCount = useAnimatedCounter(channels.length);
  const totalSpend = useAnimatedMoney(17.52);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8 overflow-hidden">
      {/* Animated background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto relative">
        <div className={`flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-300%">
              OpenClaw — Personal AI Agent
            </h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Full Configuration Overview</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-xl md:text-2xl font-mono text-cyan-400 tabular-nums animate-pulse">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-gray-500 text-xs md:text-sm">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Bar - Mobile Responsive */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard label="AI Models" value={modelCount} icon="🧠" delay={0} />
          <StatCard label="Integrations" value={integrationCount} icon="🔌" delay={100} />
          <StatCard label="Cron Jobs" value={cronCount} icon="⏰" delay={200} />
          <StatCard label="Channels" value={channelCount} icon="📡" delay={300} />
          <StatCard label="Session Life" value="365d" icon="♾️" delay={400} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Keys Connected (AI Providers Only) */}
            <Section title="AI API Keys" icon="🔑" delay={300}>
              <div className="space-y-2">
                {aiApiKeys.map((key, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${key.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium">{key.provider}</div>
                        <div className="text-xs text-gray-500 font-mono">{key.masked}</div>
                      </div>
                    </div>
                    <StatusBadge status={key.status} />
                  </div>
                ))}
              </div>
            </Section>

            {/* API Spend */}
            <Section title="API Spend (This Month)" icon="💰" delay={400}>
              <div className="space-y-3">
                {apiSpend.map((spend, i) => (
                  <AnimatedSpendBar key={i} spend={spend} delay={i * 200} />
                ))}
                <div className="text-right text-sm text-gray-400 pt-2 border-t border-gray-700">
                  Total: <span className="text-cyan-400 font-medium">${totalSpend.toFixed(2)}</span> / $80.00
                </div>
              </div>
            </Section>

            {/* AI Model Stack */}
            <Section title="AI Model Stack" icon="🧠" delay={500}>
              <div className="space-y-2">
                {models.map((model, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] animate-fadeIn"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
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
            <Section title="Automated Cron Jobs" icon="⏰" delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {cronJobs.map((job, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div>
                      <div className="font-medium text-sm">{job.name}</div>
                      <div className="text-xs text-gray-500">{job.schedule}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${job.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tasks */}
            <Section title="Tasks" icon="📋" delay={350}>
              <div className="space-y-4">
                {/* In Progress */}
                {tasksByStatus.inProgress.length > 0 && (
                  <div>
                    <div className="text-xs text-yellow-400 font-medium mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span> In Progress ({tasksByStatus.inProgress.length})
                    </div>
                    {tasksByStatus.inProgress.map((task, i) => (
                      <TaskItem key={i} task={task} />
                    ))}
                  </div>
                )}
                
                {/* Backlog */}
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span> Backlog ({tasksByStatus.backlog.length})
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {tasksByStatus.backlog.slice(0, 5).map((task, i) => (
                      <TaskItem key={i} task={task} />
                    ))}
                    {tasksByStatus.backlog.length > 5 && (
                      <div className="text-xs text-gray-500 pl-2">+{tasksByStatus.backlog.length - 5} more...</div>
                    )}
                  </div>
                </div>

                {/* Done */}
                <div>
                  <div className="text-xs text-green-400 font-medium mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Done ({tasksByStatus.done.length})
                  </div>
                  {tasksByStatus.done.slice(0, 3).map((task, i) => (
                    <TaskItem key={i} task={task} />
                  ))}
                </div>
              </div>
            </Section>

            {/* Channels */}
            <Section title="Connected Channels" icon="📡" delay={450}>
              <div className="space-y-2">
                {channels.map((channel, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
                    <div>
                      <div className="font-medium">{channel.name}</div>
                      <div className="text-xs text-gray-500">{channel.type}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${channel.status === 'connected' ? 'bg-green-500/20 text-green-400 animate-pulse' : 'bg-red-500/20 text-red-400'}`}>
                      {channel.status}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 3rd Party Integrations */}
            <Section title="3rd Party Integrations" icon="🔌" delay={550}>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {integrationKeys.map((key, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${key.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium text-sm">{key.provider}</div>
                        <div className="text-xs text-gray-500 font-mono">{key.masked}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Key Features */}
            <Section title="Key Features" icon="⚡" delay={650}>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400 hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Section>

            {/* Claw Graphic */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 text-center hover:border-cyan-500/30 transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '700ms' }}>
              <div className="text-6xl mb-4 animate-bounce">🦞</div>
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

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </main>
  );
}

// Components
function StatCard({ label, value, icon, delay }: { label: string; value: string | number; icon: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-xl md:text-2xl">{icon}</div>
        <div>
          <div className="text-xl md:text-2xl font-bold text-cyan-400 tabular-nums">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children, delay }: { title: string; icon: string; children: React.ReactNode; delay: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    available: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    offline: 'bg-red-500/20 text-red-400 border-red-500/30',
    connected: 'bg-green-500/20 text-green-400 border-green-500/30',
    missing: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs border ${styles[status] || styles.available} transition-all duration-300`}>
      {status}
    </span>
  );
}

function TaskItem({ task }: { task: Task }) {
  const priorityColors: Record<string, string> = {
    high: 'text-red-400',
    med: 'text-yellow-400',
    low: 'text-gray-400',
  };
  
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded text-sm hover:bg-gray-800/50 transition-all duration-300">
      <span className={task.status === 'done' ? 'line-through text-gray-500' : ''}>
        {task.title}
      </span>
      {task.priority && (
        <span className={`text-xs ${priorityColors[task.priority]}`}>
          [{task.priority}]
        </span>
      )}
    </div>
  );
}

function AnimatedSpendBar({ spend, delay }: { spend: ApiSpend; delay: number }) {
  const [width, setWidth] = useState(0);
  const animatedSpent = useAnimatedMoney(spend.spent, 2000 + delay);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(spend.percent);
    }, 500 + delay);
    return () => clearTimeout(timer);
  }, [spend.percent, delay]);

  return (
    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{spend.provider}</span>
        <span className="text-sm">
          <span className="text-cyan-400 tabular-nums">${animatedSpent.toFixed(2)}</span>
          <span className="text-gray-500"> / ${spend.limit.toFixed(2)}</span>
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
