'use client';

import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'video', label: 'Video Board', icon: '🎬', href: 'https://vizard-clips-app.vercel.app/dashboard' },
  { id: 'articles', label: 'Article Board', icon: '📰', href: 'https://vizard-clips-app.vercel.app/articles' },
  { id: 'ideas', label: 'Idea Board', icon: '💡', href: 'https://vizard-clips-app.vercel.app/ideas' },
  { id: 'bookmarks', label: 'Bookmarks', icon: '📑', href: 'https://vizard-clips-app.vercel.app/bookmarks' },
  { id: 'shopping', label: 'Shopping/Watch', icon: '🛒', href: 'https://vizard-clips-app.vercel.app/shopping' },
  { id: 'projects', label: 'Projects', icon: '📂', href: 'https://vizard-clips-app.vercel.app/projects' },
  { id: 'control', label: 'Command Center', icon: '🎛️', href: 'https://dashboard-gilt-one-zc4y5uu95v.vercel.app' },
  { id: 'team', label: 'Team Board', icon: '👥', href: 'https://kanban-rho-ivory.vercel.app' },
  { id: 'openclaw', label: 'OpenClaw Board', icon: '🤖', href: 'https://vizard-clips-app.vercel.app/openclaw' },
];

export function NavigationSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div 
      className={`min-h-screen h-full bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-48' : 'w-14'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ minHeight: '100vh', background: '#111827', borderRight: '1px solid #1f2937' }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 text-gray-400 hover:text-white transition-colors"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>

      {/* Nav Items */}
      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="relative flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group"
            style={{
              background: currentPath === item.href ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
              borderRight: currentPath === item.href ? '2px solid #8b5cf6' : 'none'
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Icon */}
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            
            {/* Label - shown when expanded */}
            {isExpanded && (
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}

            {/* Tooltip - shown when collapsed and hovered */}
            {!isExpanded && hoveredItem === item.id && (
              <div style={{
                position: 'absolute',
                left: '100%',
                marginLeft: '8px',
                padding: '8px 12px',
                background: '#1f2937',
                color: '#fff',
                fontSize: '14px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                zIndex: 50,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #374151'
              }}>
                {item.label}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translate(-4px, -50%)',
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderRight: '4px solid #1f2937'
                }} />
              </div>
            )}
          </a>
        ))}
      </nav>

      {/* Logo/Bottom */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xl flex-shrink-0">🎬</span>
          {isExpanded && (
            <span className="text-sm font-bold text-white whitespace-nowrap overflow-hidden">Pacino</span>
          )}
        </div>
      </div>
    </div>
  );
}
