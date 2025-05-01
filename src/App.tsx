import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advertising from "./pages/Advertising";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advertising" element={<Advertising />} />
          
          {/* Updated Resources route */}
          <Route path="/resources" element={<Resources />} />
          
          {/* District level pages - these will be implemented later */}
          <Route path="/about" element={<NotFound />} />
          <Route path="/history" element={<NotFound />} />
          <Route path="/executive-committee" element={<NotFound />} />
          <Route path="/member-directory" element={<NotFound />} />
          <Route path="/become-member" element={<NotFound />} />
          <Route path="/events" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/news" element={<NotFound />} />
          <Route path="/gallery" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/terms" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
