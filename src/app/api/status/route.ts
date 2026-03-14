
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would check database connections, external services, etc.
  const statusOptions = ['running', 'degraded', 'error'] as const;
  const currentStatus = statusOptions[0]; // Default to running for the demo
  
  return NextResponse.json({
    status: currentStatus,
    version: '1.2.4-stable',
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    commit: 'a1b2c3d4',
    nodeVersion: process.version,
  });
}
