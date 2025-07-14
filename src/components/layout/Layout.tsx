import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  
  return (
    <div className="h-screen-safe bg-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
} 