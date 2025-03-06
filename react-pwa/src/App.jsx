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
import CallHistoryPage from "./pages/CallHistoryPage";
import DuePatientsPage from "./pages/auth/DuePatientsPage";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/call-history" element={<CallHistoryPage />} />
        <Route path="/due-patients" element={<DuePatientsPage />} />
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
