import React, { useState } from 'react';

const styles = {
  footerContainer: {
    fontFamily: 'var(--font-family), sans-serif',
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 14, 27, 0.98) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    color: '#FFFFFF',
    marginTop: 'auto',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '3rem',
    position: 'relative',
    zIndex: 2,
  },
  
  // Background decoration
  footerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
    zIndex: 1,
  },
  
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  brandHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  
  brandIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    color: 'white',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
  },
  
  brandInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  
  brandName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.5px',
    margin: 0,
  },
  
  brandTagline: {
    fontSize: '0.875rem',
    color: '#94A3B8',
    fontWeight: '500',
  },
  
  brandDescription: {
    fontSize: '0.95rem',
    color: '#CBD5E1',
    lineHeight: '1.6',
    maxWidth: '320px',
  },
  
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'rgba(148, 163, 184, 0.1)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
  },
  
  socialLinkHover: {
    background: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    color: '#60A5FA',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)',
  },
  
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: '0.5rem',
    letterSpacing: '0.5px',
  },
  
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  
  footerLink: {
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '0.25rem 0',
    borderRadius: '6px',
    position: 'relative',
  },
  
  footerLinkHover: {
    color: '#60A5FA',
    transform: 'translateX(4px)',
  },
  
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#CBD5E1',
    fontSize: '0.9rem',
  },
  
  contactIcon: {
    width: '32px',
    height: '32px',
    background: 'rgba(148, 163, 184, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94A3B8',
    fontSize: '0.9rem',
  },
  
  footerBottom: {
    borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    padding: '2rem',
    background: 'rgba(8, 14, 27, 0.8)',
    backdropFilter: 'blur(12px)',
  },
  
  footerBottomContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  copyright: {
    color: '#64748B',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  developerCredit: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#94A3B8',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  
  heartIcon: {
    color: '#EF4444',
    fontSize: '1rem',
    animation: 'heartbeat 2s ease-in-out infinite',
  },
  
  legalLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  
  legalLink: {
    color: '#64748B',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  
  legalLinkHover: {
    color: '#94A3B8',
  },
  
  // Responsive styles
  mobileStyles: {
    '@media (max-width: 768px)': {
      footerContent: {
        gridTemplateColumns: '1fr',
        gap: '2rem',
        padding: '2rem 1rem 1.5rem',
      },
      footerBottomContent: {
        flexDirection: 'column',
        textAlign: 'center',
        gap: '1rem',
      },
      legalLinks: {
        flexDirection: 'column',
        gap: '1rem',
      },
    },
  },
  
  animations: `
    @keyframes heartbeat {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
};

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredLegal, setHoveredLegal] = useState(null);

  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Workspace', href: '/workspace' },
    { name: 'Idea Canvas', href: '/idea-canvas' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Community', href: '/community' },
    { name: 'Contact Support', href: '/support' },
  ];

  const socialPlatforms = [
    { name: 'GitHub', icon: 'code', href: 'https://github.com' },
    { name: 'Twitter', icon: 'alternate_email', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'business', href: 'https://linkedin.com' },
    { name: 'Discord', icon: 'forum', href: 'https://discord.com' },
  ];

  return (
    <>
      <style>{styles.animations}</style>
      <footer style={styles.footerContainer}>
        <div style={styles.footerDecoration}></div>
        
        <div style={styles.footerContent}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <div style={styles.brandHeader}>
              <div style={styles.brandIcon}>
                <span className="material-icons">auto_awesome</span>
              </div>
              <div style={styles.brandInfo}>
                <h3 style={styles.brandName}>Veridian</h3>
                <span style={styles.brandTagline}>Empowering Innovation</span>
              </div>
            </div>
            
            <p style={styles.brandDescription}>
              A modern workspace platform designed to enhance productivity, 
              foster collaboration, and streamline your workflow with intelligent tools.
            </p>
            
            <div style={styles.socialLinks}>
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  style={{
                    ...styles.socialLink,
                    ...(hoveredSocial === platform.name ? styles.socialLinkHover : {}),
                  }}
                  onMouseEnter={() => setHoveredSocial(platform.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  aria-label={platform.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-icons">{platform.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Product</h4>
            <ul style={styles.linkList}>
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      ...styles.footerLink,
                      ...(hoveredLink === link.name ? styles.footerLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Company</h4>
            <ul style={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      ...styles.footerLink,
                      ...(hoveredLink === link.name ? styles.footerLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Support</h4>
            <ul style={styles.linkList}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      ...styles.footerLink,
                      ...(hoveredLink === link.name ? styles.footerLinkHover : {}),
                    }}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <span className="material-icons">email</span>
                </div>
                <span>hello@veridian.com</span>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <span className="material-icons">phone</span>
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <div style={styles.footerBottomContent}>
            <div style={styles.copyright}>
              <span className="material-icons" style={{ fontSize: '1rem', color: '#64748B' }}>
                copyright
              </span>
              {currentYear} Veridian Systems. All rights reserved.
            </div>
            
            <div style={styles.developerCredit}>
              Crafted with 
              <span className="material-icons" style={styles.heartIcon}>
                favorite
              </span>
              by Kshitij Mishra
            </div>
            
            <div style={styles.legalLinks}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    ...styles.legalLink,
                    ...(hoveredLegal === link ? styles.legalLinkHover : {}),
                  }}
                  onMouseEnter={() => setHoveredLegal(link)}
                  onMouseLeave={() => setHoveredLegal(null)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;