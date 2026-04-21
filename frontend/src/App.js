import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeamPage from "./pages/TeamPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Layout wrapper for public pages
const PublicLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header />
      <main className="pt-0">{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
