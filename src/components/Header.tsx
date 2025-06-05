import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header = ({ isMobileMenuOpen, toggleMobileMenu }: HeaderProps) => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="site-branding">
          <button 
            id="mobile-menu-toggle" 
            className="mobile-menu-toggle" 
            aria-label="모바일 메뉴 토글"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <Link to="/" className="site-title">ori0o0p</Link>
        </div>
        
        <nav className="site-nav">
          <Link to="/about" className="nav-link">about</Link>
          <Link to="/archive" className="nav-link">archive</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;