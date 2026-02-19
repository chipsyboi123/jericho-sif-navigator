import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import SIF101 from "./pages/SIF101";
import FundExplorer from "./pages/FundExplorer";
import SIFTracker from "./pages/SIFTracker";
import SIFCompare from "./pages/SIFCompare";
import TaxCalculator from "./pages/TaxCalculator";
import KnowledgeHub from "./pages/KnowledgeHub";
import Distributors from "./pages/Distributors";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sif-101" element={<SIF101 />} />
            <Route path="/funds" element={<FundExplorer />} />
            <Route path="/tracker" element={<SIFTracker />} />
            <Route path="/compare" element={<SIFCompare />} />
            <Route path="/calculator" element={<TaxCalculator />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
