import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advertising from "./pages/Advertising";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/User_Dashboard';
import JoinUs from './pages/JoinUs';

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
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Added pages with dummy content */}
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* District level pages - these will be implemented later */}
          <Route path="/history" element={<NotFound />} />
          <Route path="/executive-committee" element={<NotFound />} />
          <Route path="/member-directory" element={<NotFound />} />
          <Route path="/become-member" element={<NotFound />} />
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
// In App.tsx or routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};

<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

export default App;
