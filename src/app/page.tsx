
import { StatusDashboard } from '@/components/dashboard/StatusDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 py-8">
      <StatusDashboard />
      
      <footer className="mt-12 py-8 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            SysCheck Flow &copy; {new Date().getFullYear()} - Designed for College Minor Project Documentation
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">GitHub Repository</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">System Health API</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
