import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const workspacePath = process.env.WORKSPACE_PATH || 'C:/Users/Administrator/.openclaw/workspace';
  
  const services = [];

  // Check GitHub credentials
  const githubPath = path.join(workspacePath, 'credentials', 'credentials-github.txt');
  services.push({
    name: 'GitHub',
    icon: '🐙',
    status: fs.existsSync(githubPath) ? 'online' : 'offline',
    detail: 'pacinobot2026'
  });

  // Check Vercel credentials
  const vercelPath = path.join(workspacePath, 'credentials', 'credentials-vercel.txt');
  services.push({
    name: 'Vercel',
    icon: '▲',
    status: fs.existsSync(vercelPath) ? 'online' : 'offline',
    detail: 'CLI configured'
  });

  // Check Telegram (assume online if gateway is running)
  services.push({
    name: 'Telegram',
    icon: '📱',
    status: 'online',
    detail: 'moltbot'
  });

  // Check Memory system
  const memoryPath = path.join(workspacePath, 'memory');
  services.push({
    name: 'Memory',
    icon: '🧠',
    status: fs.existsSync(memoryPath) ? 'online' : 'offline',
    detail: 'Active'
  });

  // Check AgentMail
  const agentmailPath = path.join(workspacePath, 'credentials', 'credentials-agentmail.txt');
  services.push({
    name: 'AgentMail',
    icon: '📧',
    status: fs.existsSync(agentmailPath) ? 'online' : 'offline',
    detail: 'nicelycollabs@agentmail.to'
  });

  // OpenClaw Gateway
  services.push({
    name: 'OpenClaw Gateway',
    icon: '🦞',
    status: 'online',
    detail: 'Running'
  });

  return NextResponse.json(services);
}
