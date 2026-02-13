'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in-progress' | 'done';
  priority?: string;
}

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">In Progress</span>;
      case 'done':
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Done</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded-full">Backlog</span>;
    }
  };

  const inProgress = tasks.filter(t => t.status === 'in-progress');
  const backlog = tasks.filter(t => t.status === 'backlog');
  const recentDone = tasks.filter(t => t.status === 'done').slice(0, 3);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📋</span> Task Tracker
        </h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📋</span> Task Tracker
        <span className="ml-auto text-xs text-gray-500">{tasks.length} total</span>
      </h2>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-yellow-400 mb-2">🔄 Working On</h3>
          <div className="space-y-2">
            {inProgress.map(task => (
              <div key={task.id} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{task.title}</span>
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backlog */}
      {backlog.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">📥 Up Next</h3>
          <div className="space-y-2">
            {backlog.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{task.title}</span>
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
            {backlog.length > 3 && (
              <div className="text-xs text-gray-500 text-center">+{backlog.length - 3} more</div>
            )}
          </div>
        </div>
      )}

      {/* Recent Done */}
      {recentDone.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-green-400 mb-2">✅ Recently Done</h3>
          <div className="space-y-2">
            {recentDone.map(task => (
              <div key={task.id} className="p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 line-through">{task.title}</span>
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-gray-500 text-center py-8">No tasks tracked</div>
      )}
    </div>
  );
}
