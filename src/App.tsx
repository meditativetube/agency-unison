
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

// More reliable detection of GitHub Pages environment
const isGitHubPages = 
  window.location.hostname.includes("github.io") || 
  window.location.hostname.includes(".github.") ||
  window.location.href.includes("?ghp=true"); // For testing GitHub Pages mode locally

const Router = isGitHubPages ? HashRouter : BrowserRouter;
const routeElements = [
  {
    path: "/",
    element: (
      <AppLayout>
        <Index />
      </AppLayout>
    ),
  },
  {
    path: "/tasks",
    element: (
      <AppLayout>
        <Tasks />
      </AppLayout>
    ),
  },
  {
    path: "/team",
    element: (
      <AppLayout>
        <Team />
      </AppLayout>
    ),
  },
  {
    path: "/meetings",
    element: (
      <AppLayout>
        <Meetings />
      </AppLayout>
    ),
  },
  {
    path: "/finance",
    element: (
      <AppLayout>
        <Finance />
      </AppLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <AppLayout>
        <Settings />
      </AppLayout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              {routeElements.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
