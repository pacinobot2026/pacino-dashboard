import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    const workspacePath = process.env.WORKSPACE_PATH || 'C:/Users/Administrator/.openclaw/workspace';
    const memoryPath = path.join(workspacePath, 'memory', `${today}.md`);

    const activities = [];

    // Try to read today's memory file for recent activity
    if (fs.existsSync(memoryPath)) {
      const content = fs.readFileSync(memoryPath, 'utf-8');
      const lines = content.split('\n');
      
      let currentTime = '';
      for (const line of lines) {
        // Look for time headers like "## 1:30 PM"
        const timeMatch = line.match(/^##\s+(\d{1,2}:\d{2}\s*[AP]M)/i);
        if (timeMatch) {
          currentTime = timeMatch[1];
        }
        
        // Look for task/action lines
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const text = line.replace(/^[-*]\s+/, '').trim();
          if (text) {
            activities.push({
              id: `act-${activities.length}`,
              type: text.toLowerCase().includes('deploy') ? 'deploy' :
                    text.toLowerCase().includes('api') ? 'api' :
                    text.toLowerCase().includes('file') || text.toLowerCase().includes('wrote') ? 'file' :
                    text.toLowerCase().includes('exec') || text.toLowerCase().includes('ran') ? 'tool' : 'message',
              action: text.split(' ').slice(0, 3).join(' '),
              detail: text,
              timestamp: currentTime || 'Today',
              status: text.includes('✓') || text.includes('complete') ? 'success' :
                      text.includes('✗') || text.includes('fail') ? 'error' : 'success'
            });
          }
        }
      }
    }

    // If no activities found, return sample data
    if (activities.length === 0) {
      activities.push(
        { id: '1', type: 'deploy', action: 'Deployed Kanban', detail: 'kanban-rho-ivory.vercel.app', timestamp: 'Just now', status: 'success' },
        { id: '2', type: 'file', action: 'Updated KanbanBoard.tsx', detail: 'Added logout button', timestamp: '5 min ago', status: 'success' },
        { id: '3', type: 'api', action: 'GitHub Push', detail: 'pacinobot2026/kanban-board', timestamp: '10 min ago', status: 'success' }
      );
    }

    return NextResponse.json(activities.slice(0, 20));
  } catch (error) {
    console.error('Activity API error:', error);
    return NextResponse.json([]);
  }
}
