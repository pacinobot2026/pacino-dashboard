import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const workspacePath = process.env.WORKSPACE_PATH || 'C:/Users/Administrator/.openclaw/workspace';
    const kanbanPath = path.join(workspacePath, 'KANBAN.md');
    
    const tasks = [];

    if (fs.existsSync(kanbanPath)) {
      const content = fs.readFileSync(kanbanPath, 'utf-8');
      const lines = content.split('\n');
      
      let currentSection = '';
      
      for (const line of lines) {
        // Detect section headers
        if (line.includes('## 🔴 Backlog') || line.includes('Backlog')) {
          currentSection = 'backlog';
        } else if (line.includes('## 🟡 In Progress') || line.includes('In Progress')) {
          currentSection = 'in-progress';
        } else if (line.includes('## 🟢 Done') || line.includes('Done')) {
          currentSection = 'done';
        }
        
        // Parse task lines
        const taskMatch = line.match(/^-\s*\[([x ])\]\s*(.+)/i);
        if (taskMatch && currentSection) {
          const isChecked = taskMatch[1].toLowerCase() === 'x';
          const taskText = taskMatch[2].trim();
          
          // Extract priority if present
          const priorityMatch = taskText.match(/\|\s*priority:\s*(\w+)/i);
          const priority = priorityMatch ? priorityMatch[1] : undefined;
          
          // Clean up title
          const title = taskText.split('|')[0].trim();
          
          tasks.push({
            id: `task-${tasks.length}`,
            title,
            status: isChecked ? 'done' : currentSection,
            priority
          });
        }
      }
    }

    // If no tasks found, return empty
    if (tasks.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Tasks API error:', error);
    return NextResponse.json([]);
  }
}
