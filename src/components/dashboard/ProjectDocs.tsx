
"use client";

import React from 'react';
import { BookOpen, FileCode, Layers, Terminal, Github, Box, Settings, Info, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProjectDocs() {
  const images = PlaceHolderImages;

  return (
    <Card className="bg-card border-border shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-primary" />
          Project Documentation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 bg-muted/30 h-auto rounded-none border-y border-border">
            <TabsTrigger value="architecture" className="py-3 data-[state=active]:bg-primary/10">Architecture</TabsTrigger>
            <TabsTrigger value="code" className="py-3 data-[state=active]:bg-primary/10">Source Code</TabsTrigger>
            <TabsTrigger value="docker" className="py-3 data-[state=active]:bg-primary/10">Docker & Jenkins</TabsTrigger>
            <TabsTrigger value="setup" className="py-3 data-[state=active]:bg-primary/10">Setup Steps</TabsTrigger>
            <TabsTrigger value="troubleshooting" className="py-3 data-[state=active]:bg-primary/10">Troubleshooting</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="architecture" className="space-y-6 mt-0">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Layers className="text-primary w-5 h-5" /> Project Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SysCheck Flow is a robust CI/CD demonstration project designed to showcase modern software engineering practices. It bridges the gap between development and operations by automating testing, building, and deployment using a cloud-native toolchain.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Version Control via GitHub Webhooks',
                      'Automated Builds with Jenkins Pipeline',
                      'Containerization using Docker Registry',
                      'Live Dashboard Monitoring Interface'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <Image 
                      src={images.find(img => img.id === 'architecture-diagram')?.imageUrl || ''} 
                      alt="Architecture" 
                      width={800} 
                      height={450} 
                      className="object-cover"
                      data-ai-hint="devops architecture"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileCode className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-semibold">Node.js Server Entrypoint</h3>
                </div>
                <pre className="code-block">
{`const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    version: '1.2.4',
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`}
                </pre>
                
                <div className="mt-6 flex items-center gap-2">
                  <Settings className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-semibold">Folder Structure</h3>
                </div>
                <pre className="code-block">
{`project-root/
├── .github/workflows/   # CI automation
├── src/                # App logic
├── public/             # Static assets
├── tests/              # Unit & Integration tests
├── Dockerfile          # Container config
├── Jenkinsfile         # Pipeline definition
└── package.json        # Dependencies`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="docker" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Box className="text-primary w-5 h-5" />
                    <h3 className="text-lg font-semibold">Dockerfile</h3>
                  </div>
                  <pre className="code-block">
{`FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`}
                  </pre>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="text-primary w-5 h-5" />
                    <h3 className="text-lg font-semibold">Jenkins Pipeline (Declarative)</h3>
                  </div>
                  <pre className="code-block">
{`pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'npm install' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Deploy') {
      steps { sh 'docker build -t syscheck .' }
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6 mt-0">
               <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Quick Start Guide
                    </h4>
                    <p className="text-sm text-muted-foreground">Follow these steps to replicate the environment on your local machine or cloud server.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { step: 'GitHub Setup', desc: 'Fork the repository and enable webhooks for your Jenkins server URL.' },
                      { step: 'Jenkins Configuration', desc: 'Install Docker, NodeJS, and Git plugins on Jenkins. Create a new "Pipeline" project.' },
                      { step: 'Credentials', desc: 'Add Docker Hub credentials to Jenkins to allow pushing private/public images.' },
                      { step: 'Deployment', desc: 'Run the build manually once to verify Docker containers spin up correctly.' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-medium text-white">{item.step}</h5>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6 mt-0">
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-rose-500/30 rounded-lg bg-rose-500/5">
                      <h4 className="font-bold text-rose-400 mb-2">Build Failed</h4>
                      <p className="text-sm text-muted-foreground">Check Jenkins console output for "npm install" errors. Usually caused by missing dependency packages or node version mismatch.</p>
                    </div>
                    <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
                      <h4 className="font-bold text-amber-400 mb-2">Docker Port Conflict</h4>
                      <p className="text-sm text-muted-foreground">"Address already in use" errors mean port 3000 is occupied. Use <code>docker ps</code> to find and stop existing containers.</p>
                    </div>
                 </div>
                 
                 <div className="relative rounded-lg overflow-hidden border border-border">
                    <Image 
                      src={images.find(img => img.id === 'jenkins-pipeline')?.imageUrl || ''} 
                      alt="Jenkins Pipeline" 
                      width={800} 
                      height={400} 
                      className="object-cover"
                      data-ai-hint="jenkins dashboard"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <p className="text-xs text-accent font-mono uppercase tracking-widest">Fig 2: Example of a successful Jenkins stage view.</p>
                    </div>
                 </div>
               </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
