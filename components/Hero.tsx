import React, { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';

interface HeroProps {
  onSearch: (location: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearchClick = () => {
    onSearch(location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/guadeloupe1/1920/1080" 
          alt="Plage de Guadeloupe" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
          Évadez-vous en Guadeloupe
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Découvrez notre collection exclusive de villas de luxe entre terre et mer. 
          Vivez l'expérience caribéenne ultime.
        </p>

        {/* Search Bar Widget */}
        <div className="bg-white p-2 rounded-full shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full border-b md:border-b-0 md:border-r border-slate-100">
            <MapPin className="text-teal-500" size={20} />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Où souhaitez-vous aller ? (ex: Deshaies)" 
              className="w-full outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full border-b md:border-b-0 md:border-r border-slate-100">
            <Calendar className="text-teal-500" size={20} />
            <input 
              type="text" 
              placeholder="Dates de séjour" 
              className="w-full outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
           <button 
            onClick={handleSearchClick}
            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition-colors flex items-center justify-center gap-2 px-8 font-medium"
           >
            <Search size={20} />
            <span className="md:hidden">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
  );
};