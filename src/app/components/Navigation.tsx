// components/Navigation.tsx
import React from 'react';

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

interface NavigationProps {
  portfolioLink: NavLink;
  aboutLink: NavLink;
  contactLink: NavLink;
}

const Navigation: React.FC<NavigationProps> = ({ portfolioLink, aboutLink, contactLink }) => {
  return (
    <nav className="nav-container">
      {/* Vänster länk */}
      <div className="nav-left">
        <a key={portfolioLink.id} href={portfolioLink.uri} className="link">
          {portfolioLink.title}
        </a>
      </div>

      {/* Höger länkar */}
      <div className="nav-right">
        <a key={aboutLink.id} href={aboutLink.uri} className="link">
          {aboutLink.title}
        </a>
        <a key={contactLink.id} href={contactLink.uri} className="link">
          {contactLink.title}
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
