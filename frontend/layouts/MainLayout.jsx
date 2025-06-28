// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/components/common/sidebar';
import Header from '../src/components/common/Header';
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
      display: 'grid',
      gridTemplateAreas: isSidebarCollapsed 
        ? `
          "header header"
          "content content"
          "footer footer"
        `
        : `
          "header header"
          "sidebar content"
          "sidebar footer"
        `,
      gridTemplateColumns: isSidebarCollapsed ? '1fr' : '280px 1fr',
      gridTemplateRows: 'auto 1fr auto',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--color-background)',
      fontFamily: 'var(--font-family)',
      transition: 'grid-template-columns 0.3s ease',
      
      // Mobile responsive
      '@media (max-width: 768px)': {
        gridTemplateAreas: `
          "header header"
          "content content"
          "footer footer"
        `,
        gridTemplateColumns: '1fr',
      },
    }}>
      {/* Header */}
      <div style={{ gridArea: 'header' }}>
        <Header 
          toggleMobileSidebar={toggleMobileSidebar}
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Sidebar */}
      {!isSidebarCollapsed && (
        <div style={{ gridArea: 'sidebar' }}>
          <Sidebar
            isMobileOpen={isMobileSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
      )}

      {/* Sidebar when collapsed (fixed position) */}
      {isSidebarCollapsed && (
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main style={{
        gridArea: 'content',
        padding: 'var(--spacing-xl)',
        backgroundColor: 'var(--color-surface)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        border: '1px solid var(--color-border)',
        borderRadius: isSidebarCollapsed ? 'var(--radius-lg)' : 'var(--radius-lg) 0 0 0',
        margin: isSidebarCollapsed ? 'var(--spacing-md)' : '0 0 0 -1px',
        transition: 'all 0.3s ease',
      }}>
        <Outlet />
      </main>

      {/* Footer */}
      <div style={{ gridArea: 'footer' }}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;