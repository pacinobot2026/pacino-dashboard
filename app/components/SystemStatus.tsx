'use client';

import { useState, useEffect } from 'react';

interface Service {
  name: string;
  status: 'online' | 'offline' | 'unknown';
  icon: string;
  detail?: string;
}

export function SystemStatus() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📡</span> System Status
        </h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📡</span> System Status
      </h2>
      
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
          >
            <div className="text-xl">{service.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{service.name}</div>
              {service.detail && (
                <div className="text-xs text-gray-500">{service.detail}</div>
              )}
            </div>
            <div className={`w-3 h-3 rounded-full ${getStatusStyle(service.status)}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
