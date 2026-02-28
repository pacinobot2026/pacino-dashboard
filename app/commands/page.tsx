'use client';

import { useState } from 'react';
import { NavigationSidebar } from '../components/NavigationSidebar';

interface Command {
  name: string;
  category: 'email' | 'content' | 'links' | 'contacts' | 'system';
  description: string;
  steps: string[];
  shortcut?: string;
}

const commands: Command[] = [
  {
    name: '/broadcast',
    category: 'email',
    description: 'Create and send broadcast email via Global Control',
    steps: [
      'Ask what email is about',
      'Rewrite content + create subject/pre-header',
      'Create PopLink for URL',
      'ASK: Re-engage inactives? (YES/NO)',
      'YES → Pull from GC segments (Inactive→New→Passive→Dead)',
      'NO → Send test → Wait for "send it"'
    ],
    shortcut: 'Type "/broadcast" or say "write me an email"'
  },
  {
    name: '/reactivation',
    category: 'email',
    description: 'Long-term progressive campaign from CSV file',
    steps: [
      'Ask how many contacts',
      'Ask pace (Mild/Normal/Aggressive)',
      'Upload CSV/XLS file',
      'Verify emails (EmailListVerify)',
      'Choose GC tag + workflow',
      'Progressive daily sending via cron'
    ]
  },
  {
    name: '/replay',
    category: 'content',
    description: 'Create Course Sprout lesson from Vimeo video',
    steps: [
      'Ask for Vimeo URL',
      'Download transcript',
      'Create lesson with descriptions',
      'Add goal block (10 pts, comments)'
    ]
  },
  {
    name: '/article',
    category: 'content',
    description: 'Create Letterman article',
    steps: [
      'Ask: Blank or AI-generated?',
      'Ask: Local or Niche?',
      'Ask: Word count',
      'Generate image if needed',
      'Create as DRAFT (never auto-publish)'
    ]
  },
  {
    name: '/poplink',
    category: 'links',
    description: 'Create shortened PopLink',
    steps: [
      'User gives destination URL',
      'Auto-use chadnicely.com domain',
      'Auto-generate slug',
      'Create via API'
    ]
  },
  {
    name: '/leadstep',
    category: 'links',
    description: 'Create lead capture page',
    steps: [
      'Ask for page name',
      'Ask for headline/offer',
      'Ask for domain/slug',
      'Create via PopLinks API'
    ]
  },
  {
    name: '/bridgepage',
    category: 'links',
    description: 'Create/clone bridge page',
    steps: [
      'Ask: Clone or create new?',
      'Get source/details',
      'Set destination URL',
      'Create/clone via API'
    ]
  },
  {
    name: '/tag',
    category: 'contacts',
    description: 'Fire tag on contact in GC',
    steps: [
      'Ask for contact name',
      'Ask for email',
      'Ask which tag',
      'Fire via GC API'
    ]
  },
  {
    name: '/contact',
    category: 'contacts',
    description: 'Get contact history from GC',
    steps: [
      'Ask for name + email',
      'Search GC',
      'Show full history'
    ]
  },
  {
    name: '/systemhealth',
    category: 'system',
    description: 'Run health check on all APIs',
    steps: [
      'Check 5 APIs',
      'Check 9 URLs',
      'Save results',
      'Report failures'
    ]
  },
  {
    name: '/teamcall',
    category: 'system',
    description: 'Extract assignments from Zoom',
    steps: [
      'Fetch latest recording',
      'Parse transcript',
      'Extract assignments',
      'Update TEAM-KANBAN.md'
    ]
  }
];

const categoryColors: Record<string, string> = {
  email: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  content: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  links: 'bg-green-500/20 text-green-400 border-green-500/30',
  contacts: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  system: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const categoryLabels: Record<string, string> = {
  email: '📧 Email',
  content: '🎓 Content',
  links: '🔗 Links & Pages',
  contacts: '👤 Contacts',
  system: '⚙️ System'
};

export default function CommandsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);

  const filteredCommands = commands.filter(cmd => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch = cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(commands.map(c => c.category)))];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <NavigationSidebar />
      <div className="flex-1 text-white p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🎬 Command Center
              </h1>
              <p className="text-gray-400 mt-2">Quick reference for all Pacino shortcodes and workflows</p>
            </div>
            <a 
              href="/" 
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const count = commands.filter(c => c.category === key).length;
              return (
                <div key={key} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              );
            })}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">{commands.length}</div>
              <div className="text-xs text-gray-400">Total Commands</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'All' : categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommands.map((cmd) => (
              <div
                key={cmd.name}
                className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => setExpandedCommand(expandedCommand === cmd.name ? null : cmd.name)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <code className="text-lg font-bold text-blue-400">{cmd.name}</code>
                    <span className={`px-2 py-1 rounded text-xs border ${categoryColors[cmd.category]}`}>
                      {categoryLabels[cmd.category]}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{cmd.description}</p>
                  
                  {cmd.shortcut && (
                    <div className="text-xs text-gray-500 mb-3">
                      💡 {cmd.shortcut}
                    </div>
                  )}

                  {expandedCommand === cmd.name && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <p className="text-xs text-gray-500 mb-2">Workflow Steps:</p>
                      <ol className="space-y-2">
                        {cmd.steps.map((step, i) => (
                          <li key={i} className="text-sm text-gray-400 flex gap-2">
                            <span className="text-blue-500 font-mono">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-500">
                    {expandedCommand === cmd.name ? 'Click to collapse ↑' : 'Click to expand ↓'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCommands.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No commands found matching your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Last updated: February 18, 2026</p>
          <p className="mt-2">Need a new command? Tell Chad and I'll build it.</p>
        </div>
      </div>
    </div>
  );
}
