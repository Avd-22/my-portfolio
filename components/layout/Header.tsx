'use client';
import type { CSSProperties } from 'react';
import { NAVIGATION, PROFILE } from '../../constants/portfolio';
import useMobileMenu from '../../hooks/useMobileMenu';
import ThemeToggle from '../ui/ThemeToggle';
export default function Header({ activeSection }: { activeSection: string }) {
  const { isOpen, closeMenu, toggleMenu } = useMobileMenu();
  return (
    <header className="site-header">
      <a className="brand" href="#">
        <span className="brandmark">
          ad<span>.</span>
        </span>
        <div>
          {PROFILE.name}
          <small>SOFTWARE ENGINEER</small>
        </div>
      </a>
      <nav
        id="main-navigation"
        className={isOpen ? 'open' : ''}
        aria-label="Main navigation"
        style={
          {
            '--active-index': Math.max(
              0,
              NAVIGATION.findIndex(({ id }) => id === activeSection),
            ),
            '--active-opacity': activeSection ? 1 : 0,
          } as CSSProperties
        }
      >
        <span className="nav-indicator" aria-hidden="true" />
        {NAVIGATION.map(({ id, label }) => (
          <a
            key={id}
            aria-current={activeSection === id ? 'location' : undefined}
            className={activeSection === id ? 'active' : ''}
            href={'#' + id}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="navtools">
        <ThemeToggle />
        <a className="resume" href={PROFILE.resume} target="_blank" rel="noreferrer">
          Resume <span>↓</span>
        </a>
        <button
          className="menubtn"
          aria-label="Toggle navigation"
          aria-controls="main-navigation"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
}
