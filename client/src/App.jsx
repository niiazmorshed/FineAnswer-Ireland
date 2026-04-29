import React, { useEffect, useLayoutEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import ReadMoreInfo from "./pages/ReadMoreInfo";
import IrelandPage from "./IrelandPage";

import Login from "./LoginPage";
import Register from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DocumentChecklist from "./pages/DocumentChecklist";
import Sessions from "./pages/Sessions";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Analytics from "./pages/admin/Analytics";
import SuccessStories from "./pages/admin/SuccessStories";
import Blog from "./pages/admin/Blog";
import AdminCareer from "./pages/admin/Career";
import TrackerUpdate from "./pages/admin/TrackerUpdate";
import AdminSession from "./pages/admin/AdminSession";
import StudentsInfo from "./pages/admin/StudentsInfo";
import AdminDocuments from "./pages/admin/Documents";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./pages/Provider/ContextProvider";
import PublicBlog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Career from "./pages/Career";
import Payment from "./pages/Payment";
import EnglishProficiency from "./pages/EnglishProficiency";
import AppLaunch from "./pages/AppLaunch";
import ProgressTrackerPage from "./pages/ProgressTrackerPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";
import SuccessStoryDetail from "./pages/SuccessStoryDetail";
import SearchResults from "./pages/SearchResults";
import JobDetail from "./pages/JobDetail";
import WhyIrelandHub from "./pages/why-ireland/WhyIrelandHub";
import { StudyInIrelandRouteLayout } from "./pages/why-ireland/StudyInIrelandPage";
import { PostStudyRouteLayout } from "./pages/PostStudyPage";
import { PathwayRouteLayout } from "./pages/PathwayPage";
import { Under18RouteLayout } from "./pages/Under18Page";
import { EntryRequirementsRouteLayout } from "./pages/EntryRequirementsPage";
import { HealthInsuranceRouteLayout } from "./pages/HealthInsurancePage";
import { forceNavigateScrollTop } from "./utils/documentScroll";

import "./App.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[FineAnswer] Uncaught render error:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 24, fontFamily: '"Mulish", system-ui, sans-serif' }}>
        <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ color: "rgba(15, 23, 42, 0.75)", marginBottom: 12 }}>
          The app crashed while rendering. Open the browser console to see the exact error.
        </p>
        <pre
          style={{
            background: "rgba(2, 6, 23, 0.06)",
            padding: 12,
            borderRadius: 10,
            overflow: "auto",
            maxWidth: "100%",
          }}
        >
          {String(this.state.error?.message || this.state.error || "Unknown error")}
        </pre>
      </div>
    );
  }
}

function AppRoutes() {
  const { user, isAdmin, loading } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    forceNavigateScrollTop();
    const raf1 = requestAnimationFrame(() => {
      forceNavigateScrollTop();
      requestAnimationFrame(forceNavigateScrollTop);
    });
    const timers = [0, 16, 50, 100, 200, 400, 600].map((ms) =>
      window.setTimeout(forceNavigateScrollTop, ms)
    );
    return () => {
      cancelAnimationFrame(raf1);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname, search]);

  useEffect(() => {
    forceNavigateScrollTop();
    const t = window.setTimeout(forceNavigateScrollTop, 0);
    return () => window.clearTimeout(t);
  }, [pathname, search]);

  useEffect(() => {
    const elems = gsap.utils.toArray(".reveal");
    elems.forEach((elem) => {
      gsap.from(elem, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
        },
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <Routes>
      <Route path="/read-more-info" element={<ReadMoreInfo />} />
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/ireland" element={<IrelandPage />} />
      <Route path="/study" element={<StudyInIrelandRouteLayout />} />
      <Route path="/poststudy" element={<PostStudyRouteLayout />} />
      <Route path="/pathway" element={<PathwayRouteLayout />} />
      <Route path="/under18" element={<Under18RouteLayout />} />
      <Route path="/entry-requirements" element={<EntryRequirementsRouteLayout />} />
      <Route path="/health-insurance" element={<HealthInsuranceRouteLayout />} />
      <Route path="/why-ireland/*" element={<WhyIrelandHub />} />
      {/* /australia and /uk redirect to home — pages removed */}
      <Route path="/australia" element={<Navigate to="/" replace />} />
      <Route path="/uk" element={<Navigate to="/" replace />} />
      <Route path="/blog" element={<PublicBlog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/success-story/:id" element={<SuccessStoryDetail />} />
      <Route path="/career" element={<Career />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/fail" element={<PaymentFail />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/search-results" element={<SearchResults />} />
      {/* Login/Register - Redirect if already logged in */}
      <Route 
        path="/login" 
        element={
          !loading && user ? (
            <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace />
          ) : (
            <Login />
          )
        } 
      />
      <Route 
        path="/register" 
        element={
          !loading && user ? (
            <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace />
          ) : (
            <Register />
          )
        } 
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User Dashboard - Protected */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {!loading && isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <DashboardLayout />
            )}
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="progress-tracker" element={<ProgressTrackerPage />} />
        <Route path="documentchecklist" element={<DocumentChecklist />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="career" element={<Navigate to="/career" replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="payment" element={<Payment />} />
        <Route path="english-proficiency" element={<EnglishProficiency />} />
        <Route path="app" element={<AppLaunch />} />
      </Route>

      {/* Admin Dashboard - Protected, Admin Only */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="success-stories" element={<SuccessStories />} />
        <Route path="blog" element={<Blog />} />
        <Route path="career" element={<AdminCareer />} />
        <Route path="tracker-update" element={<TrackerUpdate />} />
        <Route path="sessions" element={<AdminSession />} />
        <Route path="students-info" element={<StudentsInfo />} />
        <Route path="documents" element={<AdminDocuments />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppErrorBoundary>
        <AppRoutes />
      </AppErrorBoundary>
    </Router>
  );
}
