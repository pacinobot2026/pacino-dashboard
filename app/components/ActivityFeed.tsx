'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  type: 'tool' | 'message' | 'file' | 'deploy' | 'api';
  action: string;
  detail: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activity');
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tool': return '🔧';
      case 'message': return '💬';
      case 'file': return '📄';
      case 'deploy': return '🚀';
      case 'api': return '🌐';
      default: return '⚡';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500 animate-pulse';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>⚡</span> Activity Feed
        </h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>⚡</span> Activity Feed
        <span className="ml-auto text-xs text-gray-500">Live</span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No recent activity</div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="text-xl">{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.action}</span>
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                </div>
                <p className="text-gray-400 text-sm truncate">{activity.detail}</p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {activity.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
