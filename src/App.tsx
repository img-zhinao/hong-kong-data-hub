import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import PolicyPage from "./pages/PolicyPage";
import NewsPage from "./pages/NewsPage";
import InsightsPage from "./pages/InsightsPage";
import EventsPage from "./pages/EventsPage";
import DataMerchantsPage from "./pages/DataMerchantsPage";
import DataAssetPage from "./pages/DataAssetPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SitemapPage from "./pages/SitemapPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/data-asset" element={<DataAssetPage />} />
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
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-assets" element={<NotFound />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
