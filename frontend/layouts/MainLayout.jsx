// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/components/common/sidebar';
import Header from '../src/components/common/Header';
import Footer from '../src/components/common/Footer';

const MainLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    // Updated: Apply CSS Grid directly here for the entire layout
    // This grid defines 3 rows: header (auto), main content (1fr), footer (auto)
    // And 2 columns: sidebar (fixed width) and main content (remaining space)
    <div style={{
      display: 'grid',
      gridTemplateAreas: `
        "header header"
        "sidebar content"
        "sidebar footer"
      `,
      // Define column widths for named areas
      gridTemplateColumns: '250px 1fr', /* Sidebar fixed width, content takes rest */
      // Define row heights for named areas
      gridTemplateRows: 'auto 1fr auto', /* Header auto, content fills remaining, footer auto */
      minHeight: '100vh', /* Ensure layout takes full viewport height */
      overflow: 'hidden', /* Prevent scrollbars from inner margins/paddings causing outer scroll */
      backgroundColor: '#F0F2F5', /* A light background for the content area behind Header/Sidebar */

      // Responsive adjustments for grid (requires CSS-in-JS or separate CSS)
      '@media (max-width: 768px)': {
        gridTemplateAreas: `
          "header header"
          "sidebar content"
          "sidebar footer"
        `,
        gridTemplateColumns: 'auto 1fr', // Sidebar can collapse, content takes rest
      },
    }}>
      {/* Header component - Positioned in the 'header' grid area */}
      <div style={{ gridArea: 'header' }}>
        <Header toggleMobileSidebar={toggleMobileSidebar} />
      </div>

      {/* Sidebar component - Positioned in the 'sidebar' grid area */}
      <div style={{ gridArea: 'sidebar' }}>
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />
      </div>

      {/* Main Content Area - Positioned in the 'content' grid area */}
      <main style={{
        gridArea: 'content',
        padding: '2rem', /* Add padding here for content within main area */
        backgroundColor: '#FFFFFF', /* White background for the main content panel */
        boxSizing: 'border-box',
        overflowY: 'auto', /* Allow scrolling within the content area if it overflows */
      }}>
        <Outlet />
      </main>

      {/* Footer component - Positioned in the 'footer' grid area */}
      <div style={{ gridArea: 'footer' }}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;