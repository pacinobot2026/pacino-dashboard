import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const workspacePath = process.env.WORKSPACE_PATH || 'C:/Users/Administrator/.openclaw/workspace';
    const memoryPath = path.join(workspacePath, 'memory', `${today}.md`);
    
    const entries = [];

    if (fs.existsSync(memoryPath)) {
      const content = fs.readFileSync(memoryPath, 'utf-8');
      const lines = content.split('\n');
      
      let currentTime = '';
      let currentSection = '';
      
      for (const line of lines) {
        // Time headers
        const timeMatch = line.match(/^##\s+(\d{1,2}:\d{2}\s*[AP]M)/i);
        if (timeMatch) {
          currentTime = timeMatch[1];
          currentSection = '';
        }
        
        // Section headers
        if (line.includes('**Goal:**') || line.includes('Goal:')) {
          currentSection = 'task';
        } else if (line.includes('**Lesson:**') || line.includes('Learned:')) {
          currentSection = 'lesson';
        }
        
        // Content lines
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const text = line.replace(/^[-*]\s+/, '').trim();
          if (text && text.length > 5) {
            entries.push({
              id: `mem-${entries.length}`,
              content: text.length > 100 ? text.slice(0, 100) + '...' : text,
              timestamp: currentTime || 'Today',
              type: currentSection === 'lesson' ? 'lesson' : 
                    currentSection === 'task' ? 'task' : 'note'
            });
          }
        }
      }
    }

    // Return last 10 entries, newest first
    return NextResponse.json(entries.slice(-10).reverse());
  } catch (error) {
    console.error('Memory API error:', error);
    return NextResponse.json([]);
  }
}
