import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PolicyPage from "./pages/PolicyPage";
import NewsPage from "./pages/NewsPage";
import InsightsPage from "./pages/InsightsPage";
import EventsPage from "./pages/EventsPage";
import DataMerchantsPage from "./pages/DataMerchantsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/policy/:slug" element={<ArticleDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<ArticleDetailPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:id" element={<InsightsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventsPage />} />
          <Route path="/data-merchants" element={<DataMerchantsPage />} />
          <Route path="/data-merchants/:id" element={<DataMerchantsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
