import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Removed useLocation
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import IdeasPage from './pages/IdeasPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import CreateIdeaPage from './pages/CreateIdeaPage';
import GroupsPage from './pages/GroupsPage';
import GroupDetailPage from './pages/GroupDetailPage';
import CreateGroupPage from './pages/CreateGroupPage'; 
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage'; 
import NotFoundPage from './pages/NotFoundPage';
// LoginPage and SignupPage imports removed
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage'; // Added AboutPage
import ContactPage from './pages/ContactPage'; // Added ContactPage
// useAuth import removed from here as NavigateToHomeOrDashboard is removed

// Add HashRedirector component
function HashRedirector() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.replace(/^#/, '');
      navigate(cleanPath, { replace: true });
    }
  }, [navigate]);
  return null;
}

const App: React.FC = () => {
  return (
    <>
      <HashRedirector />
      <Routes>
        {/* LoginPage and SignupPage routes removed */}
        
        {/* Main application layout and protected routes */}
        <Route element={<Layout />}> {/* Layout now wraps all content including potentially protected ones */}
          <Route path="/" element={<Navigate to="/home" replace />} /> {/* Always redirect root to /home */}
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/about" element={<AboutPage />} /> {/* New About Page Route */}
          <Route path="/contact" element={<ContactPage />} /> {/* New Contact Page Route */}
          
          <Route element={<ProtectedRoute />}> {/* Protected routes are children of this */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="ideas" element={<IdeasPage />} />
            <Route path="ideas/:ideaId" element={<IdeaDetailPage />} />
            <Route path="create-idea" element={<CreateIdeaPage />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="groups/create" element={<CreateGroupPage />} /> 
            <Route path="groups/:groupId" element={<GroupDetailPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};


// NavigateToHomeOrDashboard component has been removed.
// The root path "/" now directly navigates to "/home".
// The HomePage component handles different views for logged-in vs. logged-out states.
// The AuthContext still auto-logs in the mock user.

export default App;