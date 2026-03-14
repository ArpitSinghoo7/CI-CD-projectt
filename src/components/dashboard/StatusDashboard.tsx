
"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, Box, ShieldCheck, Terminal, AlertCircle, RefreshCcw, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TroubleshootingAssistant } from './TroubleshootingAssistant';
import { BuildInfoCard } from './BuildInfoCard';
import { ProjectDocs } from './ProjectDocs';

export function StatusDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-emerald-500 text-emerald-950';
      case 'degraded': return 'bg-amber-500 text-amber-950';
      case 'error': return 'bg-rose-500 text-rose-950';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-headline flex items-center gap-3">
            <Activity className="text-primary w-8 h-8" />
            SysCheck Flow
          </h1>
          <p className="text-muted-foreground mt-1">Enterprise CI/CD Monitoring & Documentation Portal</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary bg-primary/5">
            PROD ENVIRONMENT
          </Badge>
          <Button variant="ghost" size="icon" onClick={fetchStatus} disabled={loading} className="text-muted-foreground hover:text-white">
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold capitalize">
                {data?.status || 'Unknown'}
              </div>
              <div className={`w-2 h-2 rounded-full ${data?.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Version {data?.version || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Runtime Env</CardTitle>
            <Box className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold uppercase tracking-wider text-accent">
              {data?.environment || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Kubernetes Cluster v1.28</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
            <Cpu className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data ? `${Math.floor(data.uptime / 3600)}h ${Math.floor((data.uptime % 3600) / 60)}m` : '0h 0m'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">99.9% SLI adherence</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latency (P99)</CardTitle>
            <Server className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground mt-1">Stable within threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <BuildInfoCard data={data} />
          <ProjectDocs />
        </div>
        <div className="space-y-8">
          <TroubleshootingAssistant status={data?.status || 'running'} description={data?.description} version={data?.version} />
          
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                Live Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-black/30">
              <div className="font-code text-xs space-y-2 h-[300px] overflow-y-auto">
                <div className="text-muted-foreground"><span className="text-primary">[INFO]</span> Starting SysCheck server...</div>
                <div className="text-muted-foreground"><span className="text-primary">[INFO]</span> Database connection established.</div>
                <div className="text-muted-foreground"><span className="text-primary">[INFO]</span> Metrics exported to Prometheus.</div>
                <div className="text-accent"><span className="text-primary">[DEBUG]</span> Received status ping from 127.0.0.1</div>
                <div className="text-muted-foreground"><span className="text-primary">[INFO]</span> Pipeline execution started for branch 'main'.</div>
                <div className="text-emerald-400"><span className="text-primary">[INFO]</span> Deployment successful: hash a1b2c3d4</div>
                <div className="text-muted-foreground"><span className="text-primary">[INFO]</span> Monitoring heartbeat active.</div>
                <div className="animate-pulse">_</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
