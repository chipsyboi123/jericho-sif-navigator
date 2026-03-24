import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import Index from "./pages/Index";
import SIF101 from "./pages/SIF101";
import FundExplorer from "./pages/FundExplorer";
import SIFTracker from "./pages/SIFTracker";
import SIFCompare from "./pages/SIFCompare";
import KnowledgeHub from "./pages/KnowledgeHub";
import Contact from "./pages/Contact";
import WhyJerichoPage from "./pages/WhyJerichoPage";
import FundDetail from "./pages/FundDetail";
import BlogArticle from "./pages/BlogArticle";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FundManager from "./pages/admin/FundManager";
import AmcManager from "./pages/admin/AmcManager";
import NavUpload from "./pages/admin/NavUpload";
import BlogManager from "./pages/admin/BlogManager";
import LeadManager from "./pages/admin/LeadManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout (navbar + footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sif-101" element={<SIF101 />} />
            <Route path="/funds" element={<FundExplorer />} />
            <Route path="/tracker" element={<SIFTracker />} />
            <Route path="/compare" element={<SIFCompare />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/why-jericho" element={<WhyJerichoPage />} />
            <Route path="/funds/:slug" element={<FundDetail />} />
            <Route path="/knowledge/:slug" element={<BlogArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          {/* Admin routes: auth guard -> admin layout with sidebar */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/funds" element={<FundManager />} />
              <Route path="/admin/amcs" element={<AmcManager />} />
              <Route path="/admin/nav-upload" element={<NavUpload />} />
              <Route path="/admin/blog" element={<BlogManager />} />
              <Route path="/admin/leads" element={<LeadManager />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
