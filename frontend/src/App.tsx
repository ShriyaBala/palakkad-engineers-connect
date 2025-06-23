import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advertising from "./pages/Advertising";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import LoginForm from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/User_Dashboard';
import AdminDashboard from './pages/Admin_Dashboard';
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import ResetPasswordForm from "./pages/ResetPasswordForm";

import JoinUsLanding from './pages/JoinUsLanding';
import JoinUs from './pages/JoinUs';
import PendingMembersPage from './pages/PendingMembersPage';
import TotalMembersPage from './pages/TotalMembersPage';

const queryClient = new QueryClient();

// Route protection components
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isStaff = localStorage.getItem('is_staff') === 'true';

  if (!token) return <Navigate to="/login" />;
  if (!isStaff && userRole !== 'superuser') return <Navigate to="/" />;

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/join" element={<JoinUsLanding />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/pending-members" element={<PendingMembersPage />} />
          <Route path="/admin/total-members" element={<TotalMembersPage />} />
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
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordForm />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
