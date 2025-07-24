// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/components/common/sidebar';
import Header from '../src/components/common/header';
import Footer from '../src/components/common/Footer';

const MainLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      fontFamily: 'var(--font-family)',
      position: 'relative',
    }}>
      {/* Fixed Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: isSidebarCollapsed ? '0' : '280px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        // Mobile responsive - no margin on mobile
        '@media (max-width: 768px)': {
          marginLeft: '0',
        },
      }}>
        {/* Header */}
        <div style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--color-background)',
        }}>
          <Header 
            toggleMobileSidebar={toggleMobileSidebar}
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '0rem',
          backgroundColor: 'var(--color-surface)',
          boxSizing: 'border-box',
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
          borderRadius: isSidebarCollapsed ? 'var(--radius-lg)': '0',
          margin: isSidebarCollapsed ? 'var(--spacing-md)' : '0 0 0 0px',
          transition: 'all 0.3s ease',
        }}>
          <Outlet />
        </main>

        {/* Footer */}
        <div style={{ 
          backgroundColor: 'var(--color-background)',
        }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;