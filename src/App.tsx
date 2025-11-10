
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import NavigationWrapper from "@/components/NavigationWrapper";
import { useEffect } from "react";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Journey from "./pages/Journey";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import InfoPage from "./pages/InfoPage";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminSetup from "./pages/SuperAdminSetup";
import QuickSetup from "./pages/QuickSetup";
import NotFound from "./pages/NotFound";
import EnhancedStudentDashboard from "./components/EnhancedStudentDashboard";
import StudentPage from "./pages/StudentPage";
import MentorPage from "./pages/MentorPage";
import ParentPage from "./pages/ParentPage";
import SchoolPage from "./pages/SchoolPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, profile } = useAuth();

  useEffect(() => {
    // Auto-redirect admin to admin dashboard after login
    if (user && profile?.is_admin && window.location.pathname === '/') {
      window.location.href = '/admin';
    }
  }, [user, profile]);

  return (
    <NavigationWrapper>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/super-admin-setup" element={<SuperAdminSetup />} />
        <Route path="/quick-setup" element={<QuickSetup />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/school" element={<SchoolPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NavigationWrapper>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
