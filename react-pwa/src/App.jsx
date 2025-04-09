import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/auth/Register";
import RegisterSuccess from "./pages/auth/RegisterSuccess";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CallHistoryPage from "./pages/CallHistoryPage";
import DuePatientsPage from "./pages/DuePatientsPage";
import DashboardPage from "./pages/DashboardPage";
import DemoRecallPage from "./pages/DemoRecallPage";
import RateLimitExceededPage from "./pages/RateLimitExceededPage";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResetTokenExpired from "@/pages/auth/ResetTokenExpired";
import EmailVerified from "./pages/auth/EmailVerified";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-token-expired" element={<ResetTokenExpired />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/demo-recall" element={<DemoRecallPage />} />
      <Route path="/rate-limit-exceeded" element={<RateLimitExceededPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/call-history" element={<CallHistoryPage />} />
        <Route path="/due-patients" element={<DuePatientsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
