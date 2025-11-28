import React from 'react';
import { Palmtree, Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  onOpenConcierge: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConcierge }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
        >
          <Palmtree size={28} />
          <span className="text-xl font-bold tracking-tight">GuadaVillas</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#villas" className="hover:text-teal-600 transition-colors">Villas</a>
          <a href="#experiences" className="hover:text-teal-600 transition-colors">Expériences</a>
          <a href="#about" className="hover:text-teal-600 transition-colors">À propos</a>
          <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenConcierge}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full hover:bg-teal-100 transition-colors text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Assistant IA
          </button>
          
          <a 
            href="#villas"
            className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600 transition-colors"
            title="Rechercher une villa"
          >
            <Search size={20} />
          </a>
          <div className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600 transition-colors" title="Espace client (Bientôt disponible)">
            <User size={20} />
          </div>
          <div className="md:hidden p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600 transition-colors">
            <Menu size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};