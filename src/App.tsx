
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Meetings from "./pages/Meetings";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// Check if we're in GitHub Pages environment
const isGitHubPages = window.location.hostname.includes("github.io");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isGitHubPages ? (
            // Use HashRouter for GitHub Pages
            <HashRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <AppLayout>
                      <Index />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/tasks" 
                  element={
                    <AppLayout>
                      <Tasks />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/team" 
                  element={
                    <AppLayout>
                      <Team />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/meetings" 
                  element={
                    <AppLayout>
                      <Meetings />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/finance" 
                  element={
                    <AppLayout>
                      <Finance />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          ) : (
            // Use BrowserRouter for local development
            <BrowserRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <AppLayout>
                      <Index />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/tasks" 
                  element={
                    <AppLayout>
                      <Tasks />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/team" 
                  element={
                    <AppLayout>
                      <Team />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/meetings" 
                  element={
                    <AppLayout>
                      <Meetings />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/finance" 
                  element={
                    <AppLayout>
                      <Finance />
                    </AppLayout>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
