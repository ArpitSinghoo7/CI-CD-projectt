
"use client";

import React, { useState } from 'react';
import { Sparkles, Send, BrainCircuit, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateTroubleshootingTips } from '@/ai/flows/generate-troubleshooting-tips-flow';

interface AssistantProps {
  status: 'running' | 'degraded' | 'error';
  version?: string;
  description?: string;
}

export function TroubleshootingAssistant({ status, version, description }: AssistantProps) {
  const [tips, setTips] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetHelp = async () => {
    setLoading(true);
    try {
      const res = await generateTroubleshootingTips({
        status,
        version,
        description: description || "Monitoring standard system operations."
      });
      setTips(res.tips);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-1 bg-primary/20 rounded-bl-xl text-[10px] font-bold tracking-widest text-primary uppercase px-2 z-10">
        AI ASSISTANT
      </div>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-accent" />
          SysCheck AI Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!tips ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Need diagnostics? Our AI can analyze the current status <span className="text-accent font-semibold">({status})</span> and suggest immediate troubleshooting steps for your DevOps environment.
          </p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-accent">
             <div className="p-4 rounded-lg bg-black/40 border border-border/50 font-body text-sm whitespace-pre-line">
                {tips}
             </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button 
          onClick={handleGetHelp} 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {tips ? 'Regenerate Tips' : 'Get AI Diagnostics'}
        </Button>
        {tips && (
           <Button variant="ghost" size="sm" onClick={() => setTips(null)} className="text-xs text-muted-foreground">
             Reset Assistant
           </Button>
        )}
      </CardFooter>
    </Card>
  );
}
