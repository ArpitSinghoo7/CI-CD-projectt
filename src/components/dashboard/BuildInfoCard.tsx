
"use client";

import React from 'react';
import { GitBranch, GitCommit, Clock, Hash, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BuildInfoProps {
  data: any;
}

export function BuildInfoCard({ data }: BuildInfoProps) {
  return (
    <Card className="bg-card border-border shadow-xl">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-primary" />
          Continuous Integration Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Hash className="w-4 h-4" /> Commit Hash
            </div>
            <div className="font-code text-accent text-lg font-medium">{data?.commit || '8e7f22a'}</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" /> Build Date
            </div>
            <div className="text-white text-lg font-medium">
              {data?.timestamp ? new Date(data.timestamp).toLocaleDateString() : '2024-05-15'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <GitCommit className="w-4 h-4" /> Branch
            </div>
            <div className="text-white text-lg font-medium">main</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> CI Pipeline
            </div>
            <div className="text-emerald-400 text-lg font-medium">Passing</div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Last pipeline run completed in <span className="text-white">4m 23s</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
