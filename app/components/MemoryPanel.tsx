'use client';

import { useState, useEffect } from 'react';

interface MemoryEntry {
  id: string;
  content: string;
  timestamp: string;
  type: 'note' | 'lesson' | 'task';
}

export function MemoryPanel() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemory();
    const interval = setInterval(fetchMemory, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchMemory = async () => {
    try {
      const res = await fetch('/api/memory');
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch memory:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '💡';
      case 'task': return '✅';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🧠</span> Memory
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
        <span>🧠</span> Today's Memory
      </h2>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No entries today</div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-start gap-2">
                <span>{getTypeIcon(entry.type)}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{entry.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{entry.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
